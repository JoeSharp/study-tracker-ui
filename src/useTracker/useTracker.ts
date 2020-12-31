import React from 'react';
import {
    SpecificationComponentTracker,
    SpecificationComponent,
    Specification,
    SpecificationSection,
    SpecificationTracker,
    SpecificationSubSection,
    SpecificationSubSectionTracker,
    SpecificationSectionTracker,
    Confidence
} from "../types";
import useLocalStorage, { useStoreObjectFactory } from "../useLocalStorage";
import useSpecification from "../useSpecification";

interface Props {
    studentId: string;
    specificationId: string;
}

export interface UseTracker {

}

function generateSubSectionTracker(subsection: SpecificationSubSection): SpecificationSubSectionTracker {
    return {
        requirements: subsection.requirements.map(requirement => ({
            confidence: Confidence.notCovered
        }))
    }
}

function generateSectionTracker(section: SpecificationSection): SpecificationSectionTracker {
    return {
        subsections: section.subsections
            .reduce((acc, subsection) => ({ ...acc, [subsection.id]: generateSubSectionTracker(subsection) }), {})
    }
}

function generateComponent(component: SpecificationComponent): SpecificationComponentTracker {
    return {
        sections: component.sections
            .reduce((acc, section) => ({ ...acc, [section.id]: generateSectionTracker(section) }), {})
    }
}

function useNewTracker(specification: Specification): SpecificationTracker {

    return React.useMemo(() => ({
        specificationId: specification.specificationId,
        components: specification.components
            .reduce((acc, component) => ({ ...acc, [component.id]: generateComponent(component) }), {})
    }), [specification]);
}

const useTracker = ({ studentId, specificationId }: Props): UseTracker => {
    const specification = useSpecification(specificationId);

    const { } = useLocalStorage<SpecificationTracker>(
        `tracker-${studentId}-${specificationId}`,
        useNewTracker(specification),
        useStoreObjectFactory<SpecificationTracker>())

    return {}
}

export default useTracker;