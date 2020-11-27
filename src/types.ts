export interface SpecSubSection {
  id: string;
  title: string;
  requirements: string[];
}

export interface SpecSection {
  id: string;
  title: string;
  description?: string;
  subsections: SpecSubSection[];
}

export interface SpecComponent {
  id: string;
  name: string;
  sections: SpecSection[];
}

export interface Specification {
  examBoard: string;
  subject: string;
  qualificationCode: string;
  components: SpecComponent[];
}

export interface ConfidenceOption {
  name: string;
  colour: string;
}
