import React from "react";
import {
  SpecificationComponentTracker,
  SpecificationComponent,
  Specification,
  SpecificationSection,
  SpecificationTracker,
  SpecificationSubSection,
  SpecificationSubSectionTracker,
  SpecificationSectionTracker,
  Confidence,
  TrackerDashboardSummary,
  ByConfidenceCount,
} from "../../types";
import useLocalStorage, {
  useStoreObjectFactory,
} from "../../lib/useLocalStorage";
import useSpecification from "../useSpecification";
import { CONFIDENCE_OPTIONS } from "../../components/ConfidencePicker/ConfidencePicker";

interface Props {
  studentId: string;
  specificationId: string;
}

export interface UseTracker {
  specification: Specification;
  tracker: SpecificationTracker;
  dashboardSummary: TrackerDashboardSummary;
  updateConfidence: (
    componentId: string,
    sectionId: string,
    subsectionId: string,
    requirementIndex: number,
    confidence: Confidence
  ) => void;
}

function generateSubSectionTracker(
  subsection: SpecificationSubSection
): SpecificationSubSectionTracker {
  return {
    requirements: subsection.requirements.map((requirement) => ({
      confidence: Confidence.notCovered,
    })),
  };
}

function generateSectionTracker(
  section: SpecificationSection
): SpecificationSectionTracker {
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
  component: SpecificationComponent
): SpecificationComponentTracker {
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

function useNewTracker(specification: Specification): SpecificationTracker {
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

  const { value: tracker, reduceValue } = useLocalStorage<SpecificationTracker>(
    `tracker-${studentId}-${specificationId}`,
    useNewTracker(specification),
    useStoreObjectFactory<SpecificationTracker>()
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
                      ].requirements.map((r, i) => {
                        // Replace the correct requirement
                        if (i === requirementIndex) {
                          return {
                            ...r,
                            confidence,
                          };
                        } else {
                          return r;
                        }
                      }),
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

  const dashboardSummary = React.useMemo((): TrackerDashboardSummary => {
    const _dashboardSummary: TrackerDashboardSummary = {};

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
            let byConfidence: ByConfidenceCount = CONFIDENCE_OPTIONS.reduce(
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

  return { specification, tracker, dashboardSummary, updateConfidence };
};

export default useTracker;
