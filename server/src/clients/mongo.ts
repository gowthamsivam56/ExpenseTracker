import { MongoClient, ObjectId } from "mongodb";


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

export async function gettransaction(dbName: string) {
    if (!dbName) throw new Error('Database client is not initialized.');
    try {
        return await client.db(dbName).collection("transaction").find().toArray();
    } catch (e: any) {
        throw new Error(`Failed to get transaction from database: ${e.message}`);
    }
};

export async function addtransaction( dbName: string, args: any) {
    if (!dbName) throw new Error('Database client is not initialized.');
    try {
        return await client.db(dbName).collection("transaction").insertOne(args);
    } catch (e: any) {
        throw new Error(`Failed to add transaction in database: ${e.message}`);
    }
};

export async function deletetransactionById(dbName: string, _id: string) {
    if (!dbName) throw new Error('Database client is not initialized.');
    try {
        return await client.db(dbName).collection("transaction").deleteOne({_id: new ObjectId(_id)});
    } catch (e: any) {
        throw new Error(`Failed to delete transaction by id from the database: ${e.message}`);
    }
};