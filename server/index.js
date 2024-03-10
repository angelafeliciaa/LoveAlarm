const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// not sure --------------------------
const app = express();
const PORT = process.env.PORT || 3000;
// -----------------------------------
console.log(process.env)
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });


// need to change-----------------------------
const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now }
});
// --------------------------------------------

const userSchema = new mongoose.Schema({
    name: String,
    description: String,
});

const Location = mongoose.model('Location', locationSchema);
const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    description: String,
}));

app.use(cors()); // Enable CORS for all routes
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

app.post('/api/user', async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Name and Description are required' });
    }

    try {
        const user = new User({ name, description });
        await user.save();
        res.status(201).json({ message: 'User data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});