const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        // // Create TTL index
        // const TTL_SECONDS = 3600; // 1 hour
        // const indexOptions = { expireAfterSeconds: TTL_SECONDS };
        // User.collection.createIndex({ timestamp: 1 }, indexOptions);

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
    likes: [{type: String}],
    timestamp: { type: Date, default: Date.now }
});

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
        const user = new User({ latitude, longitude, name, description, likedBy: [] });
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
app.post('/api/nearbyUsers', async (req, res) => {

    console.log(req.body);
    const { latitude, longitude, name } = req.body;


    try {
        if (name && latitude && longitude) {
            // Update user's location based on name
            await User.findOneAndUpdate({ name }, { latitude, longitude });
        }

        // Find nearby users within 3 meters
        const  user = await User.find({});
        const nearbyUsers = user.filter(loc => {
            const distance = calculateDistance(latitude, longitude, loc.latitude, loc.longitude);
            return distance <= 0.003 && loc.name !== name;
        });

        let likesCount = 0;

        for (const nearbyUser of nearbyUsers) {
            if (nearbyUser.likes.find(likeName => name === likeName)) {
                likesCount += 1;
            }
        
        }

        res.json({ nearbyUsers, likesCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Add a new API endpoint to handle "like" button press
app.put('/api/likeUsers', async (req, res) => {
    const { userName, likeName } = req.body;

    try {
        const user = await User.findOneAndUpdate({ name: userName }, { $addToSet: {likes: likeName} });
        // if (!user) {
        //     return res.status(404).json({ message: 'User not found' });
        // }
        res.json({ message: 'Liked count increased successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});