class GraphHelper {
    static findRange(graph) {
        let min = graph.data[0];
        let max = min;

        for (let i = 0; i < graph.data.length; i++) {
            if (!graph.data[i]) {
                continue;
            }
            min = graph.data[i] < min ? graph.data[i] : min;
            max = graph.data[i] > max ? graph.data[i] : max;
        }

        let range = max - min;

        min = !min ? 0 : min;
        max = !max ? 0 : max;
        range = !range ? 0 : range;

        return {
            "min": min,
            "max": max,
            "range": range
        }
    }
}

export {
    GraphHelper
};