//MUI
import { Button } from "@mui/material";
import React from "react";
//React Icons
import { BsFillPlayFill, BsFillStopFill } from "react-icons/bs";
import { MdReplay } from "react-icons/md";
// Algorithms
import {
    bubbleSort,
    insertionSort,
    mergeSort,
    quickSort,
    selectionSort,
} from "../Algorithms";
// Components
import {
    AlgorithmsSelector,
    ArrayBar,
    BarSizeController,
    SpeedController,
    Timer,
} from "../components";
//Utils
import RandomValueGenerator from "../utils/RandomValueGenerator";
//Zustand
import { useTime } from "../utils/store";
//CSS
import "./SortingVisualizer.css";

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            arraySteps: [],
            colorElement: [],
            colorSteps: [],
            currentStep: 0,
            count: 20,
            delayAnimation: 150,
            algorithm: "bubbleSort",
            timeouts: [],
            isAlgorithmSortOver: true,
        };
    }

    ALGORITHMS = {
        bubbleSort: bubbleSort,
        mergeSort: mergeSort,
        insertionSort: insertionSort,
        selectionSort: selectionSort,
        quickSort: quickSort,
    };

    componentDidMount() {
        this.generateNewArray();
    }
    //? for generating new array
    generateNewArray() {
        this.resetTimer();
        const array = [];
        this.clearColorElement();
        this.clearTimeouts();

        for (let i = 0; i < this.state.count; i++) {
            array.push(RandomValueGenerator(25, 230));
        }
        this.setState(
            {
                array: array,
                arraySteps: [array],
                currentStep: 0,
                isAlgorithmSortOver: true,
                time: 0,
            },
            () => {
                this.generateSteps();
            }
        );
    }

    //*this is the main core function i need to be careful of
    generateSteps() {
        let newArray = this.state.array.slice();
        let newSteps = this.state.arraySteps.slice();
        let newColorSteps = this.state.colorSteps.slice();

        let barIndexPosition = 0;
        this.ALGORITHMS[this.state.algorithm](
            newArray,
            barIndexPosition,
            newSteps,
            newColorSteps
        );
        this.setState({
            arraySteps: newSteps,
            colorSteps: newColorSteps,
        });
    }
    //? this is for resetting  color of the array after finishing  Animation
    clearColorElement = () => {
        let blankKey = new Array(this.state.count).fill(1);

        this.setState({
            colorElement: blankKey,
            colorSteps: [blankKey],
        });
    };
    //? for clearing timeouts
    clearTimeouts = () => {
        this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
        this.setState({
            timeouts: [],
            isAlgorithmSortOver: true,
        });
    };

    //? this is for starting visualization
    startVisualizer = () => {
        let steps = this.state.arraySteps;
        let colorSteps = this.state.colorSteps;

        this.clearTimeouts();

        let timeouts = [];
        let i = 0;

        while (i < steps.length - this.state.currentStep) {
            let timeout = setTimeout(() => {
                let currentStep = this.state.currentStep;
                this.setState({
                    array: steps[currentStep],
                    colorElement: colorSteps[currentStep],
                    currentStep: currentStep + 1,
                    isAlgorithmSortOver: false,
                });
                //* comparing the currentStep with steps.length and the state of isAlgorithmSortOver will remain false until the array is fully sorted.. Adding '+ 1' to currentStep because the steps.length always will be '+1' bigger than the currentStep..
                if (currentStep + 1 === steps.length) {
                    this.setState({
                        isAlgorithmSortOver: true,
                    });
                }
            }, this.state.delayAnimation * i);
            timeouts.push(timeout);
            i++;
        }

        this.setState({
            timeouts: timeouts,
            isAlgorithmSortOver: false,
        });
    };
    //?  for resetting the timer by using useTime hook from (store.js)
    resetTimer = () => {
        useTime.getState().resetTime();
    };
    //?  for changing  algorithm
    selectAlgorithm = (event) => {
        this.setState(
            {
                // this will set the value
                algorithm: event.target.value,
                currentStep: 0,
                arraySteps: [
                    this.state.arraySteps[
                        this.state.currentStep === 0
                            ? 0
                            : this.state.currentStep - 1
                    ],
                ],
            },
            () => this.generateSteps()
        );

        this.generateNewArray();
    };
    //? for changing the bar size
    changeBarCount = (event) => {
        this.setState({ count: event.target.value });
    };
    //? for changing animation speed
    changeAnimationSpeed = (event) => {
        this.clearTimeouts();
        this.setState({
            delayAnimation: event.target.value,
        });
    };
    render() {
        const {
            array,
            colorElement,
            currentStep,
            count,
            isAlgorithmSortOver,
            algorithm,
            timeouts,
            arraySteps,
            delayAnimation,
        } = this.state;

        let playAlgorithmsButton;

        //? Set player controls
        if (timeouts.length !== 0 && currentStep !== arraySteps.length) {
            playAlgorithmsButton = (
                <div onClick={() => this.clearTimeouts()}>
                    <BsFillStopFill className="stop-icon" />
                </div>
            );
        } else if (currentStep === arraySteps.length) {
            playAlgorithmsButton = (
                <div onClick={() => this.generateNewArray()}>
                    <MdReplay className="replay-icon" />
                </div>
            );
        } else {
            playAlgorithmsButton = (
                <div onClick={() => this.startVisualizer()}>
                    <BsFillPlayFill className="start-icon" />
                </div>
            );
        }
        return (
            <div className="sorting-visualizer-container">
                <header>
                    <h4 className="sorting-visualizer-title">
                        Sorting Algorithms Visualizer
                    </h4>
                </header>
                <AlgorithmsSelector
                    values={Object.keys(this.ALGORITHMS)}
                    currentValue={algorithm}
                    onChange={this.selectAlgorithm}
                />

                <Timer
                    currentStep={currentStep}
                    isAlgorithmSortOver={isAlgorithmSortOver}
                    algorithm={algorithm}
                />
                <div className="array-display-container">
                    <div className="array-bar-container">
                        {array.map((value, index) => (
                            <ArrayBar
                                array={value}
                                color={colorElement[index]}
                                key={index}
                                value={value}
                                count={count}
                            />
                        ))}
                    </div>
                </div>
                <div className="generate-array-button">
                    <Button
                        color="inherit"
                        variant="outlined"
                        sx={{ fontSize: ".7rem" }}
                        onClick={() => this.generateNewArray()}
                    >
                        Generate Array
                    </Button>
                </div>
                <div className="controller-container">
                    <div className="controller">
                        <BarSizeController
                            changeBarCount={this.changeBarCount}
                            count={count}
                        />
                    </div>
                    <div className="play-algorithms-button">
                        {playAlgorithmsButton}
                    </div>

                    <div className="controller">
                        <SpeedController
                            changeAnimationSpeed={this.changeAnimationSpeed}
                            currentSpeed={delayAnimation}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
