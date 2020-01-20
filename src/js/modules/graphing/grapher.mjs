export default class Grapher {
    constructor(id) {
        this.id = id;
        this.entries = [];

        this.updateGraph = false;

        this.createSketch();
    }

    applyChanges() {
        this.updateGraph = true;
    }

    attach(entry) {
        this.entries.push(entry);

        this.entries.sort((a, b) => {
            return a.zIndex - b.zIndex;
        });

        this.applyChanges();
    }

    getEntry(name) {
        for (let i of this.entries) {
            if (i.name === name) {
                return i;
            }
        }
        return null;
    }

    createSketch() {
        const attachedDiv = document.querySelector(`#${this.id}`);
        const instance = this;
        const sketch = (p5) => {

            let myCanvas;

            p5.setup = function () {
                myCanvas = p5.createCanvas(attachedDiv.clientWidth, attachedDiv.clientHeight);
                myCanvas.parent(attachedDiv);
            };

            p5.draw = function () {

                if (instance.updateGraph) {
                    // Account for any uncaught window resizes.
                    myCanvas = p5.resizeCanvas(attachedDiv.clientWidth, attachedDiv.clientHeight);

                    p5.clear();
                    for (let i of instance.entries) {
                        i.graph.draw(p5);
                    }
                    instance.updateGraph = false;
                }
            };

            p5.windowResized = function () {
                myCanvas = p5.resizeCanvas(0, 0);
                setTimeout(() => {
                    instance.updateGraph = true;
                }, 100);
            }
        };

        const myp5 = new p5(sketch, this.id);
    }
}
