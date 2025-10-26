# URL Shortener - MERN Stack Application

A modern, full-featured URL shortener built with the MERN stack, organized into separate frontend and backend directories.

## Project Structure

```
url-shortener-mern/
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Express.js backend API
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
└── README.md
```

## Features

### User Features
- **URL Shortening**: Convert long URLs into short, manageable links
- **Instant Redirect**: Short URLs automatically redirect to original destinations  
- **Copy to Clipboard**: One-click copying of shortened URLs
- **URL Validation**: Ensures only valid URLs are processed
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Admin Features
- **Dashboard Overview**: View statistics and analytics at a glance
- **URL Management**: See all shortened URLs with creation dates
- **Click Tracking**: Monitor how many times each short URL has been visited
- **Real-time Stats**: Live updates of total URLs, clicks, and averages

## Technology Stack

- **Frontend**: React 18, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **URL Generation**: ShortID library for unique short codes
- **Styling**: Tailwind CSS with custom components

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd url-shortener-mern
```

2. **Setup Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm run dev
```

3. **Setup Frontend (in a new terminal):**
```bash
cd frontend
npm install
npm run dev
```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb://localhost:27017/urlshortener
PORT=5000

# For MongoDB Atlas:
# MONGODB_URI=
```

## API Endpoints

### POST /api/shorten
Shorten a long URL.

**Request Body:**
```json
{
  "originalUrl": "https://www.example.com/very/long/url/path"
}
```

**Response:**
```json
{
  "originalUrl": "https://www.example.com/very/long/url/path",
  "shortUrl": "http://localhost:5000/abc123",
  "shortCode": "abc123"
}
```

### GET /:shortCode
Redirect to the original URL associated with the short code.

### GET /api/urls
Get all shortened URLs (Admin endpoint).

### GET /api/stats  
Get click statistics for all short URLs.

### GET /api/analytics
Get detailed analytics including top URLs and recent activity.

## Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to your preferred hosting service.

### Backend Deployment (Heroku/Railway/DigitalOcean)

1. Set environment variables on your hosting platform
2. Deploy the `backend` directory
3. Update frontend API calls to point to your deployed backend URL

### Full-Stack Deployment (Vercel)

For deploying both frontend and backend on Vercel:

1. Move API routes to `/api` directory in project root
2. Configure `vercel.json` for serverless functions
3. Use MongoDB Atlas for database
4. Deploy the entire project

## Database Schema

```javascript
{
  originalUrl: String (required),
  shortCode: String (required, unique),
  clicks: Number (default: 0),
  createdAt: Date (default: Date.now),
  lastAccessed: Date (default: null)
}
```

## Features Showcase

### Modern UI/UX
- Gradient backgrounds with smooth transitions
- Card-based layout with subtle shadows
- Hover effects and micro-interactions
- Responsive design for all screen sizes
- Clean typography and proper spacing

### Robust Functionality
- URL validation with user-friendly error messages
- Duplicate URL detection (returns existing short code)
- Real-time click tracking and statistics
- Clipboard integration for easy sharing
- Loading states and user feedback

### Admin Capabilities
- Comprehensive dashboard with key metrics
- Sortable table of all shortened URLs
- Click analytics and performance tracking
- Quick access to test shortened links

## Security & Validation

- URL format validation on both frontend and backend
- Input sanitization and error handling
- CORS configuration for cross-origin requests
- Safe redirect handling with 404 fallbacks
- Rate limiting middleware (basic implementation)

## Development

### Frontend Development
```bash
cd frontend
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run ESLint
```

### Backend Development
```bash
cd backend
npm run dev    # Start with nodemon
npm start      # Start production server
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.