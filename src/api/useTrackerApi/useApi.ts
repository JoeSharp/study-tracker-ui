import React from "react";
import { ITrackerDoc, ITracker } from "./types";
import { useAuthenticationContext } from "../../lib/authentication";
import useCheckHttpStatus from "../../lib/useCheckHttpStatus";

const TASK_RESOURCE = `${process.env.REACT_APP_SERVICE_BASE_URL}/tracker`;

const getResourceWithLessonId = (lessonId: string) =>
  `${TASK_RESOURCE}/forLesson/${lessonId}`;
const getResourceWithTrackerId = (trackerId: string) =>
  `${TASK_RESOURCE}/${trackerId}`;

interface UseApi {
  getTrackersForLesson: (lessonId: string) => Promise<ITrackerDoc[]>;
  getTracker: (trackerId: string) => Promise<ITrackerDoc>;
  createTracker: (
    lessonId: string,
    newTracker: ITracker
  ) => Promise<ITrackerDoc>;
  updateTracker: (trackerId: string, updates: ITracker) => Promise<ITrackerDoc>;
  deleteTracker: (trackerId: string) => Promise<void>;
}

const useApi = (): UseApi => {
  const { idToken } = useAuthenticationContext();
  const handle200 = useCheckHttpStatus(200);

  return {
    getTrackersForLesson: React.useCallback(
      (lessonId: string) => {
        let headers = {
          Accept: "application/json",
          Authorization: `Bearer ${idToken}`,
        };
        return fetch(getResourceWithLessonId(lessonId), {
          headers,
        })
          .then(handle200)
          .then((r) => r.json());
      },
      [idToken, handle200]
    ),
    getTracker: React.useCallback(
      async (trackerId: string) => {
        let headers = {
          Accept: "application/json",
          Authorization: `Bearer ${idToken}`,
        };
        const response = await fetch(getResourceWithTrackerId(trackerId), {
          headers,
        });
        const r = await handle200(response);
        return r.json();
      },
      [idToken, handle200]
    ),
    createTracker: React.useCallback(
      async (lessonId: string, newTracker: ITracker) => {
        let headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        };
        const response = await fetch(getResourceWithLessonId(lessonId), {
          method: "post",
          body: JSON.stringify(newTracker),
          headers,
        });
        const r = await handle200(response);
        return r.json();
      },
      [idToken, handle200]
    ),
    updateTracker: React.useCallback(
      async (trackerId: string, updates: ITracker) => {
        let headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        };
        const response = await fetch(getResourceWithTrackerId(trackerId), {
          method: "put",
          body: JSON.stringify(updates),
          headers,
        });
        const r = await handle200(response);
        return r.json();
      },
      [idToken, handle200]
    ),
    deleteTracker: React.useCallback(
      async (trackerId: string) => {
        let headers = {
          Authorization: `Bearer ${idToken}`,
        };
        const response = await fetch(getResourceWithTrackerId(trackerId), {
          method: "delete",
          headers,
        });
        return await handle200(response);
      },
      [idToken, handle200]
    ),
  };
};

export default useApi;
