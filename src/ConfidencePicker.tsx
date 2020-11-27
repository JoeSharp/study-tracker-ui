import React from "react";
import { ConfidenceOption } from "./types";

export const CONFIDENCE_OPTIONS: ConfidenceOption[] = [
  {
    name: "Not covered",
    colour: "white",
  },
  {
    name: "Very High",
    colour: "purple",
  },
  {
    name: "High",
    colour: "green",
  },
  {
    name: "Median",
    colour: "orange",
  },
  {
    name: "Low",
    colour: "red",
  },
];

interface Props {
  value: string;
  onChange: (v: string) => any;
}

const ConfidencePicker: React.FunctionComponent<Props> = ({
  value,
  onChange,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => onChange(value),
    [onChange]
  );

  return (
    <select onChange={onSelectChange} value={value}>
      {CONFIDENCE_OPTIONS.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default ConfidencePicker;
