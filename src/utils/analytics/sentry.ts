import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  integrations: [],
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  // The sampling rate for profiling is relative to tracesSampleRate
  // Setting to 1.0 will profile 100% of sampled transactions:
  profilesSampleRate: 1.0,
  environment: import.meta.env.VITE_STAGE,
});
