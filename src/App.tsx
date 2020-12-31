import React from "react";
import useSpec from "./useSpecification/useSpecification";
import styled from "styled-components";
import ConfidencePicker, {
  CONFIDENCE_OPTIONS,
} from "./components/ConfidencePicker";
import SpecificationPicker, {
  usePicker as useSpecificationPicker,
} from "./components/SpecificationPicker";
import { Confidence, SpecificationSubSection } from "./types";
import useTracker from "./useTracker";

const MainDiv = styled.div`
  font-family: Arial, Helvetica, sans-serif; ;
`;
const RequirementTable = styled.table`
  text-align: left;
`;

interface OnChangeById {
  [s: string]: (v: Confidence) => any;
}

const getRequirementId = ({ id }: SpecificationSubSection, rIndex: number) =>
  `${id}-${rIndex}`;

const App: React.FunctionComponent = () => {
  const { componentProps: specPickerProps } = useSpecificationPicker();
  const {
    specificationId,
    examBoard,
    qualificationCode,
    subject,
    components,
  } = useSpec(specPickerProps.value);
  const { tracker, updateConfidence } = useTracker({
    studentId: "",
    specificationId,
  });

  const onConfidenceChangeById: OnChangeById = React.useMemo(() => {
    const byId: OnChangeById = {};

    components.forEach((component) =>
      component.sections.forEach((section) =>
        section.subsections.forEach((subsection) => {
          subsection.requirements.forEach((_, requirementIndex) => {
            byId[getRequirementId(subsection, requirementIndex)] = (
              confidence: Confidence
            ) => {
              updateConfidence(
                component.id,
                section.id,
                subsection.id,
                requirementIndex,
                confidence
              );
            };
          });
        })
      )
    );

    return byId;
  }, [components, updateConfidence]);

  return (
    <MainDiv>
      <SpecificationPicker {...specPickerProps} />
      <h1>{subject}</h1>
      <div>
        {examBoard} - {qualificationCode}
      </div>
      {components.map((component) => (
        <React.Fragment key={component.name}>
          <h2>
            {component.id} - {component.name}
          </h2>
          {component.sections
            .map((section) => ({
              section,
              sectionTracker:
                tracker.components[component.id].sections[section.id],
            }))
            .map(({ section, sectionTracker }) => (
              <React.Fragment key={section.id}>
                <h3>
                  {section.id} - {section.title}
                </h3>
                <RequirementTable>
                  <thead>
                    <tr>
                      {CONFIDENCE_OPTIONS.map(({ name }) => (
                        <th key={name}>{name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      <tr key={section.id}>
                        {/* {CONFIDENCE_OPTIONS.map(({ name }) => (
                          <td key={name}>
                            {(confidences.sections[s] || {})[name]}
                          </td>
                        ))} */}
                      </tr>
                    }
                  </tbody>
                </RequirementTable>
                <div>{section.description}</div>
                {section.subsections
                  .map((subsection) => ({
                    subsection,
                    subsectionTracker:
                      sectionTracker.subsections[subsection.id],
                  }))
                  .map(({ subsection, subsectionTracker }) => (
                    <React.Fragment key={subsection.id}>
                      <h4>
                        {subsection.id} - {subsection.title}
                      </h4>
                      <RequirementTable>
                        <thead>
                          <tr>
                            <th>Requirement</th>
                            <th>Confidence</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subsection.requirements
                            .map((requirement, requirementIndex) => ({
                              requirement,
                              requirementIndex,
                              requirementTracker:
                                subsectionTracker.requirements[
                                  requirementIndex
                                ],
                            }))
                            .map(
                              ({
                                requirement,
                                requirementIndex,
                                requirementTracker,
                              }) => (
                                <tr key={requirementIndex}>
                                  <td>{requirement}</td>
                                  <td>
                                    <ConfidencePicker
                                      onChange={
                                        onConfidenceChangeById[
                                          getRequirementId(
                                            subsection,
                                            requirementIndex
                                          )
                                        ]
                                      }
                                      value={requirementTracker.confidence}
                                    />
                                  </td>
                                </tr>
                              )
                            )}
                        </tbody>
                      </RequirementTable>
                    </React.Fragment>
                  ))}
              </React.Fragment>
            ))}
        </React.Fragment>
      ))}
    </MainDiv>
  );
};

export default App;
