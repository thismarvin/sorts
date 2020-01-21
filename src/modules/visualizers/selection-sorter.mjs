import {
    Visualizer
} from "../visualizers/visualizer.mjs";

import {
    GraphEntry,
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
            "border": 2,
            "padding": 5
        });
        this.minimumMarker = new Histogram([]);
        this.minimumMarker.addStyling({
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
                this.minimumMarker
            )
        );
    }

    step() {
        if (this.index >= this.array.length) {
            return;
        }

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

            const copy = this.array[this.minimumIndex];
            this.array[this.minimumIndex] = this.array[this.index];
            this.array[this.index] = copy;

            this.index++;
            this.minimumIndex = this.index;
        }

        // The array is not sorted yet, so queue up the next step.
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
        temp[this.minimumIndex] = this.array[this.minimumIndex];
        this.minimumMarker.setData(temp);
        this.minimumMarker.setRange(this.histogram.min, this.histogram.max);

        this.grapher.applyChanges();

        super.step();
    }
}

export {
    SelectionSorter
};