import React from "react";

import { Confidence, Specification } from '../types';
import useLocalStorage, { useStoreObjectFactory } from "../useLocalStorage";
import ocrALevelComputerScience from "../useSpecification/specs/ocrALevelComputerScience";

export interface SpecificationOption {
    specificationId: string;
    name: string;
}

interface Props {
    value: string;
    onChange: (v: string) => any;
}

const SpecificationPicker: React.FunctionComponent<Props> = ({
    value,
    onChange,
}) => {
    const { value: specifications } = useLocalStorage('specifications', [ocrALevelComputerScience], useStoreObjectFactory<Specification[]>())

    const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
        ({ target: { value } }) => onChange(value),
        [onChange]
    );

    return (
        <select onChange={onSelectChange} value={value}>
            {specifications.map(({ specificationId, examBoard, qualificationCode, subject }) => (
                <option key={specificationId} value={specificationId}>
                    {examBoard} {subject} {qualificationCode}
                </option>
            ))}
        </select>
    );
};

interface UsePicker {
    componentProps: Props;
}

export const usePicker = (): UsePicker => {
    const [value, onChange] = React.useState<string>(ocrALevelComputerScience.specificationId);

    return {
        componentProps: {
            value,
            onChange
        }
    }
}

export default SpecificationPicker;
