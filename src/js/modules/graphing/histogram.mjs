import Graph from "../graphing/graph.mjs"

export default class Histogram extends Graph {
    constructor(data) {
        super(data);
    }

    getBorder() {
        for (let i of this.styling) {
            if (i.border) {
                return i.border;
            }
        }
        return 0;
    }

    getColor(options = {}) {
        if (options["palette"]) {
            for (let i of this.styling) {
                if (i.palette && i.palette[options["palette"]]) {
                    return i.palette[options["palette"]];
                }
            }
        }

        for (let i of this.styling) {
            if (i.color) {
                return i.color;
            }
        }
        return "#FFFFFF";
    }

    draw(p5) {

        if (this.min === undefined && this.max === undefined) {
            return;
        }

        let padding = this.getPadding();
        let spacing = this.getBorder();

        let zero = p5.map(0, this.min, this.max, p5.height - padding, padding);

        /*
        // Draw a line representing the x-axis.
        p5.strokeWeight(1);
        p5.stroke(0);
        p5.line(0, start, p5.width, start);
        */

        // Draw the Histogram.
        let histogramWidth;
        let histogramHeight;

        // Setup the Histogram's styling.
        p5.noStroke();

        histogramWidth = (p5.width - (padding * 2) - (spacing * 2 * this.data.length)) / this.data.length;

        if (histogramWidth < 0) {
            spacing = 0;
            padding = 0;
            histogramWidth = p5.width / this.data.length;
            zero = p5.map(0, this.min, this.max, p5.height - padding, padding);
        }

        let start;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] === undefined) {
                continue;
            }

            if (this.data[i] >= 0) {
                histogramHeight = p5.map(this.data[i], this.min, this.max, padding, p5.height - padding);
                start = p5.map(this.data[i], this.min, this.max, p5.height - padding, padding);

                p5.fill(this.getColor({
                    "palette": "positive"
                }));

                p5.rect(
                    padding + spacing + i * histogramWidth + (2 * spacing * i),
                    start,
                    histogramWidth,
                    histogramHeight - (p5.height - zero)
                );
            } else {
                histogramHeight = p5.map(this.data[i], this.min, 0, p5.height - padding - zero, 0);
                p5.fill(this.getColor({
                    "palette": "negative"
                }));
                p5.rect(
                    padding + spacing + i * histogramWidth + (2 * spacing * i),
                    zero,
                    histogramWidth,
                    histogramHeight
                );
            }
        }
    }
}