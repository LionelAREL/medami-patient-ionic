import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import "@ant-design/v5-patch-for-react-19";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
