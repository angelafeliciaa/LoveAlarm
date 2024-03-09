const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// not sure --------------------------
const app = express();
const PORT = process.env.PORT || 3000;
// -----------------------------------

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// need to change-----------------------------
const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now }
});
// --------------------------------------------


const Location = mongoose.model('Location', locationSchema);

app.use(express.json());

// API Endpoint to receive location data from frontend
app.post('/api/location', async (req, res) => {
    const { latitude, longitude } = req.body;
    try {
        const location = new Location({ latitude, longitude });
        await location.save();
        res.status(201).json({ message: 'Location data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});