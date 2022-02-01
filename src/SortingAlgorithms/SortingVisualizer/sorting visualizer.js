import React from "react";
// algorithms
import { bubbleSort } from "../Algorithms/bubbleSort";
import "../components/ArrayBar.css";
import RandomValueGenerator from "../utils/RandomValueGenerator";
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
            delayAnimation: 100,
            algorithm: "Bubble Sort",
            timeouts: [],
        };
    }

    //new functions start from here

    ALGORITHMS = {
        bubbleSort: bubbleSort,
    };

    //*this is the main core function i need to be careful of
    generateSteps() {
        let array = this.state.array.slice();
        let steps = this.state.arraySteps.slice();
        let colorSteps = this.state.colorSteps.slice();
        bubbleSort(array, 0, steps, colorSteps);
        this.setState({
            arraySteps: steps,
            colorSteps: colorSteps,
        });
    }
    //? this is for reseting the color of the array after finishing the animation
    clearcolorElement = () => {
        let blankKey = new Array(this.state.count).fill("transparent");

        this.setState({
            colorElement: blankKey,
            colorSteps: [blankKey],
        });
    };

    clearTimeouts = () => {
        this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
        this.setState({
            timeouts: [],
        });
    };
    componentDidMount() {
        this.generateNewArray();
    }

    generateNewArray() {
        const array = [];
        this.clearcolorElement();
        for (let i = 0; i < this.state.count; i++) {
            array.push(RandomValueGenerator(20, 230));
        }
        this.setState(
            { array: array, arraySteps: [array], currentStep: 0 },
            () => {
                this.generateSteps();
            }
        );
    }

    start = () => {
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
                });
                timeouts.push(timeout);
            }, this.state.delayAnimation * i);
            i++;
        }

        this.setState({
            timeouts: timeouts,
        });
    };

    render() {
        const { array, colorElement } = this.state;
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
                    <button onClick={() => this.start()}>Bubble Sort</button>
                </div>
                <div className="array-display-container">
                    <div className="array-bar-container">
                        {array.map((value, idx) => (
                            <div
                                className="array-bar"
                                key={idx}
                                style={{
                                    backgroundColor: `${colorElement[idx]}`,
                                    height: `${value}px`,
                                }}
                            >
                                <span className="value-inside-bar">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
