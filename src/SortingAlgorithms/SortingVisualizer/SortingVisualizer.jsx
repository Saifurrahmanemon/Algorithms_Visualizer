import React, { useEffect, useState } from "react";
import RandomValueGenerator from "../../utils/RandomValueGenerator";
import "./SortingVisualizer.css";

export default function SortingVisualizer() {
    const [array, setArray] = useState(() => []);

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        const array = [];
        for (let i = 0; i < 30; i++) {
            array.push(RandomValueGenerator(5, 100));
        }
        setArray(array);
    };

    return (
        <div className="array-display-container">
            <h1>Algorithms visualizer</h1>
            {array.map((value, index) => (
                <div
                    className="array-bar"
                    key={index}
                    style={{ height: `${value}px` }}
                >
                    <span className="value-inside-bar">{value}</span>
                </div>
            ))}
            <div className="algorithms-button">
                <button onClick={() => resetArray()}>generate New Array</button>
            </div>
        </div>
    );
}
