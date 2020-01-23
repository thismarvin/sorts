import {
    InsertionSorter,
    SelectionSorter,
    QuickSorter,
    BubbleSorter,
    MergeSorter,
    BogoSorter,
    CocktailSorter,
} from "./modules/visualizers.mjs"

const visualizer = new CocktailSorter("visualizer");
visualizer.begin();