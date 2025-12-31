// RangeInputFields.js
import React from "react";
import { Range, getTrackBackground } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { Col, FormGroup, Label } from "reactstrap";
import { setPrice, setArea } from "@/redux-toolkit/reducers/inputsReducer";

const RangeInputFields = ({ label, min, max, sm, lg }) => {
  const { symbol, currencyValue } = useSelector(
    (state) => state.currencyReducer
  );
  const { price, area } = useSelector((state) => state.inputsReducer);
  const dispatch = useDispatch();

  const STEP = 1;

  // pick correct redux value
  const values = label === "Price" ? price : area;

  // clamp values to slider range
  const clampedValues = [
    Math.max(min, Math.min(max, values[0])),
    Math.max(min, Math.min(max, values[1])),
  ];

  return (
    <Col lg={lg || 12} sm={sm || 12}>
      <FormGroup>
        <div className="price-range">
          <Label>
            {label} : {label === "Price" && `₹`}
            {(label === "Area"
              ? clampedValues[0]
              : clampedValues[0] * currencyValue
            ).toFixed(2)}{" "}
            - {label === "Price" && `₹`}
            {(label === "Area"
              ? clampedValues[1]
              : clampedValues[1] * currencyValue
            ).toFixed(2)}{" "}
            {label === "Area" && "sq ft"}
          </Label>
          <div
            className="theme-range-3"
            id={label === "Price" ? "slider-1" : "slider-2"}
          >
            <Range
              values={clampedValues}
              step={STEP}
              min={min}
              max={max}
              onChange={(newValues) => {
                if (label === "Price") {
                  dispatch(
                    setPrice([
                      Math.max(min, Math.min(max, newValues[0])),
                      Math.max(min, Math.min(max, newValues[1])),
                    ])
                  );
                } else if (label === "Area") {
                  dispatch(
                    setArea([
                      Math.max(min, Math.min(max, newValues[0])),
                      Math.max(min, Math.min(max, newValues[1])),
                    ])
                  );
                }
              }}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values: clampedValues,
                      colors: ["#ccc", "var(--theme-default2)", "#ccc"],
                      min: min,
                      max: max,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => {
                const { key, ...restProps } = props;
                return (
                  <div key={key} {...restProps}>
                    <div
                      style={{
                        height: "16px",
                        width: "8px",
                        borderRadius: "30%",
                        backgroundColor: "var(--theme-default2)",
                      }}
                    />
                  </div>
                );
              }}
            />
          </div>
        </div>
      </FormGroup>
    </Col>
  );
};

export default RangeInputFields;
