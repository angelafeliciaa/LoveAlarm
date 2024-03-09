const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/mydatabase';

async function main() {
    try {
        // Connect to the MongoDB cluster
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log("Connected to MongoDB");

        // Perform operations with the client
        // Example: List all databases
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Collections:");
        collections.forEach(collection => console.log(` - ${collection.name}`));


    } finally {
        // Close the connection when finished
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

main().catch(console.error);