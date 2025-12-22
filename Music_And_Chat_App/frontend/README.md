## Music & Chat App – Frontend

This is the **React frontend** for the Music & Chat App.  
It provides:
- A **Spotify‑like music UI** (home, albums, player, admin dashboard)
- **Realtime chat** UI with presence & activity
- **Clerk authentication** (sign in, SSO callback, auth‑protected flows)
- **Error monitoring** with Sentry
- **Modern layout** with resizable panels, skeleton loaders, and custom UI components

---

## 1. Tech Stack

- **Framework**: React (with Vite)
- **Language**: TypeScript + some `.jsx` pages/components
- **Routing**: `react-router-dom`
- **Auth**: `@clerk/clerk-react`
- **State Management**: `zustand` (custom stores in `src/store`)
- **HTTP Client**: `axios`
- **Realtime**: `socket.io-client`
- **Styling**:
  - Tailwind CSS (`tailwindcss`, `@tailwindcss/vite`)
  - Utility helpers: `clsx`, `tailwind-merge`, `class-variance-authority`
- **UI / UX**:
  - Radix UI primitives (`@radix-ui/react-*`)
  - Custom UI components in `src/components/ui`
  - Toasts with `react-hot-toast`
- **Error Tracking**: `@sentry/react`, `@sentry/tracing`
- **Build Tool**: Vite (with `rolldown-vite` override)

Scripts from `package.json`:
- `npm run dev` – start dev server
- `npm run build` – type‑check and build for production
- `npm run preview` – preview built app
- `npm run lint` – run ESLint

---

## 2. Environment Variables (`.env`)

Create a `.env` file in the **frontend** root (`Music_And_Chat_App/frontend/.env`) with:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

**How it is used:**

- In `src/main.tsx`:
  - `const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY`
  - If the key is missing, the app throws an error:  
    “Add your Clerk Publishable Key to the .env file”
  - `ClerkProvider` is initialized with `publishableKey={PUBLISHABLE_KEY}`
- Vite exposes all `VITE_` variables to the client at build time.

> **Important:** Do not expose any private or secret keys here. Only the Clerk **publishable** key should be in the frontend `.env`.

If you add more frontend‑only env values, prefix them with `VITE_` (for example `VITE_API_URL`).

---

## 3. Project Structure (Frontend)

All paths are under `frontend/src`:

- **`main.tsx`**
  - Entry point for the React app
  - Imports `index.css`
  - Reads `VITE_CLERK_PUBLISHABLE_KEY`
  - Initializes Sentry via `initSentry()` from `lib/sentry`
  - Wraps the app with:
    - `ClerkProvider` (auth)
    - `AuthProvider` (`Providers/AuthProvider.tsx` – custom auth logic)
    - `BrowserRouter` (wrapped with Sentry routing: `Sentry.withSentryRouting`)
    - `Sentry.ErrorBoundary`
    - `Toaster` (notifications)

- **`App.jsx` / `App.tsx`**
  - Defines all application routes:
    - `/sso-callback` – uses `<AuthenticateWithRedirectCallback>` from Clerk
    - `/auth-callback` – `AuthCallbackPage` (handles backend auth callback and user creation)
    - `/admin` – `AdminPage` (admin dashboard)
    - Nested under `MainLayout`:
      - `/` – `HomePage`
      - `/chat` – `ChatPage`
      - `/albums/:albumId` – `AlbumPage`
      - `*` – `NotFoundPage`

- **`components/`**
  - **`components/layout`**
    - `MainLayout.jsx` – main shell for the app:
      - Uses resizable panels (`ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`) from `components/ui/resizable`
      - Layout:
        - Top header (`TopHeader`)
        - Left sidebar (`LeftSidebar`)
        - Center main content (`<Outlet />` from `react-router-dom`)
        - Optional right panel for `FriendsActivity` (hidden on mobile)
        - Global `AuidoPlayer` and bottom `PlaybackControls`
      - Mobile detection via `window.innerWidth < 768` and responsive panel sizes.
    - `layout/components/*` – building blocks:
      - `AuidoPlayer.tsx` – main audio player component
      - `PlaybackControls.tsx` – playback controls at bottom
      - `LeftSidebar.jsx` – navigation / library sidebar
      - `FriendsActivity.tsx` – realtime activity panel
      - `TopHeader.jsx` – app header (search/profile etc.)

  - **`components/ui`** – reusable UI primitives:
    - `button.tsx`, `input.tsx`, `card.tsx`, `slider.tsx`, `tabs.tsx`, `tooltip.tsx`, `avatar.tsx`, `dialog.tsx`, `select.tsx`, `scroll-area.tsx`, `table.tsx`, `resizable.tsx`
    - `SignInOAuth.jsx` – OAuth sign‑in UI with Clerk
    - `Topbar.jsx` – alternative top bar component

  - **`components/skeletons`**
    - `FeaturedGridSkeleton.jsx`, `PlaylistSkeleton.jsx`, `UsersListSkeleton.jsx` – loading skeletons for better UX.

