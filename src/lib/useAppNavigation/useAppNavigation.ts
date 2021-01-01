import React from "react";

import { NavigateApp } from "./types";
import useRouter from "./useRouter";
import useUrlGenerator from "./useUrlGenerator";

const useAppNavigation = (): NavigateApp => {
  const { history: h } = useRouter();
  const u = useUrlGenerator(); // just to make all the following rote lines short
  return React.useMemo(
    () => ({
      urlGenerator: u,
      nav: {
        goToQualificationSelection: () =>
          h.push(u.goToQualificationSelection()),
        goToDashboard: (specificationId: string) =>
          h.push(u.goToDashboard(specificationId)),
        goToSpecificationSection: (
          componentId: string,
          specificationId: string,
          section: string
        ) =>
          h.push(
            u.goToSpecificationSection(componentId, specificationId, section)
          ),
      },
    }),
    [h, u]
  );
};

export default useAppNavigation;
