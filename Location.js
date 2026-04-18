// models/Location.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    busId: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    isOfflineBuffered: { type: Boolean, default: false } // Crucial for Track B's network drop requirement!
});

module.exports = mongoose.model('Location', locationSchema);