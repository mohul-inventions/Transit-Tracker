// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test Route
app.get('/api/status', (req, res) => {
    res.json({ message: 'Transit Tracker API is running smoothly.', status: 'Online' });
});

// Route to receive GPS pings
app.post('/api/location', async (req, res) => {
    try {
        const Location = require('./models/Location');
        const newLocation = await Location.create(req.body);
        console.log(`[PING] Bus ${newLocation.busId} logged at ${newLocation.timestamp}`);
        res.status(201).json({ success: true, data: newLocation });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

app.get('/api/location', async (req, res) => {
    try {
        const Location = require('./models/Location');
        // Find the single most recent ping based on timestamp
        const latestLocation = await Location.findOne().sort({ timestamp: -1 });
        res.status(200).json({ success: true, data: latestLocation });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is blasting off on port ${PORT}`);
});