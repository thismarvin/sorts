import {
    Visualizer
} from "./visualizer.mjs";

import {
    Histogram
} from "../graphing.mjs";

class QuickSorter extends Visualizer {
    constructor(id) {
        super(id);

        this.pivot = 0;
        this.index = 0;

        this.processingSection = false;
        this.pivotStack = [];
        this.pivotInformation = null;

        this.pivotStack.push({
            "high": this.array.length - 1,
            "low": 0
        });

        this.indexMarker = new Histogram([]);
        this.indexMarker.addStyling({
            "color": "#FF004D",
        });
        this.addGraph("indexMarker", this.indexMarker, 1);

        this.pivotMarker = new Histogram([]);
        this.pivotMarker.addStyling({
            "color": "#FFA300",
        });
        this.addGraph("pivotMarker", this.pivotMarker, 1);
    }

    restartSort() {
        super.restartSort();

        this.pivot = 0;
        this.index = 0;

        this.processingSection = false;
        this.pivotStack = [];
        this.pivotInformation = null;

        this.pivotStack.push({
            "high": this.array.length - 1,
            "low": 0
        });
    }

    step() {
        // If processing hasn't started and the pivotStack still has entries
        // then attempt to start processing a new section.
        while (!this.processingSection && this.pivotStack.length !== 0) {
            this.pivotInformation = this.pivotStack.pop();

            // Make sure the pivot is valid.
            if (this.pivotInformation.low < this.pivotInformation.high) {
                this.index = this.pivotInformation.low;
                this.pivot = this.pivotInformation.high;
                this.processingSection = true;
            }
        }

        if (this.processingSection) {
            if (this.array[this.index] > this.array[this.pivot]) {
                super.swap(this.index, this.pivot - 1);
                super.swap(this.pivot - 1, this.pivot);

                this.pivot--;
            } else {
                this.index++;
            }

            if (this.index > this.pivot) {
                this.pivotStack.push({
                    "high": this.pivot - 1,
                    "low": this.pivotInformation.low
                });
                this.pivotStack.push({
                    "high": this.pivotInformation.high,
                    "low": this.pivot + 1
                });

                this.processingSection = false;
            }
        }

        super.step();
    }

    sortComplete() {
        // If we are not currently processing section and the pivotStack is empty then the sort is complete.
        return !this.processingSection && this.pivotStack.length === 0;
    }

    updateGraph() {
        this.updateBasicMarker(this.indexMarker, this.index);
        this.updateBasicMarker(this.pivotMarker, this.pivot);

        super.updateGraph();
    }
}

export {
    QuickSorter
};