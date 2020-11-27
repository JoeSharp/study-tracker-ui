export interface SubSection {
  title: string;
  requirements: string[];
}

export interface Section {
  title: string;
  description?: string;
  subsections: SubSection[];
}

export interface Component {
  name: string;
  sections: Section[];
}

export interface Specification {
  examBoard: string;
  subject: string;
  qualificationCode: string;
  components: Component[];
}
