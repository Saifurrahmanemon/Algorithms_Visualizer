import { insertStep, swap } from "../utils/helpers";
const quickSort = (array, barIndexPosition, arraySteps, colorSteps) => {
    if (array.length < 2) {
        insertStep(array, barIndexPosition, arraySteps);

        let colorKey = colorSteps[colorSteps.length - 1].slice();
        colorKey[barIndexPosition] = 2;
        colorSteps.push(colorKey);
        return;
    }

    swap(array, pickPivot(array), array.length - 1);
    insertStep(array, barIndexPosition, arraySteps);
    colorSteps.push(colorSteps[colorSteps.length - 1].slice());

    let pivot = array[array.length - 1];
    let low = 0;
    let high = array.length - 1;

    while (low < high) {
        while (array[low] < pivot) {
            insertStep(array, barIndexPosition, arraySteps);
            let colorKey = colorSteps[colorSteps.length - 1].slice();
            colorKey = colorKey.map((key) => (key === 2 ? 2 : 1));
            colorKey[barIndexPosition + low] = 0;
            colorKey[barIndexPosition + high] = 0;
            colorSteps.push(colorKey);
            low++;
        }
        while (array[high] >= pivot) {
            insertStep(array, barIndexPosition, arraySteps);
            let colorKey = colorSteps[colorSteps.length - 1].slice();
            colorKey = colorKey.map((key) => (key === 2 ? 2 : 1));
            colorKey[barIndexPosition + low] = 0;
            colorKey[barIndexPosition + high] = 0;
            colorSteps.push(colorKey);
            high--;
        }
        if (low < high) {
            swap(array, low, high);
            insertStep(array, barIndexPosition, arraySteps);
            let colorKey = colorSteps[colorSteps.length - 1].slice();
            colorKey = colorKey.map((key) => (key === 2 ? 2 : 1));
            colorKey[barIndexPosition + low] = 0;
            colorKey[barIndexPosition + high] = 0;
            colorSteps.push(colorKey);
        }
    }

    let bigIndex = Math.max(low, high);

    swap(array, bigIndex, array.length - 1);
    insertStep(array, barIndexPosition, arraySteps);
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    colorKey[barIndexPosition + bigIndex] = 2;
    colorSteps.push(colorKey);

    quickSort(array.slice(0, low), barIndexPosition, arraySteps, colorSteps);
    quickSort(
        array.slice(low + 1),
        barIndexPosition + low + 1,
        arraySteps,
        colorSteps
    );
    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(3);
    return;
};

function pickPivot(array) {
    let A = array[0];
    let B = array[Math.floor(array.length / 2)];
    let C = array[array.length - 1];

    let middleValue = [A, B, C].sort()[1];
    let middleIndex = array.indexOf(middleValue);

    return middleIndex;
}

export default quickSort;
