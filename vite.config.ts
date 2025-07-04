import { sentryVitePlugin } from "@sentry/vite-plugin";
/// <reference types="vitest" />

import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import graphqlLoader from "vite-plugin-graphql-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    graphqlLoader(),
    sentryVitePlugin({
      org: "medami-47",
      project: "patient",
    }),
  ],

  resolve: {
    alias: {
      "@": "/src",
    },
  },

  build: {
    sourcemap: true,
  },
});
