import React from "react";
import useSpec from "./useSpec";
import styled from "styled-components";
import ConfidencePicker, { CONFIDENCE_OPTIONS } from "./ConfidencePicker";
import {
  SpecComponent,
  Specification,
  SpecSection,
  SpecSubSection,
} from "./types";

const MainDiv = styled.div`
  font-family: Arial, Helvetica, sans-serif; ;
`;
const RequirementTable = styled.table`
  text-align: left;
`;

interface OnChangeById {
  [s: string]: (v: string) => any;
}

interface SectionConfidences {
  [sectionId: string]: {
    [confidence: string]: number;
  };
}

interface SubSectionConfidences {
  [subsectionId: string]: {
    [requirementIndex: number]: string;
  };
}

interface ConfidencesState {
  specification: Specification;
  sections: SectionConfidences;
  subsections: SubSectionConfidences;
}

const DEFAULT_CONFIDENCE: ConfidencesState = {
  specification: {
    examBoard: "Hogwards",
    qualificationCode: "MGS",
    subject: "Muggle Studdies",
    components: [],
  },
  sections: {},
  subsections: {},
};

interface ConfidenceInitAction {
  type: "init";
  specification: Specification;
}

interface ConfidenceSetAction {
  type: "set";
  component: SpecComponent;
  section: SpecSection;
  subsection: SpecSubSection;
  requirementIndex: number;
  confidence: string;
}

const confidenceReducer = (
  state: ConfidencesState,
  action: ConfidenceSetAction | ConfidenceInitAction
): ConfidencesState => {
  switch (action.type) {
    case "set": {
      const subsections: SubSectionConfidences = {
        ...state.subsections,
        [action.subsection.id]: {
          ...state.subsections[action.subsection.id],
          [action.requirementIndex]: action.confidence,
        },
      };
      const sections: SectionConfidences = {};
      state.specification.components.forEach((component) => {
        component.sections.forEach((section) => {
          if (!sections[section.id]) {
            sections[section.id] = {};
          }
          section.subsections.forEach((subsection) => {
            if (!subsections[subsection.id]) {
              subsections[subsection.id] = {};
            }
            subsection.requirements.forEach((_, requirementIndex) => {
              let confidence: string =
                subsections[subsection.id][requirementIndex] ||
                CONFIDENCE_OPTIONS[0].name;
              if (!sections[section.id][confidence]) {
                sections[section.id][confidence] = 0;
              }
              sections[section.id][confidence] += 1;
            });
          });
        });
      });

      return {
        specification: state.specification,
        sections,
        subsections,
      };
    }
    case "init": {
      const sections: SectionConfidences = {};
      const subsections: SubSectionConfidences = {};
      action.specification.components.forEach((component) =>
        component.sections.forEach((section) => {
          sections[section.id] = CONFIDENCE_OPTIONS.map((c) => c.name).reduce(
            (acc, curr) => ({ ...acc, [curr]: 0 }),
            {}
          );

          section.subsections.forEach((subsection) => {
            if (!subsections[subsection.id]) {
              subsections[subsection.id] = {};
            }
            subsection.requirements.forEach((_, requirementIndex) => {
              subsections[subsection.id][requirementIndex] =
                CONFIDENCE_OPTIONS[0].name;
              sections[section.id][CONFIDENCE_OPTIONS[0].name] += 1;
            });
          });
        })
      );

      return {
        specification: action.specification,
        sections,
        subsections,
      };
    }
  }
};

const getRequirementId = ({ id }: SpecSubSection, rIndex: number) =>
  `${id}-${rIndex}`;

function App() {
  const { specification } = useSpec();
  const { examBoard, qualificationCode, subject, components } = specification;

  const [confidences, dispatchConfidence] = React.useReducer(
    confidenceReducer,
    DEFAULT_CONFIDENCE
  );

  React.useEffect(() => dispatchConfidence({ type: "init", specification }), [
    specification,
  ]);

  const onConfidenceChangeById: OnChangeById = React.useMemo(() => {
    const byId: OnChangeById = {};

    components.forEach((component) =>
      component.sections.forEach((section) =>
        section.subsections.forEach((subsection) => {
          subsection.requirements.forEach((_, requirementIndex) => {
            byId[getRequirementId(subsection, requirementIndex)] = (
              confidence: string
            ) => {
              dispatchConfidence({
                type: "set",
                component,
                section,
                subsection,
                requirementIndex,
                confidence,
              });
            };
          });
        })
      )
    );

    return byId;
  }, [components]);

  return (
    <MainDiv>
      <h1>{subject}</h1>
      <div>
        {examBoard} - {qualificationCode}
      </div>
      {components.map((component) => (
        <React.Fragment key={component.name}>
          <h2>
            {component.id} - {component.name}
          </h2>
          {component.sections.map((section) => (
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
                  {Object.keys(confidences.sections)
                    .filter((s) => s === section.id)
                    .map((s) => (
                      <tr key={s}>
                        {CONFIDENCE_OPTIONS.map(({ name }) => (
                          <td key={name}>
                            {(confidences.sections[s] || {})[name]}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </RequirementTable>
              <div>{section.description}</div>
              {section.subsections.map((subsection) => (
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
                      {subsection.requirements.map((r, requirementIndex) => (
                        <tr key={requirementIndex}>
                          <td>{r}</td>
                          <td>
                            <ConfidencePicker
                              onChange={
                                onConfidenceChangeById[
                                  getRequirementId(subsection, requirementIndex)
                                ]
                              }
                              value={
                                (confidences.subsections[subsection.id] || {})[
                                  requirementIndex
                                ]
                              }
                            />
                          </td>
                        </tr>
                      ))}
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
}

export default App;
