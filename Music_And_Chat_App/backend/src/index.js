// Initialize Sentry (instrument.js initializes and exports the Sentry instance)
// It is required here so that Sentry is configured early in the app lifecycle
// and the exported Sentry instance is used below for handlers.
const express = require('express');
const cors = require('cors');
const connectDB = require('./Database/connection');
const dotenv = require('dotenv').config();
const { clerkMiddleware } = require("@clerk/express")
const fileUpload = require("express-fileupload")
const path = require("path");
const { createServer } = require('http');
const { initializeSocket } = require('./lib/socket');
const Sentry = require("@sentry/node");
require("./instrument.js");

const app = express();



// Use the built-in __dirname or create a custom variable
const projectRoot = path.resolve();

const httpServer = createServer(app);

initializeSocket(httpServer);

// Register Sentry handlers BEFORE routes
// app.get("/debug-sentry", function mainHandler(req, res) {
//   throw new Error("My first Sentry error!");
// });

Sentry.setupExpressErrorHandler(app);

const port = process.env.PORT || 5000;


app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json()); // to parse req.body
app.use(clerkMiddleware()); // this will add auth to req obj => req.auth
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: path.join(projectRoot, "tmp"),
        createParentPath: true,
        limits: {
            fileSize: 10 * 1024 * 1024, // 10MB max file size
        },
    })
);

// app.use('/api/users', require('./routes/user.route'));
app.use('/api/users', require('./routes/user.route'));
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/songs', require('./routes/songs.route'));
app.use('/api/admin', require('./routes/admin.route'));
app.use('/api/albums', require('./routes/album.route'));
app.use('/api/stats', require('./routes/stats.route'));

// Sentry error handler (should be registered before custom error middleware)
if (Sentry.Handlers && typeof Sentry.Handlers.errorHandler === 'function') {
    app.use(Sentry.Handlers.errorHandler());
}

// Error Handler
app.use((err, req, res, next) => {
    console.log();
    res.status(500).json({
        message: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message
    })
});

app.get('/', (req, res) => {
    res.send('API is running...');
});



// Production fallback for SPA routing
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(projectRoot, '../frontend/dist')))
//     app.all('*', (req, res) => {
//         res.sendFile(path.resolve(projectRoot, '../frontend/dist/index.html'))
//     })
// }

// Make sure port is defined

httpServer.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});