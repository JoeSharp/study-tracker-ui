import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory as createHistory } from "history";

import App from "./App";
import { CustomRouter } from "./lib/useAppNavigation";
import reportWebVitals from "./reportWebVitals";

export const history = createHistory();

ReactDOM.render(
  <React.StrictMode>
    <CustomRouter history={history}>
      <App />
    </CustomRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
