import React from "react";
import styled from "styled-components";
import useTracker from "../../api/useTracker";
import useAppNavigation from "../../lib/useAppNavigation";
import { StyledTable } from "../../styles";
import { Confidence } from "../../types";
import { CONFIDENCE_OPTIONS } from "../ConfidencePicker/ConfidencePicker";

export const SummaryTable = styled(StyledTable)`
  th.summary-track {
    width: 6rem;
  }

  th.summary-name {
    width: 15rem;
  }

  th.summary-percent {
    width: 4rem;
  }

  th.summary-confidence-heading {
    text-align: center;
  }

  th.summary-confidence-0 {
    color: black;
  }
  th.summary-confidence-1 {
    color: white;
    background-color: purple;
  }
  th.summary-confidence-2 {
    color: white;
    background-color: green;
  }
  th.summary-confidence-3 {
    color: white;
    background-color: orange;
  }
  th.summary-confidence-4 {
    color: white;
    background-color: red;
  }
`;

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
          <SummaryTable>
            <thead>
              <tr>
                <th className="summary-track"></th>
                <th className="summary-name"></th>
                <th className="summary-percent"></th>
                <th className="summary-confidence-heading" colSpan={4}>
                  Confidence
                </th>
              </tr>
              <tr>
                <th>Track</th>
                <th>{component.name}</th>
                <th>%</th>
                {CONFIDENCE_OPTIONS.filter(
                  ({ confidence }) => confidence !== Confidence.notCovered
                ).map(({ confidence, name }) => (
                  <th className={`summary-confidence-${confidence}`} key={name}>
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
                        {CONFIDENCE_OPTIONS.filter(
                          ({ confidence }) =>
                            confidence !== Confidence.notCovered
                        ).map(({ confidence, name }) => (
                          <td key={name}>
                            {sectionTracker.byConfidence[confidence] || 0}
                          </td>
                        ))}
                      </tr>
                    }
                  </React.Fragment>
                ))}
            </tbody>
          </SummaryTable>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SpecificationTracker;
