import { Slider } from "@mui/material";
import React from "react";

export default function Controller({ changeCount, count, children }) {
    const { step, min, max } = children;
    return (
        <div>
            <Slider
                aria-labelledby="discrete-slider"
                defaultValue={count}
                key={`value-${count}`}
                valueLabelDisplay="auto"
                onChange={changeCount}
                step={step}
                marks
                min={min}
                max={max}
                color="secondary"
                style={{ width: "50%" }}
            />
        </div>
    );
}
