import React from "react";

import { Confidence } from "../../types";

export interface ConfidenceOption {
  confidence: Confidence;
  name: string;
}

export const CONFIDENCE_OPTIONS: ConfidenceOption[] = [
  {
    confidence: Confidence.notCovered,
    name: "Not covered",
  },
  {
    confidence: Confidence.veryHigh,
    name: "Very High",
  },
  {
    confidence: Confidence.high,
    name: "High",
  },
  {
    confidence: Confidence.medium,
    name: "Medium",
  },
  {
    confidence: Confidence.low,
    name: "Low",
  },
];

export type OnConfidenceChange = (v: Confidence) => any;

interface Props {
  value: Confidence;
  onChange: OnConfidenceChange;
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
