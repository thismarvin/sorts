import {
    Visualizer
} from "../visualizers/visualizer.mjs"

class InsertionSorter extends Visualizer {
    constructor(id) {
        super(id);

        this.backtracking = false;
        this.indexBeforeBacktrack = this.index;
    }

    step() {
        // Once the index reaches the end of the array then sorting is complete.
        if (this.index >= this.array.length) {
            return;
        }

        this.steps++;

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

        super.step();
    }
}

export {
    InsertionSorter
};