- **`pages/`**
  - **`home/page/HomePage.jsx`**
    - Home screen with featured sections and recommendations.
    - Uses components inside `home/components`:
      - `FeaturedSection.jsx`, `PlayButton.tsx`, `SectionGrid.tsx`, `SectionGridSkeleton.tsx`

  - **`chat/page/ChatPage.tsx`**
    - Chat screen for messaging between users.
    - Uses `chat/components`:
      - `ChatHeader.tsx`, `MessageInput.tsx`, `UsersList.jsx`
    - Talks to backend `/api/users` and `/api/users/message/:userId` plus `socket.io-client` to show live messages and online status.

  - **`album/AlbumPage.tsx`**
    - Displays a single album and its songs.
    - Fetches album data from `/api/albums/:albumId`.
    - Integrates with the global music/player store to play selected tracks.

  - **`admin/AdminPage.tsx`**
    - Admin dashboard for managing songs and albums.
    - Uses `admin/components`:
      - `DashboardStats.tsx`, `StatsCard.tsx`
      - `SongsTabContent.tsx`, `SongsTable.tsx`, `AddSongDialog.tsx`
      - `AlbumsTabContent.tsx`, `AlbumsTable.tsx`, `AddAlbumDialog.tsx`
      - `Header.tsx`
    - Communicates with backend admin endpoints:
      - `/api/admin/check`, `/api/admin/songs`, `/api/admin/albums`, etc.
    - Uses dialogs for file upload (audio + cover image) and admin CRUD operations.

  - **`auth-callback/AuthCallbackPage.jsx`**
    - Handles redirect after Clerk sign‑in/sign‑up.
    - Calls backend `/api/auth/callback` with user data to create/find user.

  - **`404/NotFoundPage.tsx`**
    - Fallback page for unknown routes.

- **`Providers/AuthProvider.tsx`**
  - Custom provider to glue Clerk auth with your app’s stores.
  - Likely uses `useAuthStore` and Clerk hooks to track the current user throughout the app.

- **`store/`**
  - `useAuthStore.tsx` – authentication state (current user, loading, etc.).
  - `useChatStore.tsx` – chat state (selected user, messages, socket connection).
  - `useMusicStore.tsx` – music content (songs, albums, home sections).
  - `usePlayerStore.ts` – playback state (current track, play/pause, queue, progress).

- **`lib/`**
  - `axios.ts` – configured `axiosInstance`:
    - Base URL pointing to backend (`/api` or similar)
    - Includes credentials and auth headers for protected routes.
  - `sentry.ts` – Sentry initialization:
    - `initSentry()` sets up Sentry with DSN and tracing integration for React and routing.
  - `utils.ts` – general helper functions (format time, etc.).

- **`types/`**
  - `custom.d.ts`, `index.ts` – shared TypeScript types (e.g. `Song`, `Album`, `User`, `Message`).

- **`index.css`**
  - Global styles, Tailwind base & utilities, custom scrollbar/background/font styles to match the music app design.

---

## 4. How the Frontend Works (High Level)

- **Auth Flow (Clerk + Backend)**
  - User signs in/up via Clerk components (e.g. `SignInOAuth`).
  - Clerk redirects to `/sso-callback`, which is handled by `<AuthenticateWithRedirectCallback>` in `App`.
  - On success, the user is redirected to `/auth-callback`.
  - `AuthCallbackPage` calls the backend `/api/auth/callback` to ensure the user exists in your MongoDB `User` collection.
  - `AuthProvider` and `useAuthStore` keep the user state accessible in the app.

- **Layout & Navigation**
  - `main.tsx` wraps `<App />` with `BrowserRouter`, so links and `Route`s work without full refreshes.
  - `App` defines routes and nests most pages inside `MainLayout`.
  - `MainLayout` provides a desktop‑like shell with:
    - Left sidebar navigation
    - Center content area (scrollable)
    - Right “Friends Activity” panel on larger screens
    - Bottom player controls

- **Music Experience**
  - Home and album pages fetch songs/albums from backend endpoints (`/api/songs/*`, `/api/albums/*`).
  - `useMusicStore` and `usePlayerStore` coordinate what is currently playing.
  - `AuidoPlayer` & `PlaybackControls` read from `usePlayerStore` to show track info and control playback.

- **Chat & Presence**
  - `ChatPage` uses `socket.io-client` to connect to the backend Socket.IO server.
  - `FriendsActivity` and `UsersList` use sockets and REST endpoints to:
    - Show which friends are online
    - Display activity updates (e.g. listening to a song / chatting)
  - Messages are sent with socket events (`send_message`) and appear in realtime, while REST endpoints (`/api/users/message/:userId`) load history.

- **Admin Dashboard**
  - Accessible (typically) to admin accounts whose email matches `ADMIN_EMAIL` (checked on backend).
  - Uses dialogs to upload audio and cover images, which are sent to backend admin routes.
  - Uses stats endpoints to display total songs, users, albums, and artists.

- **Error Handling**
  - `initSentry()` configures Sentry in `main.tsx`.
  - `Sentry.withSentryRouting(BrowserRouter)` wraps routing for tracing.
  - `Sentry.ErrorBoundary` wraps `<App />`:
    - Shows a fallback UI on unhandled errors
    - Optionally displays Sentry dialog for bug reporting.

---

## 5. Running the Frontend Locally

1. **Install dependencies**
   ```bash
   cd Music_And_Chat_App/frontend
   npm install
   ```

2. **Create `.env`**
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

3. **Start the dev server**
   ```bash
   npm run dev
   ```
   - By default, Vite runs on `http://localhost:5173` (or similar).
   - The backend CORS is configured for `http://localhost:3000` in your current setup; you can either:
     - Change Vite port to 3000, or
     - Update backend CORS and Socket.IO origins to match the Vite dev URL.

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview the production build**
   ```bash
   npm run preview
   ```

---

## 6. Notes for Deployment

- Ensure the frontend `.env` contains a valid `VITE_CLERK_PUBLISHABLE_KEY`.
- Point the frontend to the deployed backend API (via your `axios` base URL or `VITE_API_URL` if you configure one).
- Align CORS and Socket.IO origins in the backend with your deployed frontend URL.
- Configure Sentry DSN and environment in `lib/sentry` and your host for proper error monitoring.

This README now documents **what technologies you used**, **how the app is structured**, **how the auth and realtime features work**, and **how to run/build the frontend**. 


