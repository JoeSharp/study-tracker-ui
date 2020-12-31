export interface SpecificationSubSection {
  id: string;
  title: string;
  requirements: string[];
}

export interface SpecificationSection {
  id: string;
  title: string;
  description?: string;
  subsections: SpecificationSubSection[];
}

export interface SpecificationComponent {
  id: string;
  name: string;
  sections: SpecificationSection[];
}

export interface Specification {
  specificationId: string;
  examBoard: string;
  subject: string;
  qualificationCode: string;
  components: SpecificationComponent[];
}

export enum Confidence {
  notCovered = 0,
  veryHigh = 1,
  high = 2,
  median = 3,
  low = 4
}

export interface RequirementTracker {
  confidence: Confidence;
}

export interface SpecificationSubSectionTracker {
  requirements: RequirementTracker[];
}

export interface SpecificationSectionTracker {
  subsections: {
    [id: string]: SpecificationSubSectionTracker
  }
}

export interface SpecificationComponentTracker {
  sections: {
    [id: string]: SpecificationSectionTracker
  }
}

export interface SpecificationTracker {
  specificationId: string;
  components: {
    [id: string]: SpecificationComponentTracker;
  }
}


