import * as amplitude from "@amplitude/analytics-browser";
import { ValidPropertyType } from "@amplitude/analytics-core/lib/esm/types/event/event";
import { v4 as uuid } from "uuid";

amplitude.init(import.meta.env.VITE_AMPLITUDE_KEY, {
  instanceName: "medami",
  serverZone: "EU",
  autocapture: {
    sessions: false,
  },
  flushIntervalMillis: 2000,
  flushQueueSize: 1,
});

export const log = (
  eventType: string,
  eventProperties?: Record<string, unknown>
) => {
  return amplitude.track(eventType, eventProperties);
};

export const addUserProperties = (
  userProperties: Record<string, ValidPropertyType | undefined>
) => {
  const identify = new amplitude.Identify();
  for (const [key, value] of Object.entries(userProperties)) {
    identify.set(key, value ?? "undefined");
  }

  amplitude.identify(identify);
};

export const reset = () => {
  amplitude.reset();
  amplitude.setUserId(uuid());
};
