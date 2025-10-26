# URL Shortener Frontend

React frontend for the URL Shortener application.

## Features

- URL shortening form with validation
- Copy to clipboard functionality
- Admin dashboard with analytics
- Responsive design with Tailwind CSS
- Real-time statistics

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Backend server running on port 5000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Setup

Make sure your backend server is running on `http://localhost:5000` for the proxy to work correctly.

### Deployment

Build the project for production:
```bash
npm run build
```

The built files will be in the `dist` directory.