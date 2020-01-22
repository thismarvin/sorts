import {
    Visualizer
} from "./visualizer.mjs"

class BogoSorter extends Visualizer {
    constructor(id) {
        super(id);

        this.array = this.createRandomArray(10, 1, 5);
    }

    step() {
        if (!this.isSorted()) {
            this.shuffle();
        }

        super.step();
    }

    sortComplete() {
        return this.isSorted();
    }

    isSorted() {
        for (let i = 1; i < this.array.length; i++) {
            if (this.array[i] < this.array[i - 1]) {
                return false;
            }
        }
        return true;
    }

    shuffle() {
        const avaiable = this.array.slice();
        this.array = [];

        let randomIndex;
        while (avaiable.length !== 0) {
            randomIndex = parseInt(Math.random() * avaiable.length);
            this.array.push(avaiable[randomIndex]);
            avaiable.splice(randomIndex, 1);
        }
    }
}

export {
    BogoSorter
};