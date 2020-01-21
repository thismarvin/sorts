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

        this.array = this.createRandomArray(50);
        this.index = 0;

        this.grapher = new Grapher(this.id);
        this.histogram = new Histogram(this.array);
        this.histogram.addStyling({
            "color": "#000000",
            "border": 2,
            "padding": 5
        });

        this.grapher.attach(
            new GraphEntry(
                "default",
                this.histogram
            )
        );
    }

    /**
     * Starts the visualization.
     */
    begin() {
        this.step();
    }

    step() {
        this.updateGraph();
    }

    updateGraph() {
        this.grapher.getEntry("default").graph.setData(this.array);
        this.grapher.applyChanges();
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