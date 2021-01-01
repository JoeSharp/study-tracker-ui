import React from "react";

import { ISpecificationDoc, ISpecification } from "./types";
import useApi from "./useApi";
import { ObjWithStringKey } from "../../lib/useListReducer/types";
import useClientSideData from "../useClientSideData/useClientSideData";
import { useErrorReporting } from "../../components/ErrorPage";

interface UseSpecificationApi {
  getSpecification: (specificationId: string) => void;
  refreshSpecifications: () => void;
  createSpecification: (specification: ISpecification) => void;
  updateSpecification: (
    specificationId: string,
    updates: ISpecification
  ) => void;
  deleteSpecification: (specificationId: string) => void;
  specifications: ISpecificationDoc[];
  specificationsById: ObjWithStringKey<ISpecificationDoc>;
}

const useSpecificationApi = (): UseSpecificationApi => {
  const { reportError } = useErrorReporting();
  const {
    specifications: {
      items: specificationsById,
      itemsInList: specificationsInList,
      addItem,
      receiveListOfItems,
      removeItem,
    },
  } = useClientSideData();

  const {
    getSpecifications,
    getSpecification,
    createSpecification,
    updateSpecification,
    deleteSpecification,
  } = useApi();

  const _refreshSpecifications = React.useCallback(() => {
    async function f() {
      try {
        const specifications = await getSpecifications();
        receiveListOfItems(specifications);
      } catch (err) {
        reportError(err);
      }
    }

    f();
  }, [receiveListOfItems, getSpecifications, reportError]);

  React.useEffect(_refreshSpecifications, [_refreshSpecifications]);

  const _getSpecification = React.useCallback(
    (specificationId: string) => {
      async function f() {
        try {
          const specification = await getSpecification(specificationId);
          addItem(specification);
        } catch (err) {
          reportError(err);
        }
      }

      f();
    },
    [getSpecification, addItem, reportError]
  );

  const _createSpecification = React.useCallback(
    (specification: ISpecification) => {
      async function f() {
        try {
          const newSpecification = await createSpecification(specification);
          addItem(newSpecification);
        } catch (err) {
          reportError(err);
        }
      }

      f();
    },
    [addItem, createSpecification, reportError]
  );

  const _updateSpecification = React.useCallback(
    (specificationId: string, updates: ISpecification) => {
      async function f() {
        try {
          console.log("updating specification", updates);
          const updatedSpecification = await updateSpecification(
            specificationId,
            updates
          );
          console.log("UPDATED", updatedSpecification);
          addItem(updatedSpecification);
        } catch (err) {
          reportError(err);
        }
      }

      f();
    },
    [addItem, updateSpecification, reportError]
  );

  const _deleteSpecification = React.useCallback(
    (specificationId: string) => {
      async function f() {
        try {
          await deleteSpecification(specificationId);
          removeItem(specificationId);
        } catch (err) {
          reportError(err);
        }
      }

      f();
    },
    [removeItem, deleteSpecification, reportError]
  );

  return {
    specifications: specificationsInList,
    specificationsById,
    refreshSpecifications: _refreshSpecifications,
    getSpecification: _getSpecification,
    createSpecification: _createSpecification,
    updateSpecification: _updateSpecification,
    deleteSpecification: _deleteSpecification,
  };
};

export default useSpecificationApi;
