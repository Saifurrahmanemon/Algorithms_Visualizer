import { swap } from "../utils/helpers";

const bubbleSort = (array, barIndexPosition, steps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
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
            colorSteps.push(colorKey.slice());
            colorKey[j] = 1;
            colorKey[j + 1] = 1;
        }
        colorKey[array.length - 1 - i] = 2;
        steps.push(array.slice());
        colorSteps.push(colorKey.slice());

        if (swapped === false) break;
    }

    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(3);

    return;
};

export default bubbleSort;
