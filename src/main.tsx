// Sentry initialization should be imported first!
import "./utils/analytics/sentry";

// Amplitude initialization
import "./utils/analytics/amplitude";

import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import "@ant-design/v5-patch-for-react-19";
import frFR from "antd/locale/fr_FR";
import "./styles/antdCustom.css";
import { ConfigProvider } from "antd";
import { theme } from "./styles/antdTheme";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client";
import * as Sentry from "@sentry/react";

const container = document.getElementById("root");
const root = createRoot(container!, {
  // Callback called when an error is thrown and not caught by an ErrorBoundary.
  onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
    console.warn("Uncaught error", error, errorInfo.componentStack);
  }),
  // Callback called when React catches an error in an ErrorBoundary.
  onCaughtError: Sentry.reactErrorHandler(),
  // Callback called when React automatically recovers from errors.
  onRecoverableError: Sentry.reactErrorHandler(),
});
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ConfigProvider locale={frFR} theme={theme}>
        <App />
      </ConfigProvider>
    </ApolloProvider>
  </React.StrictMode>
);
