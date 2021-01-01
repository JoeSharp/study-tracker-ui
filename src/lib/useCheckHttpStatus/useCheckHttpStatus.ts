import React from "react";

import { AppError } from "../useErrorReporting/AppError";

const useCheckHttpStatus = (status: number) =>
  React.useCallback(
    (response: Response): Promise<any> => {
      if (response.status === status) {
        return Promise.resolve(response);
      }

      return Promise.reject(
        new AppError(
          response.status,
          response.statusText || "Incorrect HTTP Response Code"
        )
      );
    },
    [status]
  );

export default useCheckHttpStatus;
