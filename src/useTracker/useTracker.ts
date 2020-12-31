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
} from "../types";
import useLocalStorage, { useStoreObjectFactory } from "../useLocalStorage";
import useSpecification from "../useSpecification";

interface Props {
  studentId: string;
  specificationId: string;
}

export interface UseTracker {
  tracker: SpecificationTracker;
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
          components: {
            ...savedTracker.components,
            [componentId]: {
              ...savedTracker.components[componentId],
              sections: {
                ...savedTracker.components[componentId].sections,
                [sectionId]: {
                  ...savedTracker.components[componentId].sections[sectionId],
                  subsections: {
                    ...savedTracker.components[componentId].sections[sectionId]
                      .subsections,
                    [subsectionId]: {
                      ...savedTracker.components[componentId].sections[
                        sectionId
                      ].subsections[subsectionId],
                      requirements: savedTracker.components[
                        componentId
                      ].sections[sectionId].subsections[
                        subsectionId
                      ].requirements.map((r, i) => {
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

  return { tracker, updateConfidence };
};

export default useTracker;
