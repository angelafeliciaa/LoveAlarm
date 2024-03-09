const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://yuriyasui012:-gCxe#695bAj7Jr@cluster0.owsvqw0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        console.log("Connected to MongoDB");

        // Perform operations with the client
        // Example: List all databases

    } finally {
        // Close the connection when finished
        await client.close();
    }
}

main().catch(console.error);