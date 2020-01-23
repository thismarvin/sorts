import {
    Visualizer
} from "./visualizer.mjs"

import {
    Histogram
} from "../graphing.mjs";

class InsertionSorter extends Visualizer {
    constructor(id) {
        super(id);

        this.index = 1;
        this.backtracking = false;
        this.indexBeforeBacktrack = this.index;

        this.indexMarker = new Histogram([]);
        this.indexMarker.addStyling({
            "color": "#FF0000"
        });
        this.addGraph("indexMarker", this.indexMarker, 1);

        this.beforeBacktrackMarker = new Histogram([]);
        this.beforeBacktrackMarker.addStyling({
            "color": "#FFFF00"
        });
        this.addGraph("beforeBacktrackMarker", this.beforeBacktrackMarker, 1);
    }

    restartSort() {
        super.restartSort();

        this.index = 1;
        this.backtracking = false;
        this.indexBeforeBacktrack = this.index;
    }

    step() {
        if (this.array[this.index] < this.array[this.index - 1]) {
            super.swap(this.index - 1, this.index);

            if (!this.backtracking) {
                this.backtracking = true;
                this.indexBeforeBacktrack = this.index;
            }

            this.index--;
        } else {
            this.backtracking = false;
            this.index = this.indexBeforeBacktrack++;
        }

        super.step();
    }

    sortComplete() {
        // Once the index reaches the end of the array then sorting is complete.
        return this.index >= this.array.length;
    }

    updateGraph() {
        this.updateBasicMarker(this.indexMarker, this.index);
        this.updateBasicMarker(this.beforeBacktrackMarker, this.indexBeforeBacktrack);

        super.updateGraph();
    }
}

export {
    InsertionSorter
};