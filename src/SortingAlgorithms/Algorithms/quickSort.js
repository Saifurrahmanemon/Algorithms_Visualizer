import { insertStep, swap } from "../utils/helpers";
export const quickSort = (array, barIndexPosition, arraySteps, colorSteps) => {
    if (array.length < 2) {
        insertStep(array, barIndexPosition, arraySteps);

        let colorKey = colorSteps[colorSteps.length - 1].slice();
        colorKey[barIndexPosition] = 3;
        colorSteps.push(colorKey);
        return;
    }

    // pick median of three numbers as pivot and sent it to back
    swap(array, pickPivot(array), array.length - 1);
    insertStep(array, barIndexPosition, arraySteps);
    colorSteps.push(colorSteps[colorSteps.length - 1].slice());

    let pivot = array[array.length - 1];
    let A = 0;
    let B = array.length - 1;

    while (A < B) {
        while (array[A] < pivot) {
            insertStep(array, barIndexPosition, arraySteps);
            let colorKey = colorSteps[colorSteps.length - 1].slice();
            colorKey = colorKey.map((key) => (key === 3 ? 3 : 1));
            colorKey[barIndexPosition + A] = 0;
            colorKey[barIndexPosition + B] = 0;
            colorSteps.push(colorKey);
            A++;
        }
        while (array[B] >= pivot) {
            insertStep(array, barIndexPosition, arraySteps);
            let colorKey = colorSteps[colorSteps.length - 1].slice();
            colorKey = colorKey.map((key) => (key === 3 ? 3 : 1));
            colorKey[barIndexPosition + A] = 0;
            colorKey[barIndexPosition + B] = 0;
            colorSteps.push(colorKey);
            B--;
        }
        if (A < B) {
            swap(array, A, B);
            insertStep(array, barIndexPosition, arraySteps);
            let colorKey = colorSteps[colorSteps.length - 1].slice();
            colorKey = colorKey.map((key) => (key === 3 ? 3 : 1));
            colorKey[barIndexPosition + A] = 0;
            colorKey[barIndexPosition + B] = 0;
            colorSteps.push(colorKey);
        }
    }

    let bigIndex = Math.max(A, B);

    swap(array, bigIndex, array.length - 1);
    insertStep(array, barIndexPosition, arraySteps);
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    colorKey[barIndexPosition + bigIndex] = 3;
    colorSteps.push(colorKey);

    quickSort(array.slice(0, A), barIndexPosition, arraySteps, colorSteps);
    quickSort(
        array.slice(A + 1),
        barIndexPosition + A + 1,
        arraySteps,
        colorSteps
    );

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
