# Music & Chat App 🎵💬

A full-stack MERN application combining music streaming with real-time chat functionality. Built with modern web technologies, featuring a Spotify-like music player interface and integrated messaging system.

---

## 🎯 Project Overview

This is a **Music Streaming & Chat Application** that allows users to:
- **Stream music** with a modern, Spotify-inspired UI
- **Browse albums and songs** with featured, trending, and personalized recommendations
- **Chat in real-time** with other users
- **View friends' activity** and online presence
- **Admin dashboard** for managing songs and albums (admin-only)

The application consists of two main parts:
- **Backend**: Node.js/Express REST API with Socket.IO for real-time features
- **Frontend**: React application with Vite, TypeScript, and modern UI components

---

## ✨ Key Features

### Music Features
- 🎵 Music player with playback controls (play, pause, skip, volume)
- 📀 Album browsing and detailed album pages
- 🎶 Song discovery (Featured, Trending, Made for You)
- 🎨 Modern, responsive UI with resizable panels
- 🔊 Global audio player accessible across all pages

### Chat Features
- 💬 Real-time messaging between users
- 👥 User list with online/offline status
- 📱 Activity tracking (what users are listening to)
- 🔔 Live message notifications

### Admin Features
- 📊 Dashboard with statistics (songs, albums, users, artists)
- ➕ Create and manage songs (with audio & image uploads)
- 📀 Create and manage albums
- 🗑️ Delete songs and albums
- 🔐 Admin-only access control

### Authentication & Security
- 🔐 Clerk authentication (OAuth, SSO)
- 🛡️ Protected routes and admin authorization
- 🔒 Secure file uploads via Cloudinary
- 📊 Error tracking with Sentry

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Clerk (`@clerk/express`)
- **Real-time**: Socket.IO
- **File Storage**: Cloudinary
- **Error Tracking**: Sentry (`@sentry/node`)
- **File Uploads**: `express-fileupload`

### Frontend
- **Framework**: React 19 with Vite
- **Language**: TypeScript + JavaScript (JSX)
- **Routing**: React Router DOM v7
- **State Management**: Zustand
- **Authentication**: Clerk (`@clerk/clerk-react`)
- **Real-time**: Socket.IO Client
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Error Tracking**: Sentry (`@sentry/react`)

---

## 📁 Project Structure

```
Music_And_Chat_App/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Mongoose models (User, Song, Album, Message)
│   │   ├── routes/         # Express route definitions
│   │   ├── middleware/     # Auth middleware (protectRoute, requireAdmin)
│   │   ├── lib/            # Utilities (socket.js, cloudinary.js)
│   │   ├── Database/       # MongoDB connection
│   │   ├── seeds/          # Database seeding scripts
│   │   └── index.js        # Main Express app entry point
│   ├── package.json
│   └── readme.md           # Detailed backend documentation
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── pages/          # Page components (Home, Chat, Album, Admin)
│   │   ├── components/     # Reusable components
│   │   │   ├── layout/     # Layout components (MainLayout, Sidebar, Player)
│   │   │   ├── ui/         # UI primitives (Button, Dialog, etc.)
│   │   │   └── skeletons/  # Loading skeletons
│   │   ├── store/          # Zustand stores (auth, music, chat, player)
│   │   ├── lib/            # Utilities (axios, sentry, utils)
│   │   ├── Providers/      # Context providers (AuthProvider)
│   │   ├── types/          # TypeScript type definitions
│   │   ├── App.jsx         # Main app component with routes
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static assets (songs, images)
│   ├── package.json
│   └── README.md           # Detailed frontend documentation
│
└── readme.md               # This file (project overview)
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas)
- **Clerk Account** (for authentication)
- **Cloudinary Account** (for file uploads)
- **Sentry Account** (optional, for error tracking)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** in `backend/` directory:
   ```env
   PORT=5000
   MONGO_URL=your_mongodb_connection_string
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ADMIN_EMAIL=admin@example.com
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   SENTRY_DSN=your_sentry_dsn
   NODE_ENV=development
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Seed the database (optional):**
   ```bash
   npm run seed:albums
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** in `frontend/` directory:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/callback` - Create/update user after Clerk authentication

### Users
- `GET /api/users` - Get all users (protected)
- `GET /api/users/message/:userId` - Get messages with a user (protected)

