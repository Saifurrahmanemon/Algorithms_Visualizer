export const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return arr;
};

export function insertStep(arrayNew, barIndexPosition, arraySteps) {
    let currentStep = arraySteps[arraySteps.length - 1].slice();
    currentStep.splice(barIndexPosition, arrayNew.length, ...arrayNew);
    arraySteps.push(currentStep);
}

export const colors = [
    ["rgba(0, 0, 0,0.9)", "rgba(0, 0, 0, 0.7)"], // black //0 //for selecting two elements
    ["rgba(255, 48, 79, 0)", "rgba(255, 48, 79, 0)"], //transparent //1 //initial state
    ["rgba(177, 13, 201, 0.5)", "rgba(177, 13, 201, 0.5)"], //purple //2 //sorted during animation
    ["rgba(255,220,0, 0.8)", "rgba(255,220,0, 0.4)"], //yellow //3 //sort complete
];
