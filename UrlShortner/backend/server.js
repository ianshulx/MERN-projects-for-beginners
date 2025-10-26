import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import shortid from 'shortid'; // Use ES module import

const app = express();
const PORT = 5000;

// MongoDB connection
const mongoURI = process.env.MONGODB_URI; 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

//URL schema and model
const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 }
});

const Url = mongoose.model('Url', urlSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper function to validate URL
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Routes
// POST /api/shorten - Shorten URL
app.post('/api/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  // Validate URL
  if (!originalUrl || !isValidUrl(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL provided' });
  }

  try {
    // Check if URL already exists
    let existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
      return res.json({
        originalUrl: existingUrl.originalUrl,
        shortUrl: `${process.env.BASE_URL}/${existingUrl.shortCode}`,
        shortCode: existingUrl.shortCode
      });
    }

    // Generate short code
    const shortCode = shortid.generate();

    // Create and save new URL
    const newUrl = new Url({ originalUrl, shortCode });
    await newUrl.save();

    res.json({
      originalUrl,
      shortUrl: `http://localhost:5000/${shortCode}`,
      shortCode
    });
  } catch (error) {
    console.error('Error saving URL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /:shortCode - Redirect to original URL
app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    // Find URL in database
    const urlObj = await Url.findOne({ shortCode });

    if (urlObj) {
      // Increment click count
      urlObj.clicks++;
      await urlObj.save();

      // Redirect to original URL
      return res.redirect(urlObj.originalUrl);
    }

    res.status(404).json({ error: 'Short URL not found' });
  } catch (error) {
    console.error('Error finding URL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/urls - Get all URLs (Admin)
app.get('/api/urls', async (req, res) => {
  try {
    const urls = await Url.find();
    res.json(urls);
  } catch (error) {
    console.error('Error fetching URLs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/stats - Get visit statistics
app.get('/api/stats', async (req, res) => {
  try {
    const urls = await Url.find();
    const stats = urls.reduce((acc, url) => {
      acc[url.shortCode] = url.clicks;
      return acc;
    }, {});
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Example route
app.get("/", (req, res) => {
  res.json({ msg: "Backend is working!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
