export interface RawNavigateApp<IN, OUT> {
  goToQualificationSelection: () => OUT;

  goToDashboard: (specificationId: IN) => OUT;
  goToSpecificationSection: (
    componentId: IN,
    specificationId: IN,
    section: IN
  ) => OUT;
}

export interface NavigateApp {
  nav: RawNavigateApp<string, void>;
  urlGenerator: RawNavigateApp<string | undefined, string>;
}
