import { Slider } from "@mui/material";
import React from "react";

export default function BarSizeController({ changeBarCount, count }) {
    return (
        <div>
            <h5>Bar Size</h5>
            <Slider
                aria-labelledby="discrete-slider"
                defaultValue={count}
                key={`value-${count}`}
                valueLabelDisplay="auto"
                onChange={changeBarCount}
                step={2}
                marks
                min={10}
                max={30}
                color="secondary"
                style={{ width: "50%" }}
            />
        </div>
    );
}
