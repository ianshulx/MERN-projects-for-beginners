## Music & Chat App – Backend

This is the **Node.js/Express backend** for the Music & Chat App.  
It provides:
- **REST APIs** for authentication, users, songs, albums, and admin features
- **Real‑time chat & presence** using Socket.IO
- **MongoDB** persistence via Mongoose
- **File uploads** (songs & cover images) via Cloudinary
- **Authentication & authz** via Clerk
- **Error tracking** via Sentry

---

## 1. Tech Stack

- **Runtime**: Node.js (CommonJS)
- **Framework**: Express
- **Database**: MongoDB with Mongoose
- **Auth**: Clerk (`@clerk/express`)
- **Realtime**: Socket.IO
- **File Uploads**: `express-fileupload` + Cloudinary
- **CORS**: `cors`
- **Config**: `dotenv`
- **Error Monitoring**: `@sentry/node`
- **Dev**: `nodemon`

Dependencies (from `package.json`):
- `express`, `cors`, `dotenv`, `mongoose`
- `express-fileupload`
- `socket.io`
- `@clerk/express`
- `cloudinary`
- `@sentry/node`
- `nodemon`

---

## 2. Project Structure (Backend)

High‑level structure under `backend/`:

- **`src/index.js`** – main Express app:
  - Loads env via `dotenv`
  - Connects to MongoDB via `./Database/connection`
  - Sets up Sentry, CORS, JSON parsing, Clerk middleware, file upload, routes, error handlers
  - Creates HTTP server and attaches Socket.IO via `./lib/socket`
- **`src/Database/connection.js`** – connects to MongoDB using `process.env.MONGO_URL`
- **`src/lib/socket.js`** – initializes Socket.IO:
  - Manages online users and activities
  - Handles `user_connected`, `update_activity`, `send_message`, and `disconnect`
  - Persists chat messages using `Message` model
- **`src/lib/cloudinary.js`** – configures Cloudinary from env and exports the configured client
- **`src/middleware/auth.middleware.js`**:
  - `protectRoute` – requires `req.auth.userId` (Clerk)
  - `requireAdmin` – ensures current user’s email matches `process.env.ADMIN_EMAIL`
- **`src/routes/*.route.js`** – Express routers for each domain:
  - `user.route.js`, `auth.route.js`, `songs.route.js`, `admin.route.js`, `album.route.js`, `stats.route.js`
- **`src/models/*.model.js`** – Mongoose models:
  - `User`, `Song`, `Album`, `Message`
- **`src/controllers/*.controller.js`** – request handlers:
  - `admin.controller.js`, `album.controller.js`, `auth.controller.js`, `song.controller.js`, `stats.controller.js`, `user.controller.js`
- **`src/seeds/*.js`** – DB seeding scripts:
  - `songs.js`, `albums.js`
- **`src/instrument.js`** – Sentry initialization (required early by `index.js`)

Entry scripts (`package.json`):
- **`npm run dev`** – start dev server with `nodemon ./src/index.js`
- **`npm start`** – start server with `node ./src/index.js`
- **`npm run seed:songs`** – seed songs collection
- **`npm run seed:albums`** – seed albums & related songs

---

## 3. Environment Variables (`.env`)

Create a `.env` file in `backend/` (same folder as `package.json`) and define at least:

```env
PORT=5000                       # Port for the Express server (optional, defaults to 5000)
MONGO_URL=your_mongodb_uri      # MongoDB connection string used in src/Database/connection.js

# Clerk (Auth) configuration
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Admin authorization
ADMIN_EMAIL=admin@example.com   # Email that is allowed to access admin-only routes

# Cloudinary configuration (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Sentry configuration (error tracking)
SENTRY_DSN=your_sentry_dsn
NODE_ENV=development            # or "production"
```

**How `.env` is used in the code:**
- `src/index.js`
  - `require('dotenv').config()` loads env variables at startup.
  - `const port = process.env.PORT || 5000;` – chooses listening port.
  - Uses `process.env.NODE_ENV` in the error handler to hide error messages in production.
- `src/Database/connection.js`
  - `mongoose.connect(process.env.MONGO_URL)` – connects to MongoDB.
- `src/middleware/auth.middleware.js`
  - Compares current user email with `process.env.ADMIN_EMAIL` to allow/deny admin routes.
- `src/lib/cloudinary.js`
  - Reads `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` to configure Cloudinary.
- `src/lib/socket.js`
  - (Optionally) can use `NODE_ENV` to choose frontend origin (currently hardcoded to `http://localhost:3000`).
- Sentry (via `@sentry/node` and `src/instrument.js`)
  - Uses `SENTRY_DSN` and `NODE_ENV` to send error reports.

> **Important**: Never commit `.env` to version control. Keep your secrets private.

---

## 4. Running the Backend Locally

1. **Install dependencies**
   ```bash
   cd Music_And_Chat_App/backend
   npm install
   ```

2. **Create `.env`**
   - Copy the example above and fill in your real values.

3. **Run MongoDB**
   - Use a local MongoDB instance or a hosted MongoDB URI in `MONGO_URL`.

