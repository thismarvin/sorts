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
for (let sortType of sortTypes){
    div = document.createElement("div");
    rootDiv.appendChild(div);  
    div.insertAdjacentHTML(
        "afterend",
        `<div class="visualization">
            <h2>${sortType} sort</h2>
            <div class="visualizer" id="${sortType}"></div>
        </div>`
    );
}

const visualizers = [
    new InsertionSorter("insertion"),
    new SelectionSorter("selection"),
    new QuickSorter("quick"),
    new BubbleSorter("bubble"),
    new MergeSorter("merge"),
    new BogoSorter("bogo"),
    new CocktailSorter("cocktail"),
];

for (let v of visualizers) {
    v.begin();
}