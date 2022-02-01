import React from "react";
// algorithms
import { bubbleSort } from "../Algorithms/bubbleSort";
import { insertionSort } from "../Algorithms/insertionSort";
import { mergeSort } from "../Algorithms/mergeSort";
import { quickSort } from "../Algorithms/quickSort";
import { selectionSort } from "../Algorithms/selectionSort";
// Components
import ArrayBar from "../components/ArrayBar";
import Timer from "../components/Timer";
import RandomValueGenerator from "../utils/RandomValueGenerator";
import "./SortingVisualizer.css";

//TODO: need to reset timer on generateNewArray click
//TODO: add function to select algorithms
//TODO: add control array speed function
//TODO: add a timer to calculate the time of sorting
//* TODO: can not remember for now
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
            delayAnimation: 50,
            algorithm: "quickSort",
            timeouts: [],
            isAlgorithmSortOver: true,
        };
    }

    _ALGORITHMS = {
        bubbleSort: bubbleSort,
        mergeSort: mergeSort,
        insertionSort: insertionSort,
        selectionSort: selectionSort,
        quickSort: quickSort,
    };

    //*this is the main core function i need to be careful of
    generateSteps() {
        let newArray = this.state.array.slice();
        let newSteps = this.state.arraySteps.slice();
        let newColorSteps = this.state.colorSteps.slice();
        // for timer function

        let barIndexPosition = 0;
        this._ALGORITHMS[this.state.algorithm](
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
    //? this is for reseting the color of the array after finishing  Animation
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
        });
    };
    componentDidMount() {
        this.generateNewArray();
    }
    //? for generating new array
    generateNewArray() {
        const array = [];
        this.clearColorElement();
        for (let i = 0; i < this.state.count; i++) {
            array.push(RandomValueGenerator(20, 230));
        }
        this.setState(
            {
                array: array,
                arraySteps: [array],
                currentStep: 0,
                isAlgorithmSortOver: true,
            },
            () => {
                this.generateSteps();
            }
        );
    }

    //? this is for starting  animation
    startVisualizer = () => {
        let steps = this.state.arraySteps;
        let colorSteps = this.state.colorSteps;

        this.clearTimeouts();

        let timeouts = [];
        let i = 0;

        //!this is the place where i need to be careful of
        while (i < steps.length - this.state.currentStep) {
            let timeout = setTimeout(() => {
                let currentStep = this.state.currentStep;
                this.setState({
                    array: steps[currentStep],
                    colorElement: colorSteps[currentStep],
                    currentStep: currentStep + 1,
                    isAlgorithmSortOver: false,
                });
                //? comparing the currentStep with arraySteps and the state of isAlgorithmSortOver will remain false until the array is fully sorted.. Adding '+ 1' to currentStep because the arraySteps array is one step longer than the array..
                if (currentStep + 1 === i) {
                    this.setState({
                        isAlgorithmSortOver: true,
                    });
                }

                timeouts.push(timeout);
            }, this.state.delayAnimation * i);
            i++;
        }

        this.setState({
            timeouts: timeouts,
            // isAlgorithmSortOver: false,
        });
    };

    render() {
        const { array, colorElement, currentStep, count, isAlgorithmSortOver } =
            this.state;
        return (
            <div className="sorting-visualizer-container">
                <h4 className="sorting-visualizer-title">
                    Sorting Algorithms Visualizer
                </h4>
                <div className="algorithms-button">
                    <button onClick={() => this.generateNewArray()}>
                        Generate New Array
                    </button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.startVisualizer()}>
                        Bubble Sort
                    </button>
                </div>
                <Timer
                    currentStep={currentStep}
                    isAlgorithmSortOver={isAlgorithmSortOver}
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
            </div>
        );
    }
}
