import { useEffect, useState } from "react";
export default function Timer({ currentStep, isAlgorithmSortOver }) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval;
        if (isAlgorithmSortOver === false) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (isAlgorithmSortOver === true) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isAlgorithmSortOver]);
    return (
        <div className="time-and-comparisons-container">
            <span>
                Comparisons: <strong>{currentStep}</strong>
            </span>
            <span>
                Time:
                <strong>
                    <span>
                        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                    </span>
                    <span>
                        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
                    </span>
                    <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
                </strong>
            </span>
        </div>
    );
}
