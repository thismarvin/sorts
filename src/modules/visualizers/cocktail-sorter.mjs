import {
    Visualizer
} from "./visualizer.mjs";

import {
    Histogram
} from "../graphing.mjs";

class CocktailSorter extends Visualizer {
    constructor(id) {
        super(id);

        this.index = 1;

        this.movingRight = true;
        this.redundant = 0;

        this.rightSwap = false;
        this.leftSwap = false;
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

        this.movingRight = true;
        this.redundant = 0;

        this.rightSwap = false;
        this.leftSwap = false;
        this.complete = false;
    }

    step() {
        if (this.movingRight) {
            if (this.array[this.index] < this.array[this.index - 1]) {
                this.rightSwap = true;
                this.swap(this.index, this.index - 1);
            }

            if (this.index >= this.array.length - 1 - this.redundant) {
                this.movingRight = false;
                this.redundant++;
            } else {
                this.index++;
            }
        } else {
            if (this.array[this.index] > this.array[this.index + 1]) {
                this.leftSwap = false;
                this.swap(this.index, this.index + 1);
            }

            if (this.index <= this.redundant) {
                this.movingRight = true;

                this.complete = !this.rightSwap && !this.rightSwap;
                this.rightSwap = false;
                this.leftSwap = false;
            } else {
                this.index--;
            }
        }

        super.step();
    }

    sortComplete() {
        return this.complete;
    }

    updateGraph() {
        this.updateBasicMarker(this.indexMarker, this.movingRight ? this.index - 1 : this.index + 1);

        super.updateGraph();
    }
}

export {
    CocktailSorter
};