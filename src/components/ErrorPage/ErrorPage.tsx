/*
 * Copyright 2017 Crown Copyright
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

import ErrorSection from "./ErrorSection";
import { useErrorReporting } from ".";

const ErrorPage = () => {
  const { error } = useErrorReporting();

  if (!error) {
    return (
      <p>
        No Error Seen, apart from the fact you have been directed to this
        page...which is an error...lol!
      </p>
    );
  }

  const { message, status, stack } = error;

  return (
    <div>
      <h1>There has been an error!"</h1>

      <div className="ErrorPage__details">
        {message && <ErrorSection errorData={message} title="Error Message" />}
        {status !== 0 && status && (
          <ErrorSection errorData={status} title="HTTP error code" />
        )}
        {stack && <ErrorSection errorData={stack} title="Stack trace" />}
      </div>
    </div>
  );
};

export default ErrorPage;
