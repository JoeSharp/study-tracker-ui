import React from "react";
import { RawNavigateApp } from "./types";

const useUrlGenerator = (): RawNavigateApp<string | undefined, string> => {
  return React.useMemo(
    () => ({
      goToQualificationSelection: () => "/",
      goToDashboard: (specificationId: string = ":specificationId") =>
        `/dashboard/${specificationId}`,
      goToSpecificationSection: (
        componentId: string = ":componentId",
        specificationId: string = ":specificationId",
        sectionId: string = ":sectionId"
      ) => `/dashboard/${specificationId}/${componentId}/${sectionId}`,
    }),
    []
  );
};

export default useUrlGenerator;
