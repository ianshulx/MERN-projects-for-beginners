# URL Shortener Backend

Express.js backend API for the URL Shortener application with MongoDB integration.

## Features

- RESTful API for URL shortening
- MongoDB integration with Mongoose
- Click tracking and analytics
- CORS enabled for frontend integration
- Environment variable configuration

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

### GET /api/health
Health check endpoint.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/urlshortener
PORT=5000
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (placeholder)

### Database Schema

```javascript
{
  originalUrl: String (required),
  shortCode: String (required, unique),
  clicks: Number (default: 0),
  createdAt: Date (default: Date.now)
}
```

### Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)

### MongoDB Setup

#### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/urlshortener`

#### MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/atlas
2. Create a cluster
3. Get connection string
4. Update `.env` file with Atlas connection string

### Deployment

For production deployment:

1. Set environment variables on your hosting platform
2. Use MongoDB Atlas for cloud database
3. Update CORS settings if needed
4. Run `npm start` to start the production server

### Error Handling

The API includes comprehensive error handling for:
- Invalid URLs
- Database connection issues
- Missing short codes
- Server errors

All errors return appropriate HTTP status codes and error messages.