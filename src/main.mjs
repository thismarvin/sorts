import Histogram from "./js/modules/graphing/histogram.mjs"
import Grapher from "./js/modules/graphing/grapher.mjs"
import GraphEntry from "./js/modules/graphing/graph-entry.mjs"

const grapher = new Grapher("graph");

const histogram = new Histogram(randomArray(50));
histogram.addStyling({
    "color": "#000000",
    "border": 1,
    "padding": 5

});

grapher.attach(
    new GraphEntry(
        "Test Graph",
        histogram
    )
);

function randomArray(length, minValue=0, maxValue=50) {
    let result = [];
    for (let i = 0; i < length; i++) {
        result.push(minValue + parseInt(Math.random() * (maxValue - minValue)));
    }
    return result;
}