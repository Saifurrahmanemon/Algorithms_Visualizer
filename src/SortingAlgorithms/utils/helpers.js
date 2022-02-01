export const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return arr;
};

export function insertStep(arrayNew, barIndexPosition, arraySteps) {
    let currentStep = arraySteps[arraySteps.length - 1].slice();
    currentStep.splice(barIndexPosition, arrayNew.length, ...arrayNew);
    arraySteps.push(currentStep);
}
