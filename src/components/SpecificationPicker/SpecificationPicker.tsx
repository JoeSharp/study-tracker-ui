import React from "react";
import useSpecifications from "../../api/useSpecifications";
import { Specification } from "../../types";

export interface SpecificationOption {
  specificationId: string;
  name: string;
}

interface Props {
  specifications: Specification[];
  value: string;
  onChange: (v: string) => any;
}

const SpecificationPicker: React.FunctionComponent<Props> = ({
  value,
  onChange,
  specifications,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => onChange(value),
    [onChange]
  );

  return (
    <select onChange={onSelectChange} value={value}>
      {specifications.map(
        ({ specificationId, examBoard, qualificationCode, subject }) => (
          <option key={specificationId} value={specificationId}>
            {examBoard} {subject} {qualificationCode}
          </option>
        )
      )}
    </select>
  );
};

interface UsePicker {
  componentProps: Props;
}

export const usePicker = (): UsePicker => {
  const { specifications, defaultSpecification } = useSpecifications();

  const [value, onChange] = React.useState<string>(
    defaultSpecification.specificationId
  );

  return {
    componentProps: {
      specifications,
      value,
      onChange,
    },
  };
};

export default SpecificationPicker;
