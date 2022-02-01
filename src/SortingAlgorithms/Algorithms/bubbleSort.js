import { swap } from "../utils/helpers";

export const bubbleSort = (array, barIndexPosition, steps, colors) => {
    let colorKey = colors[colors.length - 1].slice();
    let i, j;
    let swapped;

    for (i = 0; i < array.length - 1; i++) {
        swapped = false; // set swapped to false
        for (j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                array = swap(array, j, j + 1);
                swapped = true;
            }
            steps.push(array.slice());
            colorKey[j] = 0;
            colorKey[j + 1] = 0;
            colors.push(colorKey.slice());
            colorKey[j] = 1;
            colorKey[j + 1] = 1;
        }
        colorKey[array.length - 1 - i] = 2;
        steps.push(array.slice());
        colors.push(colorKey.slice());

        if (swapped === false) break;
    }

    colors[colors.length - 1] = new Array(array.length).fill(3);

    return;
};
