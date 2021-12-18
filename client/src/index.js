import React from "react";
import reactDom from "react-dom";
import App from "./App";
import { CookiesProvider } from "react-cookie";

const tasklist = [];

reactDom.render(
  <CookiesProvider>
    <App tasklist={tasklist} />
  </CookiesProvider>,
  document.getElementById("root")
)