4. **Start the server (development)**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000` (or the `PORT` you set).

5. **Start the server (production mode)**
   ```bash
   npm start
   ```

---

## 5. Seeding the Database

There are two seed scripts: `songs.js` and `albums.js`.

- **Seed only songs**
  ```bash
  npm run seed:songs
  ```
  - Connects to `process.env.MONGO_URL`
  - Clears existing songs: `Song.deleteMany({})`
  - Inserts a predefined list of songs with `title`, `artist`, `imageUrl`, `audioUrl`, and `duration`

- **Seed songs and albums with relations**
  ```bash
  npm run seed:albums
  ```
  - Connects to `process.env.MONGO_URL`
  - Clears existing `Album` and `Song` collections
  - Inserts multiple songs
  - Creates albums and populates each `Album.songs` with corresponding song IDs
  - Updates each song’s `albumId` to reference its album

Ensure `.env` has a valid `MONGO_URL` before running seed scripts.

---

## 6. Data Models (Mongoose)

### `User` (`src/models/user.model.js`)
- `fullName: String` (required)
- `imageUrl: String` (required)
- `clerkId: String` (required, Clerk user id)
- Timestamps enabled

### `Song` (`src/models/song.model.js`)
- `title: String` (required)
- `artist: String` (required)
- `imageUrl: String` (required)
- `audioUrl: String` (required)
- `duration: Number` (required, in seconds)
- `albumId: ObjectId` (ref `Album`, optional)
- Timestamps enabled

### `Album` (`src/models/album.model.js`)
- `title: String` (required)
- `artist: String` (required)
- `imageUrl: String` (required)
- `releaseYear: Number` (required)
- `songs: [ObjectId]` (array of refs to `Song`)
- Timestamps enabled

### `Message` (`src/models/message.model.js`)
- `senderId: String` (required – typically Clerk user id)
- `receiverId: String` (required)
- `content: String` (required)
- Timestamps enabled

---

## 7. Middleware & Realtime

### Auth Middleware (`src/middleware/auth.middleware.js`)
- **`protectRoute`**
  - Requires `req.auth.userId` (set by `clerkMiddleware()` from `@clerk/express`)
  - Returns `401` if user is not authenticated
- **`requireAdmin`**
  - Fetches current user from Clerk: `clerkClient.users.getUser(req.auth.userId)`
  - Compares `primaryEmailAddress.emailAddress` with `process.env.ADMIN_EMAIL`
  - If mismatch, returns `403` (“admin only”)

### Socket.IO (`src/lib/socket.js`)
- Creates a `Server` attached to the HTTP server with CORS `{ origin: 'http://localhost:3000', credentials: true }`
- Tracks:
  - `userSockets: Map<userId, socketId>`
  - `userActivities: Map<userId, activity>`
- Events:
  - `user_connected` – registers user, broadcasts online users and activities
  - `update_activity` – updates and broadcasts user activity
  - `send_message` – creates a `Message` in MongoDB and emits `receive_message` to receiver, `message_sent` to sender
  - `disconnect` – clears user from maps and broadcasts `user_disconnected`

---

## 8. REST API Endpoints

Base URL: `http://localhost:<PORT>/api`

### 8.1 Auth Routes (`/api/auth`)

**File**: `src/routes/auth.route.js`  
**Controller**: `src/controllers/auth.controller.js`

- **POST `/api/auth/callback`**
  - **Body** (JSON):
    - `id` – Clerk user id
    - `firstName`
    - `lastName`
    - `imageUrl`
  - **Behavior**:
    - Checks if user with `clerkId: id` exists
    - If exists: returns `200` with message `User <name> already exists`
    - If not: creates new `User` and returns `201` with user data

---

### 8.2 User Routes (`/api/users`)

**File**: `src/routes/user.route.js`  
**Controller**: `src/controllers/user.controller.js`  
**Middleware**: `protectRoute`

- **GET `/api/users/`**
  - **Auth**: requires logged‑in user (`protectRoute`)
  - **Behavior**:
    - Uses `req.auth.userId` to exclude the current user
    - Returns all other users: `{ success, message, user: [...] }`

- **GET `/api/users/message/:userId`**
  - **Auth**: requires logged‑in user (`protectRoute`)
  - **Params**:
    - `userId` – the other participant in the conversation
  - **Behavior**:
    - Finds all `Message` documents where:
      - `(senderId = userId AND receiverId = myId)` OR
      - `(senderId = myId AND receiverId = userId)`
    - Sorts by `createdAt` ascending
    - Returns the list of messages as JSON

---

### 8.3 Songs Routes (`/api/songs`)

**File**: `src/routes/songs.route.js`  
**Controller**: `src/controllers/song.controller.js`  
**Middleware**:
- `protectRoute`, `requireAdmin` for admin‑only endpoint

- **GET `/api/songs/`**
  - **Auth**: `protectRoute` + `requireAdmin` (admin only)
  - **Behavior**:
    - Returns all songs sorted by `createdAt` (desc)
    - Response: `{ success, message: "All Songs Finded", songs }`

- **GET `/api/songs/featured`**
  - **Behavior**:
    - Returns a random sample of 8 songs using aggregation `$sample`
    - Projects `title`, `artist`, `imageUrl`, `audioUrl`

