import * as Sentry from "@sentry/react";
import { browserTracingIntegration, replayIntegration } from "@sentry/react";

export const initSentry = () => {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN || "https://b06510cb56f815f630bbc9eb653540fc@o4510471896039424.ingest.us.sentry.io/4510471948468224",
    environment: import.meta.env.MODE,
    integrations: [
      browserTracingIntegration(),
      replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    beforeSend(event, hint) {
      if (event.exception) {
        const error = hint.originalException;
        // Don't send network errors or aborts
        if (error instanceof Error && (error.message.includes('Network') || error.message.includes('abort'))) {
          return null;
        }
      }
      return event;
    },
  });
};
