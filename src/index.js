import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DataLayer } from "./store/dataLayer";
import initialState from "./store/initialState";
import reducer from "./store/reducer";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <Router>
        <App />
      </Router>
    </DataLayer>
  </React.StrictMode>,
  document.getElementById("root")
);
