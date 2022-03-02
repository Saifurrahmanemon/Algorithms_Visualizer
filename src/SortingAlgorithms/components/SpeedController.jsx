import { Slider } from "@mui/material";
import React from "react";

export default function SpeedController({
    changeAnimationSpeed,
    currentSpeed,
}) {
    return (
        <div>
            <h5>Animation speed</h5>
            <Slider
                aria-labelledby="discrete-slider"
                defaultValue={currentSpeed}
                key={`value-${currentSpeed}`}
                valueLabelDisplay="auto"
                onChange={changeAnimationSpeed}
                step={50}
                marks
                min={50}
                max={500}
                color="primary"
                sx={{ width: "50%" }}
            />
        </div>
    );
}
