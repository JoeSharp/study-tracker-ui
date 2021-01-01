import React from "react";
import { ISpecificationDoc, ISpecification } from "./types";
import { useAuthenticationContext } from "../../lib/authentication";
import useCheckHttpStatus from "../../lib/useCheckHttpStatus";

const COURSE_RESOURCE = `${process.env.REACT_APP_SERVICE_BASE_URL}/specification`;

const getResourceWithSpecificationId = (specificationId: string) =>
  `${COURSE_RESOURCE}/${specificationId}`;

interface UseApi {
  getSpecifications: () => Promise<ISpecificationDoc[]>;
  getSpecification: (specificationId: string) => Promise<ISpecificationDoc>;
  createSpecification: (
    newSpecificationDetails: ISpecification
  ) => Promise<ISpecificationDoc>;
  updateSpecification: (
    specificationId: string,
    updates: ISpecification
  ) => Promise<ISpecificationDoc>;
  deleteSpecification: (specificationId: string) => Promise<void>;
}

const useApi = (): UseApi => {
  const { idToken } = useAuthenticationContext();
  const handle200 = useCheckHttpStatus(200);

  return {
    getSpecifications: React.useCallback(async () => {
      let headers = {
        Accept: "application/json",
        Authorization: `Bearer ${idToken}`,
      };
      const response = await fetch(COURSE_RESOURCE, {
        headers,
      });
      const r = await handle200(response);
      return r.json();
    }, [idToken, handle200]),
    getSpecification: React.useCallback(
      async (specificationId: string) => {
        let headers = {
          Accept: "application/json",
          Authorization: `Bearer ${idToken}`,
        };
        const response = await fetch(
          getResourceWithSpecificationId(specificationId),
          {
            headers,
          }
        );
        const r = await handle200(response);
        return r.json();
      },
      [idToken, handle200]
    ),
    createSpecification: React.useCallback(
      async (newSpecification: ISpecification) => {
        let headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        };
        const response = await fetch(COURSE_RESOURCE, {
          method: "post",
          body: JSON.stringify(newSpecification),
          headers,
        });
        const r = await handle200(response);
        return r.json();
      },
      [idToken, handle200]
    ),
    updateSpecification: React.useCallback(
      async (specificationId: string, updates: ISpecification) => {
        let headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        };
        const response = await fetch(
          getResourceWithSpecificationId(specificationId),
          {
            method: "put",
            body: JSON.stringify(updates),
            headers,
          }
        );
        const r = await handle200(response);
        return r.json();
      },
      [idToken, handle200]
    ),
    deleteSpecification: React.useCallback(
      async (specificationId: string) => {
        let headers = {
          Authorization: `Bearer ${idToken}`,
        };
        const response = await fetch(
          getResourceWithSpecificationId(specificationId),
          {
            method: "delete",
            headers,
          }
        );
        return await handle200(response);
      },
      [idToken, handle200]
    ),
  };
};

export default useApi;
