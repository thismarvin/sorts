import {
    Visualizer
} from "./visualizer.mjs";

import {
    Histogram
} from "../graphing.mjs";

class SelectionSorter extends Visualizer {
    constructor(id) {
        super(id);

        this.searching = false;
        this.indexBeforeSearch = this.index;
        this.minimumIndex = this.index;

        this.indexMarker = new Histogram([]);
        this.indexMarker.addStyling({
            "color": "#FF0000",
        });
        this.addGraph("indexMarker", this.indexMarker, 1);

        this.beforeSearchMarker = new Histogram([]);
        this.beforeSearchMarker.addStyling({
            "color": "#FFFF00",
        });
        this.addGraph("beforeSearchMarker", this.beforeSearchMarker, 2);

        this.minimumMarker = new Histogram([]);
        this.minimumMarker.addStyling({
            "color": "#0000FF",
        });
        this.addGraph("minimumMarker", this.minimumMarker, 1);
    }

    restartSort() {
        super.restartSort();

        this.searching = false;
        this.indexBeforeSearch = this.index;
        this.minimumIndex = this.index;
    }

    step() {
        if (!this.searching) {
            this.searching = true;
            this.indexBeforeSearch = this.index;
        }

        if (this.array[this.index] < this.array[this.minimumIndex]) {
            this.minimumIndex = this.index;
        }

        this.index++;

        if (this.index >= this.array.length) {
            this.searching = false;

            this.index = this.indexBeforeSearch;

            this.swap(this.minimumIndex, this.index);

            this.index++;
            this.minimumIndex = this.index;
        }

        super.step();
    }

    sortComplete() {
        // Once the index reaches the end of the array then sorting is complete.
        return this.index >= this.array.length;
    }

    updateGraph() {
        this.updateBasicMarker(this.indexMarker, this.index);
        this.updateBasicMarker(this.beforeSearchMarker, this.indexBeforeSearch);
        this.updateBasicMarker(this.minimumMarker, this.minimumIndex);

        super.updateGraph();
    }
}

export {
    SelectionSorter
};