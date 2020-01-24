import {
    Visualizer
} from "./visualizer.mjs"

import {
    Histogram
} from "../graphing.mjs";

class BubbleSorter extends Visualizer {
    constructor(id) {
        super(id);

        this.index = 1;
        this.elementsInPlace = 0;
        this.swapped = false;
        this.complete = false;

        this.indexMarker = new Histogram([]);
        this.indexMarker.addStyling({
            "color": "#FF004D"
        });
        this.addGraph("indexMarker", this.indexMarker, 1);
    }

    restartSort() {
        super.restartSort();

        this.index = 1;
        this.elementsInPlace = 0;
        this.swapped = false;
        this.complete = false;
    }

    step() {
        if (this.array[this.index] < this.array[this.index - 1]) {
            this.swap(this.index, this.index - 1);
            this.swapped = true;
        }

        this.index++;

        if (this.index >= this.array.length - this.elementsInPlace) {
            this.index = 1;
            this.elementsInPlace++;
            this.complete = !this.swapped;
            this.swapped = false;
        }

        super.step();
    }

    sortComplete() {
        return this.complete;
    }

    updateGraph() {
        this.updateBasicMarker(this.indexMarker, this.index - 1);

        super.updateGraph();
    }
}

export {
    BubbleSorter
};