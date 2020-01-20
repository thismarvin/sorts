import GraphHelper from "../graphing/graph-helper.mjs"

export default class Graph {
    constructor(data) {
        this.data = [];
        this.min = 0;
        this.max = 0;
        this.styling = [];

        this.setData(data);
    }

    setData(data) {
        this.data = data;

        const range = GraphHelper.findRange(this);
        if (range.min > 0 && range.max > 0) {
            this.setRange(0, range.max);
        } else if (range.min < 0 && range.max < 0) {
            this.setRange(range.min, 0);
        } else {
            this.setRange(range.min, range.max);
        }
    }

    setRange(min, max) {
        this.min = min;
        this.max = max;
    }

    getPadding() {
        for (let i of this.styling) {
            if (i.padding) {
                return i.padding;
            }
        }
        return 0;
    }

    addStyling(styling) {
        this.styling.push(styling);
    }

    draw(p5) {
        console.log("ummmm");
    }
}