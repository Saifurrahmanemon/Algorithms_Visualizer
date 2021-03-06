//MUI
import { Button } from "@mui/material";
import React from "react";
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
   AlgorithmButton,
   AlgorithmsSelector,
   ArrayBar,
   Controller,
   Header,
   Timer,
} from "../components";
//Utils
import RandomValueGenerator from "../utils/RandomValueGenerator";
//Zustand
import { useTime } from "../utils/store";
//CSS
import "./SortingVisualizer.css";

export default class SortingVisualizer extends React.Component {
   constructor() {
      super();

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
      selectionSort: selectionSort,
      insertionSort: insertionSort,
      quickSort: quickSort,
      mergeSort: mergeSort,
   };

   // for animation speed controller
   speedController = {
      step: 50,
      min: 50,
      max: 500,
   };
   // for bar size controller
   BarController = {
      step: 2,
      min: 10,
      max: 30,
   };

   componentDidMount() {
      this.generateNewArray();
   }
   // for generating new array
   generateNewArray = () => {
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
   };

   //*this is the core method
   generateSteps() {
      const { array, arraySteps, colorSteps, algorithm } = this.state;
      let newArray = array.slice();
      let newSteps = arraySteps.slice();
      let newColorSteps = colorSteps.slice();

      let barIndexPosition = 0;
      this.ALGORITHMS[algorithm](
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

   // for resetting  color of the array after  Animation is over
   clearColorElement = () => {
      let blankKey = new Array(this.state.count).fill(1);

      this.setState({
         colorElement: blankKey,
         colorSteps: [blankKey],
      });
   };

   // for clearing timeouts
   clearTimeouts = () => {
      this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
      this.setState({
         timeouts: [],
         isAlgorithmSortOver: true,
      });
   };

   //  for starting visualization
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
            /* --------------------------------------------------
                 *Comparing the currentStep with steps.length to solve Timer issue. isAlgorithmSortOver will remain false until the array is fully sorted.

                 *Adding '+ 1' to currentStep because the steps.length always will be '+1' bigger than the currentStep..
                -----------------------------------------------------
                 */
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

   //  for resetting the timer by using useTime hook from (store.js)
   resetTimer = () => {
      useTime.getState().resetTime();
   };
   // for changing  algorithm
   selectAlgorithm = (event) => {
      this.setState(
         {
            // this will set the value for the algorithm
            algorithm: event.target.value,
            currentStep: 0,
            arraySteps: [
               this.state.arraySteps[
                  this.state.currentStep === 0 ? 0 : this.state.currentStep - 1
               ],
            ],
         },
         () => this.generateSteps()
      );

      this.generateNewArray();
   };
   // for changing the bar size
   changeBarCount = (event) => {
      this.clearTimeouts();
      this.setState({ count: event.target.value });
   };
   // for changing animation speed
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
         delayAnimation,
      } = this.state;
      return (
         <div className="sorting-visualizer-container">
            <Header />
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
                  <h5>Bar Size</h5>
                  <Controller changeCount={this.changeBarCount} count={count}>
                     {this.BarController}
                  </Controller>
               </div>
               <div className="play-algorithms-button">
                  <AlgorithmButton
                     {...this.state}
                     startVisualizer={this.startVisualizer}
                     clearTimeouts={this.clearTimeouts}
                     generateNewArray={this.generateNewArray}
                  ></AlgorithmButton>
               </div>

               <div className="controller">
                  <h5>Animation speed</h5>
                  <Controller
                     changeCount={this.changeAnimationSpeed}
                     count={delayAnimation}
                  >
                     {this.speedController}
                  </Controller>
               </div>
            </div>
         </div>
      );
   }
}