- **GET `/api/songs/made-for-you`**
  - **Behavior**:
    - Returns a random sample of 4 songs with main fields

- **GET `/api/songs/trending`**
  - **Behavior**:
    - Returns a random sample of 4 songs with main fields

- **GET `/api/songs/single`**
  - **Behavior**:
    - Returns a random single song using aggregation `$sample: { size: 1 }`

---

### 8.4 Albums Routes (`/api/albums`)

**File**: `src/routes/album.route.js`  
**Controller**: `src/controllers/album.controller.js`

- **GET `/api/albums/`**
  - **Behavior**:
    - Returns all albums: `{ success, message: "All Albums", albums }`

- **GET `/api/albums/:albumId`**
  - **Params**:
    - `albumId` – album `_id`
  - **Behavior**:
    - `Album.findById(albumId).populate("songs")`
    - If not found: `404` with `message: "Invaild Data"`
    - If found: returns `{ success, message: "Album Founded", album }`

---

### 8.5 Admin Routes (`/api/admin`)

**File**: `src/routes/admin.route.js`  
**Controller**: `src/controllers/admin.controller.js`  
**Middleware**: `protectRoute`, `requireAdmin` (all routes are admin‑only)

- **GET `/api/admin/check`**
  - Returns:
    - `success: true`
    - `admin: true`
    - `userId` – current user id  
  - (Relies on Clerk setup; proper role checking can be extended.)

- **POST `/api/admin/songs`**
  - **Auth**: admin only
  - **Form‑Data**:
    - Files:
      - `audioFile` – audio file
      - `imageFile` – cover image
    - Fields:
      - `title` (required)
      - `artist` (required)
      - `duration` (required, in seconds)
      - `albumId` (optional, if song belongs to an album)
  - **Behavior**:
    - Validates presence of `audioFile`, `imageFile`, `title`, `artist`, `duration`
    - Uploads files to Cloudinary (auto resource type)
    - Creates `Song` with `audioUrl`, `imageUrl`
    - If `albumId` present, pushes song `_id` to `Album.songs`
    - Returns `201` with `{ success, message, song }`

- **DELETE `/api/admin/songs/:id`**
  - **Auth**: admin only
  - **Params**:
    - `id` – song `_id`
  - **Behavior**:
    - Removes song reference from its album (if `albumId` exists)
    - Deletes the song
    - Returns `200` with success message

- **POST `/api/admin/albums`**
  - **Auth**: admin only
  - **Form‑Data**:
    - File:
      - `imageFile` – album cover image (required)
    - Fields:
      - `title` (required)
      - `artist` (required)
      - `releaseYear` (optional, defaults to current year)
  - **Behavior**:
    - Uploads image to Cloudinary
    - Creates new `Album` with empty `songs` array
    - Returns `201` with `{ success, message, album }`

- **DELETE `/api/admin/albums/:id`**
  - **Auth**: admin only
  - **Params**:
    - `id` – album `_id`
  - **Behavior**:
    - Deletes all songs with `albumId: id`
    - Deletes the album
    - Returns `200` with success message

---

### 8.6 Stats Routes (`/api/stats`)

**File**: `src/routes/stats.route.js`  
**Controller**: `src/controllers/stats.controller.js`  
**Middleware**: `protectRoute`, `requireAdmin`

- **GET `/api/stats/`**
  - **Auth**: admin only
  - **Behavior**:
    - Computes:
      - `totalSongs` – `Song.countDocuments()`
      - `totalUsers` – `User.countDocuments()`
      - `totalAlbum` – `Album.countDocuments()`
      - `totalArtists` – number of unique artists across songs & albums (via aggregation)
    - Returns stats object

---

## 9. Global Error Handling & Sentry

- **Sentry**
  - Initialized in `src/instrument.js` using `@sentry/node`
  - `src/index.js` requires `./instrument.js` early so that:
    - All requests are traced
    - `Sentry.setupExpressErrorHandler(app)` registers Sentry handlers
  - `/debug-sentry` route throws an error for testing Sentry integration

- **Custom Error Handler**
  - Final middleware in `src/index.js`:
    - Returns `500` with:
      - `"Internal Server Error"` in production
      - `err.message` in non‑production
  - Any controller calling `next(error)` will be handled here.

---

## 10. CORS & Frontend Integration

- CORS in `src/index.js`:
  - Currently:
    ```js
    origin: "http://localhost:3000",
    credentials: true
    ```
  - Adjust origin(s) when deploying to production (e.g. Vercel frontend).

- Socket.IO in `src/lib/socket.js`:
  - Also uses `origin: 'http://localhost:3000'` with `credentials: true`
  - Update this to match your frontend URL in production.

---

## 11. Notes for Deployment

- Set `NODE_ENV=production` and a proper `PORT` on your server.
- Ensure all `.env` variables are configured in your hosting provider.
- Update CORS and Socket.IO `origin` to your deployed frontend URL.
- Configure Sentry DSN (`SENTRY_DSN`) for production monitoring.
- Use a production MongoDB instance (e.g. MongoDB Atlas) for `MONGO_URL`.


