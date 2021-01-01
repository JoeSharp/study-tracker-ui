import React from "react";
import styled from "styled-components";
import useTracker from "../../api/useTracker";
import useAppNavigation from "../../lib/useAppNavigation";
import { StyledTable } from "../../styles";
import ConfidencePicker from "../ConfidencePicker";

export const RequirementTable = styled(StyledTable)`
  th.requirement-heading {
    background-color: lime;
  }

  th.confidence-heading {
    width: 10rem;
    background-color: purple;
  }
`;

export interface Props {
  componentId: string;
  specificationId: string;
  sectionId: string;
}

const SectionTrackerDashboard: React.FunctionComponent<Props> = ({
  componentId,
  specificationId,
  sectionId,
}) => {
  const { nav } = useAppNavigation();

  const {
    specification: { components },
    tracker,
    getOnUpdateConfidence,
  } = useTracker({
    studentId: "",
    specificationId,
  });

  return (
    <React.Fragment>
      <h2>
        Tracker for Component {componentId}, Section {sectionId}
      </h2>
      <div>
        <button onClick={() => nav.goToDashboard(specificationId)}>
          Go Back to Specification
        </button>
      </div>
      {components
        .filter(({ id }) => id === componentId)
        .map((component) => (
          <React.Fragment key={component.id}>
            <h3>
              {component.id} - {component.name}
            </h3>
            {component.sections
              .filter(({ id }) => id === sectionId)
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
                              <th className="requirement-heading">
                                Requirement
                              </th>
                              <th className="confidence-heading">Confidence</th>
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
                                  requirementTracker: { confidence },
                                }) => (
                                  <tr key={requirementIndex}>
                                    <td>{requirement}</td>
                                    <td>
                                      <ConfidencePicker
                                        onChange={getOnUpdateConfidence(
                                          component.id,
                                          section.id,
                                          subsection.id,
                                          requirementIndex
                                        )}
                                        value={confidence}
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
    </React.Fragment>
  );
};

export default SectionTrackerDashboard;
