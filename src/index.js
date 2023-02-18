import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.scss";
import { Provider } from "react-redux";
import store from './redux/store'
import { _checkToken } from "./redux/actions/auth/checkToken";

store.dispatch(_checkToken())
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
