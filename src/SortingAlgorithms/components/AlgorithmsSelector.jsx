import {
   FormControl,
   FormControlLabel,
   Radio,
   RadioGroup,
} from "@mui/material";
import React from "react";

export default function AlgorithmsSelector({ values, currentValue, onChange }) {
   return (
      <div
         style={{
            textAlign: "center",
            overflow: "auto",
            margin: "0 2rem",
         }}
      >
         <FormControl>
            <RadioGroup
               variant="scrollable"
               aria-label="scrollable auto tabs example"
               row
               aria-labelledby="demo-row-radio-buttons-group-label"
               value={currentValue}
               onChange={onChange}
               sx={{
                  flexWrap: "nowrap",
               }}
            >
               {values.map((value, index) => {
                  return (
                     <FormControlLabel
                        key={`${value}_${index}`}
                        value={values[index]}
                        control={
                           <Radio
                              size="small"
                              color="default"
                              sx={{
                                 "& .MuiSvgIcon-root": {
                                    fontSize: 15,
                                 },
                              }}
                           />
                        }
                        label={values[index].toLowerCase()}
                        sx={{
                           color: "text.secondary",
                           borderBottom: 1,
                           fontSize: 5,
                           borderColor: "grey.200",
                           margin: 2,
                           paddingRight: 1,
                           "&:hover": {
                              background: "#fafafa",
                           },
                        }}
                     />
                  );
               })}
            </RadioGroup>
         </FormControl>
      </div>
   );
}
