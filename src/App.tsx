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
  border-collapse: collapse;

  th,
  td {
    border: solid thin black;
    padding: 0.5rem;
  }
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
  const { tracker, dashboardSummary, updateConfidence } = useTracker({
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
      <h2>Dashboard Summary</h2>
      {components.map((component) => (
        <React.Fragment key={component.id}>
          <h3>{component.name}</h3>
          <RequirementTable>
            <thead>
              <tr>
                <th>{component.name}</th>
                <th>%</th>
                {CONFIDENCE_OPTIONS.map(({ name, colour }) => (
                  <th
                    key={name}
                    style={{ color: "white", backgroundColor: colour }}
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {component.sections
                .map((section) => ({
                  section,
                  sectionTracker: dashboardSummary[section.id],
                }))
                .map(({ section, sectionTracker }) => (
                  <React.Fragment key={section.id}>
                    {
                      <tr key={section.id}>
                        <td>{section.title}</td>
                        <td>{sectionTracker.percentCovered.toFixed(1)}</td>
                        {CONFIDENCE_OPTIONS.map(({ confidence, name }) => (
                          <td key={name}>
                            {sectionTracker.byConfidence[confidence] || 0}
                          </td>
                        ))}
                      </tr>
                    }
                  </React.Fragment>
                ))}
            </tbody>
          </RequirementTable>
        </React.Fragment>
      ))}

      <h2>All Components</h2>
      {components.map((component) => (
        <React.Fragment key={component.id}>
          <h3>
            {component.id} - {component.name}
          </h3>
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
                <p>{section.description}</p>
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
