import React from "react";
import useTracker from "../../api/useTracker";
import useAppNavigation from "../../lib/useAppNavigation";
import { RequirementTable } from "../../Styled";
import { CONFIDENCE_OPTIONS } from "../ConfidencePicker/ConfidencePicker";

export interface Props {
  specificationId: string;
}

const SpecificationTracker: React.FunctionComponent<Props> = ({
  specificationId,
}) => {
  const { nav } = useAppNavigation();

  const {
    specification: { subject, examBoard, qualificationCode, components },
    dashboardSummary,
  } = useTracker({
    studentId: "",
    specificationId,
  });

  return (
    <div>
      <h1>{subject}</h1>
      <div>
        {examBoard} - {qualificationCode}
      </div>
      <div>
        <button onClick={() => nav.goToQualificationSelection()}>
          Go Back to Qualification Selection
        </button>
      </div>
      <h2>Dashboard Summary</h2>
      {components.map((component) => (
        <React.Fragment key={component.id}>
          <h3>{component.name}</h3>
          <RequirementTable>
            <thead>
              <tr>
                <th>Track</th>
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
                        <td>
                          <button
                            onClick={() =>
                              nav.goToSpecificationSection(
                                component.id,
                                specificationId,
                                section.id
                              )
                            }
                          >
                            Track
                          </button>
                        </td>
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
    </div>
  );
};

export default SpecificationTracker;
