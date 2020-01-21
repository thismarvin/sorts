import {
    Visualizer
} from "./visualizer.mjs";

import {
    GraphEntry,
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
            "color": "#FF0000",
            "border": 2,
            "padding": 5
        });
        this.pivotMarker = new Histogram([]);
        this.pivotMarker.addStyling({
            "color": "#0000FF",
            "border": 2,
            "padding": 5
        });

        this.grapher.attach(
            new GraphEntry(
                "indexMarker",
                this.indexMarker
            )
        );
        this.grapher.attach(
            new GraphEntry(
                "indexMarker",
                this.pivotMarker
            )
        );
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

        // If a process hasn't started then the sort if complete.
        if (!this.processingSection) {
            //console.log("Done");
            return;
        }

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

        setTimeout(() => {
            this.step()
        }, this.stepFrequency);

        // A checky method to highlight the current index of the sort.
        let temp = [];

        temp = new Array(this.array.length).fill(0);
        temp[this.index] = this.array[this.index];
        this.indexMarker.setData(temp);
        this.indexMarker.setRange(this.histogram.min, this.histogram.max);

        temp = new Array(this.array.length).fill(0);
        temp[this.pivot] = this.array[this.pivot];
        this.pivotMarker.setData(temp);
        this.pivotMarker.setRange(this.histogram.min, this.histogram.max);

        super.step();
    }
}

export {
    QuickSorter
};