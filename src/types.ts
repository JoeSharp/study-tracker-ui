export interface ISpecificationSubSection {
  id: string;
  title: string;
  requirements: string[];
}

export interface ISpecificationSection {
  id: string;
  title: string;
  description?: string;
  subsections: ISpecificationSubSection[];
}

export interface ISpecificationComponent {
  id: string;
  name: string;
  sections: ISpecificationSection[];
}

export interface ISpecification {
  specificationId: string;
  examBoard: string;
  subject: string;
  qualificationCode: string;
  components: ISpecificationComponent[];
}

export enum Confidence {
  notCovered = 0,
  veryHigh = 1,
  high = 2,
  medium = 3,
  low = 4,
}

export interface IRequirementTracker {
  confidence: Confidence;
}

export interface IByConfidenceCount {
  [confidence: number]: number;
}

export interface ISectionSummary {
  percentCovered: number;
  byConfidence: IByConfidenceCount;
}

export interface ITrackerDashboardSummary {
  [sectionId: string]: ISectionSummary;
}

export interface ISpecificationSubSectionTracker {
  requirements: IRequirementTracker[];
}

export interface ISpecificationSectionTracker {
  subsections: {
    [id: string]: ISpecificationSubSectionTracker;
  };
}

export interface ISpecificationComponentTracker {
  sections: {
    [id: string]: ISpecificationSectionTracker;
  };
}

export interface ISpecificationTracker {
  specificationId: string;
  components: {
    [id: string]: ISpecificationComponentTracker;
  };
}
