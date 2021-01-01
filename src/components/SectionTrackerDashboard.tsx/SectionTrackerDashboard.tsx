import React from "react";
import useTracker from "../../api/useTracker";
import useAppNavigation from "../../lib/useAppNavigation";
import { RequirementTable } from "../../Styled";
import { Confidence, SpecificationSubSection } from "../../types";
import ConfidencePicker from "../ConfidencePicker";

interface OnChangeById {
  [s: string]: (v: Confidence) => any;
}

const getRequirementId = ({ id }: SpecificationSubSection, rIndex: number) =>
  `${id}-${rIndex}`;

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
    updateConfidence,
  } = useTracker({
    studentId: "",
    specificationId,
  });

  const onConfidenceChangeById: OnChangeById = React.useMemo(() => {
    const byId: OnChangeById = {};

    components
      .filter(({ id }) => id === componentId)
      .forEach((component) =>
        component.sections
          .filter(({ id }) => id === sectionId)
          .forEach((section) =>
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
  }, [componentId, sectionId, components, updateConfidence]);

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
    </React.Fragment>
  );
};

export default SectionTrackerDashboard;
