import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import {
  authAccessReqInterceptor,
  authRefreshResInterceptor,
} from "./api/axios-interceptors";
import store from "./store";

import "../src/styles/main.scss";

authAccessReqInterceptor();
authRefreshResInterceptor();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
