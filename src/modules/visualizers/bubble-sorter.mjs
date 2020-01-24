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
        this.completed = 0;

        this.indexMarker = new Histogram([]);
        this.indexMarker.addStyling({
            "color": "#FF004D"
        });
        this.addGraph("indexMarker", this.indexMarker, 1);
    }

    restartSort() {
        super.restartSort();

        this.index = 1;
        this.completed = 0;
    }

    step() {
        if (this.array[this.index] < this.array[this.index - 1]) {
            this.swap(this.index, this.index - 1);
        }

        this.index++;

        if (this.index >= this.array.length - this.completed) {
            this.completed++;
            this.index = 1;
        }

        super.step();
    }

    sortComplete() {
        return this.completed >= this.array.length - 1;
    }

    updateGraph() {
        this.updateBasicMarker(this.indexMarker, this.index);

        super.updateGraph();
    }
}

export {
    BubbleSorter
};