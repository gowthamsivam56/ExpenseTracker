import { MongoClient } from "mongodb";


const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

export async function connectDB() {
    try {
        await client.connect();
        console.log(`Connected to MongoDB`);
    }catch(error: any) {
        console.error(`Failed to connect MongoDB: ${error.message}`);
        throw error;
    }
}