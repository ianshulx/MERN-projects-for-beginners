const express = require('express');
const aiRoutes = require("./routes/ai.routes")
const cors = require('cors');

const app = express();

app.use(cors());  // to enable cross-origin requests from different domains or ports

app.use(express.json());  // to parse json requests

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/ai' , aiRoutes);

module.exports = app;