### Songs
- `GET /api/songs` - Get all songs (admin only)
- `GET /api/songs/featured` - Get featured songs (public)
- `GET /api/songs/made-for-you` - Get personalized songs (public)
- `GET /api/songs/trending` - Get trending songs (public)
- `GET /api/songs/single` - Get a random single song (public)

### Albums
- `GET /api/albums` - Get all albums (public)
- `GET /api/albums/:albumId` - Get album by ID with songs (public)

### Admin
- `GET /api/admin/check` - Check admin status (protected, admin only)
- `POST /api/admin/songs` - Create a new song (protected, admin only)
- `DELETE /api/admin/songs/:id` - Delete a song (protected, admin only)
- `POST /api/admin/albums` - Create a new album (protected, admin only)
- `DELETE /api/admin/albums/:id` - Delete an album (protected, admin only)

### Statistics
- `GET /api/stats` - Get dashboard statistics (protected, admin only)

### Socket.IO Events
- `user_connected` - User connects to chat
- `update_activity` - Update user activity (e.g., currently playing song)
- `send_message` - Send a chat message
- `receive_message` - Receive a chat message
- `user_disconnected` - User disconnects

---

## 📚 Documentation

For detailed documentation, please refer to:
- **[Backend README](./backend/readme.md)** - Complete backend documentation including:
  - Detailed API endpoints
  - Database models
  - Authentication flow
  - Socket.IO implementation
  - Environment variables
  - Code structure

- **[Frontend README](./frontend/README.md)** - Complete frontend documentation including:
  - Component structure
  - State management
  - Routing
  - UI components
  - Environment setup

---

## 🔐 Environment Variables Summary

### Backend (`.env` in `backend/`)
| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 5000) | No |
| `MONGO_URL` | MongoDB connection string | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `ADMIN_EMAIL` | Admin user email | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `SENTRY_DSN` | Sentry DSN for error tracking | Optional |
| `NODE_ENV` | Environment (development/production) | Yes |

### Frontend (`.env` in `frontend/`)
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |

> **Note**: All frontend environment variables must be prefixed with `VITE_` to be accessible in the client code.

---

## 🎨 Features in Detail

### Music Player
- Global audio player accessible from any page
- Playback controls (play, pause, next, previous, volume)
- Progress tracking and seek functionality
- Current song display with album art
- Queue management

### Real-time Chat
- Instant messaging between users
- Online/offline status indicators
- Activity tracking (shows what song users are listening to)
- Message history persistence
- Socket.IO for real-time updates

### Admin Dashboard
- Statistics overview (total songs, albums, users, artists)
- Song management (create, delete)
- Album management (create, delete)
- File uploads for audio and images via Cloudinary
- Protected admin routes

---

## 🏗️ Architecture

### Backend Architecture
- **RESTful API** design with Express.js
- **MVC pattern**: Models, Controllers, Routes separation
- **Middleware** for authentication and authorization
- **Socket.IO** for real-time bidirectional communication
- **MongoDB** for data persistence
- **Cloudinary** for media storage

### Frontend Architecture
- **Component-based** React architecture
- **State management** with Zustand stores
- **Route-based** code splitting
- **Custom hooks** for reusable logic
- **TypeScript** for type safety
- **Responsive design** with Tailwind CSS

---

## 🚢 Deployment

### Backend Deployment
1. Set all environment variables in your hosting platform
2. Ensure MongoDB is accessible
3. Run `npm start` (production mode)
4. Configure CORS to allow your frontend domain

### Frontend Deployment
1. Set `VITE_CLERK_PUBLISHABLE_KEY` in your hosting platform
2. Build the app: `npm run build`
3. Deploy the `dist/` folder
4. Configure your backend API URL if different from localhost

---

## 📝 Scripts

### Backend Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed:songs` - Seed songs collection
- `npm run seed:albums` - Seed albums and songs

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 🤝 Contributing

This is a learning project. Feel free to:
- Report issues
- Suggest improvements
- Fork and modify for your own use

---

## 📄 License

ISC License

---

## 🙏 Acknowledgments

- **Clerk** for authentication
- **Cloudinary** for media storage
- **Sentry** for error tracking
- **Radix UI** for accessible components
- **Tailwind CSS** for styling

---

## 📞 Support

For detailed information about:
- **Backend**: See [backend/readme.md](./backend/readme.md)
- **Frontend**: See [frontend/README.md](./frontend/README.md)

---

**Built with ❤️ using the MERN stack**

