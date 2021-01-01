import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router";

import useAppNavigation from "../../lib/useAppNavigation";
import SectionTracker from "../SectionTracker";
import SpecificationDashboard from "../SpecificationDashboard";
import SpecificationTracker from "../SpecificationTracker";

const Routes: React.FunctionComponent = () => {
  const { urlGenerator } = useAppNavigation();

  return (
    <Switch>
      <Route
        exact
        path={urlGenerator.goToQualificationSelection()}
        render={() => <SpecificationDashboard />}
      />
      <Route
        exact
        path={urlGenerator.goToDashboard(undefined)}
        render={({
          match: {
            params: { specificationId },
          },
        }: RouteComponentProps<any>) => (
          <SpecificationTracker specificationId={specificationId} />
        )}
      />
      <Route
        exact
        path={urlGenerator.goToSpecificationSection(
          undefined,
          undefined,
          undefined
        )}
        render={({
          match: {
            params: { componentId, specificationId, sectionId },
          },
        }: RouteComponentProps<any>) => (
          <SectionTracker
            componentId={componentId}
            specificationId={specificationId}
            sectionId={sectionId}
          />
        )}
      />
    </Switch>
  );
};

export default Routes;
