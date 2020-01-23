import {
    Grapher,
    GraphEntry,
    Histogram
} from "../graphing.mjs"

/**
 * A visualizer for sorting alogorithms.
 * 📊📊📊
 */
class Visualizer {
    /**
     * Create a visualizer and attach it to a div.
     * @param {string} id the id of the div that the visualizer will attach to
     */
    constructor(id) {
        this.id = id;

        this.steps = 0;
        this.stepFrequency = 50;

        this.array = this.createRandomArray(50, 1, 100);
        this.index = 0;

        this.grapher = new Grapher(this.id);

        this.defaultBorder = 1;
        this.defaultPadding = 5;

        this.defaultGraph = new Histogram(this.array);
        this.defaultGraph.addStyling({
            "color": "#FFFFFF"
        });

        this.addGraph("default", this.defaultGraph);
    }

    /**
     * Starts the visualization.
     */
    begin() {
        this.step();
    }

    restartSort() {
        this.steps = 0;
        this.array = this.createRandomArray(50, 1, 100);
        this.index = 0;

        this.queueNextStep();
    }

    addGraph(name, graph, zIndex = 0) {
        graph.addStyling({
            "border": this.defaultBorder,
            "padding": this.defaultPadding
        });

        this.grapher.attach(
            new GraphEntry(
                name,
                graph,
                zIndex
            )
        );
    }

    updateBasicMarker(marker, index) {
        const temp = new Array(this.array.length).fill(0);
        temp[index] = this.array[index];

        marker.setData(temp);
        marker.setRange(this.defaultGraph.min, this.defaultGraph.max);
    }

    step() {
        this.steps++;

        this.updateGraph();

        if (!this.sortComplete()) {
            this.queueNextStep();
        }
    }

    sortComplete() {
        return false;
    }

    updateGraph() {
        this.grapher.getEntry("default").graph.setData(this.array);
        this.grapher.applyChanges();
    }

    queueNextStep() {
        setTimeout(() => {
            this.step()
        }, this.stepFrequency);
    }

    /**
     * Swaps two indexes of the visualizer's array.
     * @param {number} a the first index to swap
     * @param {number} b the second index to swap
     */
    swap(a, b) {
        const copy = this.array[a];
        this.array[a] = this.array[b];
        this.array[b] = copy;
    }

    /**
     * Create an array filled with random integers.
     * @access private
     * @param {number} length the length of the array
     * @param {number} minValue the lower range of possible random values 
     * @param {number} maxValue the upper range of possible random values
     * @returns {number[]} an integer array filled with random values
     */
    createRandomArray(length, minValue = 0, maxValue = 50) {
        let result = [];
        for (let i = 0; i < length; i++) {
            result.push(minValue + parseInt(Math.random() * (maxValue - minValue)));
        }
        return result;
    }
}

export {
    Visualizer
};