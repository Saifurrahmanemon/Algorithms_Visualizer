import React from "react";
//React Icons
import { BsFillPlayFill, BsFillStopFill } from "react-icons/bs";
import { MdReplay } from "react-icons/md";
const AlgorithmButton = ({
    timeouts,
    currentStep,
    arraySteps,
    startVisualizer,
    clearTimeouts,
    generateNewArray,
}) => {
    let playAlgorithmsButton;

    //Set player controls
    if (timeouts.length !== 0 && currentStep !== arraySteps.length) {
        playAlgorithmsButton = (
            <BsFillStopFill
                onClick={() => clearTimeouts()}
                className="stop-icon"
            />
        );
    } else if (currentStep === arraySteps.length) {
        playAlgorithmsButton = (
            <MdReplay
                onClick={() => generateNewArray()}
                className="replay-icon"
            />
        );
    } else {
        playAlgorithmsButton = (
            <BsFillPlayFill
                onClick={() => startVisualizer()}
                className="start-icon"
            />
        );
    }
    return <div>{playAlgorithmsButton}</div>;
};

export default AlgorithmButton;
