import {
    Visualizer
} from "./visualizer.mjs"

import {
    Histogram
} from "../graphing.mjs";

class MergeSorter extends Visualizer {
    constructor(id) {
        super(id);

        this.groupSize = 1;
        this.coverage = 0;

        this.aIndex = 0;
        this.bIndex = 0;
        this.aRange = 0;
        this.bRange = 0;
        this.aIterations = 0;
        this.bIterations = 0;

        this.subsectionStartIndex = 0;
        this.sortedSubsection = [];

        this.indexMarker = new Histogram([]);
        this.indexMarker.addStyling({
            "color": "#FF0000"
        });
        this.addGraph("indexMarker", this.indexMarker, 1);

        this.aIndexMarker = new Histogram([]);
        this.aIndexMarker.addStyling({
            "color": "#00FF00"
        });
        this.addGraph("aIndexMarker", this.aIndexMarker, 1);

        this.bIndexMarker = new Histogram([]);
        this.bIndexMarker.addStyling({
            "color": "#0000FF"
        });
        this.addGraph("bIndexMarker", this.bIndexMarker, 1);

    }

    step() {
        if (this.aIndex === 0 && this.bIndex === 0) {
            this.aIndex = this.coverage;
            this.aIndex = this.aIndex > this.array.length ? this.array.length - 1 : this.aIndex;
            this.bIndex = this.aIndex + this.groupSize;
            this.bIndex = this.bIndex > this.array.length ? this.array.length - 1 : this.bIndex;

            this.aRange = this.groupSize;

            if (this.aIndex + this.aRange > this.array.length) {
                this.aRange = this.array.length - this.aIndex;
                this.bRange = 0;
            } else {
                this.bRange = this.aRange;
                this.bRange = this.bIndex + this.bRange > this.array.length ? this.array.length - this.bIndex : this.bRange;
            }

            this.coverage += this.groupSize * 2;

            this.aIterations = 0;
            this.bIterations = 0;

            this.subsectionStartIndex = this.aIndex;
            this.sortedSubsection = [];

            this.index = this.aIndex;
        }

        if (this.array[this.bIndex] < this.array[this.aIndex]) {
            this.sortedSubsection.push(this.array[this.bIndex]);
            if (this.bIterations + 1 < this.bRange) {
                this.bIndex++;
            }
            this.bIterations++;
        } else {
            this.sortedSubsection.push(this.array[this.aIndex]);
            if (this.aIterations + 1 < this.aRange) {
                this.aIndex++;
            }
            this.aIterations++;
        }

        this.index++;

        if (this.aIterations >= this.aRange || this.bIterations >= this.bRange) {
            if (this.aIterations >= this.aRange) {
                for (let i = this.bIterations; i < this.bRange; i++) {
                    this.sortedSubsection.push(this.array[this.bIndex]);
                    this.bIndex++;
                }
            } else {
                for (let i = this.aIterations; i < this.aRange; i++) {
                    this.sortedSubsection.push(this.array[this.aIndex]);
                    this.aIndex++;
                }
            }

            this.aIndex = 0;
            this.bIndex = 0;
            this.setSubsection(this.subsectionStartIndex, this.sortedSubsection);
        }

        if (this.index >= this.array.length - 1) {
            this.coverage = 0;
            this.groupSize *= 2;
            this.aIndex = 0;
            this.bIndex = 0;
        }

        super.step();
    }

    sortComplete() {
        return this.groupSize > this.array.length;
    }

    updateGraph() {
        this.updateBasicMarker(this.indexMarker, this.index);
        this.updateBasicMarker(this.aIndexMarker, this.aIndex);
        this.updateBasicMarker(this.bIndexMarker, this.bIndex);

        super.updateGraph();
    }

    setSubsection(i, arr) {
        if (i === this.array.length) {
            return;
        }

        for (let j = 0; j < arr.length; j++) {
            this.array[i + j] = arr[j];
        }
    }
}

export {
    MergeSorter
};