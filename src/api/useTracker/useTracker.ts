import React from "react";
import {
  ISpecificationComponentTracker,
  ISpecificationComponent,
  ISpecification,
  ISpecificationSection,
  ISpecificationTracker,
  ISpecificationSubSection,
  ISpecificationSubSectionTracker,
  ISpecificationSectionTracker,
  Confidence,
  ITrackerDashboardSummary,
  IByConfidenceCount,
} from "../../types";
import useLocalStorage, {
  useStoreObjectFactory,
} from "../../lib/useLocalStorage";
import useSpecification from "../useSpecification";
import {
  CONFIDENCE_OPTIONS,
  OnConfidenceChange,
} from "../../components/ConfidencePicker/ConfidencePicker";

interface Props {
  studentId: string;
  specificationId: string;
}

interface OnChangeConfidenceById {
  [s: string]: OnConfidenceChange;
}

const getRequirementId = (
  componentId: string,
  sectionId: string,
  subsectionId: string,
  rIndex: number
) => [componentId, sectionId, subsectionId, rIndex.toString()].join("-");

export interface UseTracker {
  specification: ISpecification;
  tracker: ISpecificationTracker;
  dashboardSummary: ITrackerDashboardSummary;
  getOnUpdateConfidence: (
    componentId: string,
    sectionId: string,
    subsectionId: string,
    requirementIndex: number
  ) => OnConfidenceChange;
}

function generateSubSectionTracker(
  subsection: ISpecificationSubSection
): ISpecificationSubSectionTracker {
  return {
    requirements: subsection.requirements.map((requirement) => ({
      confidence: Confidence.notCovered,
    })),
  };
}

function generateSectionTracker(
  section: ISpecificationSection
): ISpecificationSectionTracker {
  return {
    subsections: section.subsections.reduce(
      (acc, subsection) => ({
        ...acc,
        [subsection.id]: generateSubSectionTracker(subsection),
      }),
      {}
    ),
  };
}

function generateComponent(
  component: ISpecificationComponent
): ISpecificationComponentTracker {
  return {
    sections: component.sections.reduce(
      (acc, section) => ({
        ...acc,
        [section.id]: generateSectionTracker(section),
      }),
      {}
    ),
  };
}

function useNewTracker(specification: ISpecification): ISpecificationTracker {
  return React.useMemo(
    () => ({
      specificationId: specification.specificationId,
      components: specification.components.reduce(
        (acc, component) => ({
          ...acc,
          [component.id]: generateComponent(component),
        }),
        {}
      ),
    }),
    [specification]
  );
}

const useTracker = ({ studentId, specificationId }: Props): UseTracker => {
  const specification = useSpecification(specificationId);

  const {
    value: tracker,
    reduceValue,
  } = useLocalStorage<ISpecificationTracker>(
    `tracker-${studentId}-${specificationId}`,
    useNewTracker(specification),
    useStoreObjectFactory<ISpecificationTracker>()
  );

  const updateConfidence = React.useCallback(
    (
      componentId: string,
      sectionId: string,
      subsectionId: string,
      requirementIndex: number,
      confidence: Confidence
    ): void => {
      reduceValue((savedTracker) => {
        return {
          ...savedTracker,
          // Overwrite components
          components: {
            // All existing components
            ...savedTracker.components,
            // Replace this component
            [componentId]: {
              // Keep most of the component
              ...savedTracker.components[componentId],
              // Rewrite the sections
              sections: {
                // All existing sections
                ...savedTracker.components[componentId].sections,
                // Overwrite this section
                [sectionId]: {
                  // Keep most of existing section
                  ...savedTracker.components[componentId].sections[sectionId],
                  // Rewrite sub sections
                  subsections: {
                    // Keep most of subsection
                    ...savedTracker.components[componentId].sections[sectionId]
                      .subsections,
                    // Rewrite this subsection
                    [subsectionId]: {
                      // Keep most of subsection
                      ...savedTracker.components[componentId].sections[
                        sectionId
                      ].subsections[subsectionId],
                      // Rewrite requirements
                      requirements: savedTracker.components[
                        componentId
                      ].sections[sectionId].subsections[
                        subsectionId
                      ].requirements.map((r, i) =>
                        // Replace requirement if matches replacement index
                        i === requirementIndex
                          ? {
                              ...r, // Keep other aspects of requirement
                              confidence, // Replace the confidence level
                            }
                          : r
                      ),
                    },
                  },
                },
              },
            },
          },
        };
      });
    },
    [reduceValue]
  );

  const dashboardSummary = React.useMemo((): ITrackerDashboardSummary => {
    const _dashboardSummary: ITrackerDashboardSummary = {};

    specification.components
      .map((component) => ({
        component,
        componentTracker: tracker.components[component.id],
      }))
      .forEach(({ component, componentTracker }) => {
        component.sections
          .map((section) => ({
            section,
            sectionTracker: componentTracker.sections[section.id],
          }))
          .forEach(({ section, sectionTracker }) => {
            let requirementTotalCount = 0;
            let requirementCoveredCount = 0;
            let byConfidence: IByConfidenceCount = CONFIDENCE_OPTIONS.reduce(
              (acc, curr) => ({ ...acc, [curr.confidence]: 0 }),
              {}
            );

            section.subsections
              .map((subsection) => sectionTracker.subsections[subsection.id])
              .forEach((subsectionTracker) => {
                subsectionTracker.requirements.forEach(({ confidence }) => {
                  requirementTotalCount++;
                  if (confidence !== Confidence.notCovered) {
                    requirementCoveredCount++;
                  }
                  byConfidence[confidence]++;
                });
              });

            const percentCovered =
              (100 * requirementCoveredCount) / requirementTotalCount;
            _dashboardSummary[section.id] = {
              percentCovered,
              byConfidence,
            };
          });
      });

    return _dashboardSummary;
  }, [specification, tracker]);

  const onChangeConfidenceById: OnChangeConfidenceById = React.useMemo(() => {
    const byId: OnChangeConfidenceById = {};

    specification.components.forEach((component) =>
      component.sections.forEach((section) =>
        section.subsections.forEach((subsection) => {
          subsection.requirements.forEach((_, requirementIndex) => {
            byId[
              getRequirementId(
                component.id,
                section.id,
                subsection.id,
                requirementIndex
              )
            ] = (confidence: Confidence) => {
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
  }, [specification, updateConfidence]);

  const getOnUpdateConfidence = React.useCallback(
    (
      componentId: string,
      sectionId: string,
      subsectionId: string,
      requirementIndex: number
    ) =>
      onChangeConfidenceById[
        getRequirementId(componentId, sectionId, subsectionId, requirementIndex)
      ],
    [onChangeConfidenceById]
  );

  return { specification, tracker, dashboardSummary, getOnUpdateConfidence };
};

export default useTracker;
