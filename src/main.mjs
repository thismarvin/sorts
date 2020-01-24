import {
    InsertionSorter,
    SelectionSorter,
    QuickSorter,
    BubbleSorter,
    MergeSorter,
    BogoSorter,
    CocktailSorter,
    CombSorter,
} from "./modules/visualizers.mjs"

const sortTypes = ["insertion", "selection", "quick", "merge", "bubble", "cocktail", "comb", "bogo"];
const rootDiv = document.getElementById("root");

let div;
let groupDiv;
let index = 0;
for (let sortType of sortTypes) {
    if (index % 2 === 0) {
        groupDiv = document.createElement("div");
        groupDiv.id = "visualization-pair";
        rootDiv.appendChild(groupDiv);
    }
    index++;

    div = document.createElement("div");
    div.id = "visualization-entry";
    groupDiv.appendChild(div);
    div.insertAdjacentHTML(
        "afterbegin",
        `<div class="visualization">           
            <div class="visualizer" id="${sortType}"></div>
            <h2>${sortType} sort</h2>      
            <div id="steps">
                <p id="steps-${sortType}">0</p>
            </div>
            <button id="btn-restart-${sortType}">Restart Sort</button>
        </div>`
    );
}

const visualizers = [{
        "name": "insertion",
        "visualizer": new InsertionSorter("insertion")
    },
    {
        "name": "selection",
        "visualizer": new SelectionSorter("selection")
    },
    {
        "name": "quick",
        "visualizer": new QuickSorter("quick")
    },
    {
        "name": "merge",
        "visualizer": new MergeSorter("merge")
    },
    {
        "name": "bubble",
        "visualizer": new BubbleSorter("bubble")
    },
    {
        "name": "cocktail",
        "visualizer": new CocktailSorter("cocktail")
    },
    {
        "name": "comb",
        "visualizer": new CombSorter("comb")
    },
    {
        "name": "bogo",
        "visualizer": new BogoSorter("bogo")
    },
];

let button;
for (let v of visualizers) {
    v.visualizer.begin();

    button = document.getElementById(`btn-restart-${v.name}`);
    button.addEventListener("click", () => {
        v.visualizer.restartSort();
    });
}