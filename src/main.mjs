import {
    InsertionSorter,
    SelectionSorter,
    QuickSorter,
    BubbleSorter,
    MergeSorter,
    BogoSorter,
    CocktailSorter,
} from "./modules/visualizers.mjs"

const sortTypes = ["insertion", "selection", "quick", "merge", "bubble", "cocktail", "bogo"];
const rootDiv = document.getElementById("root");

let div;
for (let sortType of sortTypes) {
    div = document.createElement("div");
    rootDiv.appendChild(div);
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