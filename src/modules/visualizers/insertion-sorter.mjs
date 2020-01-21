import {
    Visualizer
} from "../visualizers/visualizer.mjs"

import {
    GraphEntry,
    Histogram
} from "../graphing.mjs";

class InsertionSorter extends Visualizer {
    constructor(id) {
        super(id);

        this.backtracking = false;
        this.indexBeforeBacktrack = this.index;

        this.indexMarker = new Histogram([]);
        this.indexMarker.addStyling({
            "color": "#FF0000",
            "border": 2,
            "padding": 5
        });
        this.grapher.attach(
            new GraphEntry(
                "index",
                this.indexMarker
            )
        );
    }

    step() {
        // Once the index reaches the end of the array then sorting is complete.
        if (this.index >= this.array.length) {
            return;
        }

        if (this.array[this.index] < this.array[this.index - 1]) {
            // Swap
            const copy = this.array[this.index - 1];
            this.array[this.index - 1] = this.array[this.index];
            this.array[this.index] = copy;

            if (!this.backtracking) {
                this.backtracking = true;
                this.indexBeforeBacktrack = this.index;
            }

            this.index--;
        } else {
            this.backtracking = false;
            this.index = this.indexBeforeBacktrack++;
        }

        // The array is not sorted yet, so queue up the next step.
        setTimeout(() => {
            this.step()
        }, this.stepFrequency);

        // A checky method to highlight the current index of the sort.
        let temp = new Array(this.array.length).fill(0);
        temp[this.index] = this.array[this.index];
        this.indexMarker.setData(temp);
        this.indexMarker.setRange(this.histogram.min, this.histogram.max);
        this.grapher.applyChanges();

        super.step();
    }
}

export {
    InsertionSorter
};