import { insertStep } from "../utils/helpers";

const mergeSort = (array, barIndexPosition, arraySteps, colorSteps) => {
    if (array.length === 1) return array;
    let mid = Math.floor(array.length / 2);
    //dividing array recursively
    let leftArray = mergeSort(
        array.slice(0, mid),
        barIndexPosition,
        arraySteps,
        colorSteps
    );
    let rightArray = mergeSort(
        array.slice(mid),
        barIndexPosition + mid,
        arraySteps,
        colorSteps
    );

    let newArray = merge(
        leftArray,
        rightArray,
        barIndexPosition,
        arraySteps,
        colorSteps
    );
    arraySteps.push(arraySteps[arraySteps.length - 1].slice());
    colorSteps.push(
        colorSteps[colorSteps.length - 1].fill(
            newArray.length === arraySteps[0].length ? 3 : 1
        )
    );
    return newArray;
};

//this is the core part of merge sort, compare divided values
const merge = (
    leftArray,
    rightArray,
    barIndexPosition,
    arraySteps,
    colorSteps
) => {
    let newArray = [];
    let firstHalf = 0;
    let secondHalf = 0;

    while (leftArray.length > 0 && rightArray.length > 0) {
        if (leftArray[firstHalf] < rightArray[secondHalf]) {
            newArray.push(leftArray.shift());
            insertStep(newArray, barIndexPosition, arraySteps);
        } else {
            newArray.push(rightArray.shift());
            insertStep(newArray, barIndexPosition, arraySteps);
        }
        updateColor(barIndexPosition, colorSteps, newArray.length - 1, [], []);
    }

    if (leftArray.length !== 0 || rightArray.length !== 0) {
        updateColor(
            barIndexPosition,
            colorSteps,
            newArray.length,
            leftArray,
            rightArray
        );
        newArray = newArray.concat(leftArray);
        newArray = newArray.concat(rightArray);
        insertStep(newArray, barIndexPosition, arraySteps);
    }

    return newArray;
};

//for updating color of bars
const updateColor = (
    barIndexPosition,
    colorSteps,
    start,
    leftArray,
    rightArray
) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    let end = barIndexPosition + start + leftArray.length + rightArray.length;
    start = start + barIndexPosition;

    if (end === start) {
        colorKey.fill(0, start, end + 1);
    } else {
        colorKey.fill(2, start, end);
    }
    colorSteps.push(colorKey);
};

export default mergeSort;
