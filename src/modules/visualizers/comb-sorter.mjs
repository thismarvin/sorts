import {
    Visualizer
} from "./visualizer.mjs"

import {
    Histogram
} from "../graphing.mjs";

class CombSorter extends Visualizer {
    constructor(id) {
        super(id);

        this.shrinkFactor = 0.8;
        this.gap = this.array.length;
        this.calculateGap();
        this.swaped = false;
        this.complete = false;

        this.indexMarker = new Histogram([]);
        this.indexMarker.addStyling({
            "color": "#FF004D"
        });
        this.addGraph("indexMarker", this.indexMarker, 1);

        this.upperIndexMarker = new Histogram([]);
        this.upperIndexMarker.addStyling({
            "color": "#FF004D"
        });
        this.addGraph("upperIndexMarker", this.upperIndexMarker, 1);
    }

    restartSort() {
        super.restartSort();

        this.index = 0;
        this.gap = this.array.length;
        this.swaped = false;
        this.complete = false;

        this.calculateGap();
    }

    step() {
        if (this.array[this.index] > this.array[this.index + this.gap]) {
            this.swap(this.index, this.index + this.gap);
            this.swaped = true;
        }

        this.index++;

        if (this.index + this.gap >= this.array.length) {
            this.calculateGap();
            this.index = 0;

            this.complete = !this.swaped;
            this.swaped = false;
        }

        super.step();
    }

    sortComplete() {
        return this.complete;
    }

    updateGraph() {
        this.updateBasicMarker(this.indexMarker, this.index);
        this.updateBasicMarker(this.upperIndexMarker, this.index + this.gap);

        super.updateGraph();
    }

    calculateGap() {
        this.gap = parseInt(this.gap * this.shrinkFactor);
        this.gap = this.gap < 1 ? 1 : this.gap;
    }
}

export {
    CombSorter
};