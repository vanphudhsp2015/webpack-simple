import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.less";
import "styles/main.scss";
import "bootstrap/dist/css/bootstrap.css";
import App from "./pages/App";
import { createBrowserHistory as createHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
ReactDOM.render(
  <Provider store={configureStore()}>
    <Router history={createHistory()}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("index")
);
