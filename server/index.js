const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });

// user data
const userSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    name: String,
    description: String,
    timestamp: { type: Date, default: Date.now }
});

const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now }
});

const Location = mongoose.model('Location', locationSchema);

// const Location = mongoose.model('Location', locationSchema);
const User = mongoose.model('User', userSchema);


app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// API Endpoint to receive location data from frontend
app.post('/api/record', async (req, res) => {
    const { latitude, longitude, name, description } = req.body;

    if (!latitude || !longitude || !name || !description) {
        return res.status(400).json({ message: 'Latitude, Longitude, Name, and Description are required' });
    }
    
    try {
        const user = new User({ latitude, longitude, name, description });
        await user.save();
        res.status(201).json({ message: 'User data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// calculate the distance between two users
function calculateDistance(lat1, lon1, lat2, lon2) {
    const x = lat1 - lat2;
    const y = lon1 - lon2;
    const distance = Math.sqrt(x * x + y * y);
    return distance;
}

// Get locations within 10 meters of specified coordinates
app.get('/api/nearbyUsers', async (req, res) => {
    const { latitude, longitude } = req.query;

    try {
        const locations = await Location.find({});
        const nearbyUsers = locations.filter(loc => {
            const distance = calculateDistance(latitude, longitude, loc.latitude, loc.longitude);
            return distance <= 3;
        });

        res.json({ nearbyUsers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});