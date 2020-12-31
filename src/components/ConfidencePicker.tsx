import React from "react";

import { Confidence } from "../types";

export interface ConfidenceOption {
  confidence: Confidence;
  name: string;
  colour: string;
}

export const CONFIDENCE_OPTIONS: ConfidenceOption[] = [
  {
    confidence: Confidence.notCovered,
    name: "Not covered",
    colour: "white",
  },
  {
    confidence: Confidence.veryHigh,
    name: "Very High",
    colour: "purple",
  },
  {
    confidence: Confidence.high,
    name: "High",
    colour: "green",
  },
  {
    confidence: Confidence.median,
    name: "Median",
    colour: "orange",
  },
  {
    confidence: Confidence.low,
    name: "Low",
    colour: "red",
  },
];

interface Props {
  value: Confidence;
  onChange: (v: Confidence) => any;
}

const ConfidencePicker: React.FunctionComponent<Props> = ({
  value,
  onChange,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => onChange(parseInt(value)),
    [onChange]
  );

  return (
    <select onChange={onSelectChange} value={value}>
      {CONFIDENCE_OPTIONS.map(({ name, confidence }) => (
        <option key={name} value={confidence}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default ConfidencePicker;
