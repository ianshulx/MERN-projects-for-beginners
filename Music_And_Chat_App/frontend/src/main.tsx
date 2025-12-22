import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App  from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './Providers/AuthProvider.tsx'
import { Toaster } from 'react-hot-toast'
import * as Sentry from "@sentry/react";
import { initSentry } from './lib/sentry'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

// Initialize Sentry
initSentry();

const SentryRoutes = Sentry.withSentryRouting(BrowserRouter);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AuthProvider>
        <SentryRoutes>
          <Sentry.ErrorBoundary fallback={<div>An error has occurred</div>} showDialog>
            <App/>
            <Toaster
              position='top-right'
            />
          </Sentry.ErrorBoundary>
        </SentryRoutes>
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>,
)