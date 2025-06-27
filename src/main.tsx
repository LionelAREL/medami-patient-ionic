import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import "@ant-design/v5-patch-for-react-19";
import frFR from "antd/locale/fr_FR";
import "./styles/antdCustom.css";
import { ConfigProvider } from "antd";
import { theme } from "./styles/antdTheme";
import "@fortawesome/fontawesome-free/css/all.min.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  // <React.StrictMode>
  <ConfigProvider locale={frFR} theme={theme}>
    <App />
  </ConfigProvider>
  // </React.StrictMode>,
);
