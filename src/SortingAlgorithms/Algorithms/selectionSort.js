import { swap } from "../utils/helpers";

export const selectionSort = (
    array,
    barIndexPosition,
    arraySteps,
    colorSteps
) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    for (let i = 0; i < array.length - 1; i++) {
        let minimumIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minimumIndex]) {
                minimumIndex = j;
            }
            colorKey[minimumIndex] = 0;
            colorKey[j] = 0;
            arraySteps.push(array.slice());
            colorSteps.push(colorKey.slice());
            colorKey[minimumIndex] = 1;
            colorKey[j] = 1;
        }
        swap(array, minimumIndex, i);
        colorKey[i] = 2;
        arraySteps.push(array.slice());
        colorSteps.push(colorKey.slice());
    }
    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(3);
};
