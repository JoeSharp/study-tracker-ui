import React from "react";
import { ITracker, ITrackerDoc } from "./types";
import useClientSideData from "../useClientSideData";
import useApi from "./useApi";
import { useErrorReporting } from "../../components/ErrorPage";
import { ObjWithStringKey } from "../../lib/useListReducer/types";

export interface UseTrackerApi {
  trackers: ITrackerDoc[];
  trackersById: ObjWithStringKey<ITrackerDoc>;
  getTracker: (trackerId: string) => void;
  updateTracker: (trackerId: string, updates: ITracker) => void;
  deleteTracker: (trackerId: string) => void;
}

const useTrackerApi = (): UseTrackerApi => {
  const { reportError } = useErrorReporting();

  const {
    trackers: {
      items: trackersById,
      itemsInList: trackersInList,
      addItem,
      removeItem,
    },
  } = useClientSideData();

  const { deleteTracker, getTracker, updateTracker } = useApi();

  const _getTracker = React.useCallback(
    (lessonId: string) => {
      async function f() {
        try {
          const lesson = await getTracker(lessonId);
          addItem(lesson);
        } catch (err) {
          reportError(err);
        }
      }

      f();
    },
    [getTracker, addItem, reportError]
  );

  const _updateTracker = React.useCallback(
    (trackerId: string, updates: ITracker) => {
      async function f() {
        try {
          const updated = await updateTracker(trackerId, updates);
          addItem(updated);
        } catch (err) {
          reportError(err);
        }
      }

      f();
    },
    [updateTracker, addItem, reportError]
  );

  const _deleteTracker = React.useCallback(
    (trackerId: string) => {
      async function f() {
        try {
          await deleteTracker(trackerId);
          removeItem(trackerId);
        } catch (err) {
          reportError(err);
        }
      }

      f();
    },
    [deleteTracker, removeItem, reportError]
  );

  return {
    trackers: trackersInList,
    trackersById,
    getTracker: _getTracker,
    updateTracker: _updateTracker,
    deleteTracker: _deleteTracker,
  };
};

export default useTrackerApi;
