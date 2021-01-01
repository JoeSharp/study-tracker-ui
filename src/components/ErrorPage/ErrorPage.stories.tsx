/*
 * Copyright 2018 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { storiesOf } from "@storybook/react";

import ErrorPage from "./ErrorPage";
import { useErrorReporting } from ".";
import { AppError } from "../../../lib/useErrorReporting/AppError";

interface Props {
  error: AppError;
}

const TestErrorPage: React.FunctionComponent<Props> = ({ error }) => {
  const { reportError } = useErrorReporting();
  React.useEffect(() => {
    reportError(error);
  }, [reportError, error]);

  return <ErrorPage />;
};

storiesOf("App/ErrorPage", module).add("Just error message", () => (
  <TestErrorPage error={new AppError(400, "Something bad happened")} />
));
