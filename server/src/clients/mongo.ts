import { MongoClient, ObjectId } from "mongodb";


const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI environment variable is not defined");
}

const client = new MongoClient(uri);

export async function connectDB() {
    try {
        await client.connect();
        console.log(`Connected to MongoDB`);
    } catch (error: any) {
        console.error(`Failed to connect MongoDB: ${error.message}`);
        throw error;
    }
}

export async function checkUser( email: string) {
    try {
        return await client.db("expense_tracker").collection("users").findOne({ email});
    } catch (e: any) {
        throw new Error(`Failed to check user in database: ${e.message}`);
    }
};

export async function signup(dbName: string, args: any) {
    try {
        return await client.db("expense_tracker").collection("users").insertOne({
            ...args,
            dbName
        });
    } catch (e: any) {
        throw new Error(`Failed to add user in database: ${e.message}`);
    }
};

export async function forgotpassword(email: string , resetToken: string , resetTokenExpiry: Date) {
    try {
        return await client.db("expense_tracker").collection("users").updateOne(
            { email},
            {
                $set: {
                    resetToken, 
                    resetTokenExpiry
                }
            }
);
    } catch (e: any) {
        throw new Error(`Failed to update reset token: ${e.message}`);
    }
};

export async function createUserDB(dbName: string) {
    if (!dbName) throw new Error('Database client is not initialized.');
    try {
        return await client.db(dbName).createCollection("transaction");
    } catch (e: any) {
        throw new Error(`Failed to create user database: ${e.message}`);
    }
};

export async function gettransaction(dbName: string) {
    if (!dbName) throw new Error('Database client is not initialized.');
    try {
        return await client.db(dbName).collection("transaction").find().toArray();
    } catch (e: any) {
        throw new Error(`Failed to get transaction from database: ${e.message}`);
    }
};

export async function addtransaction(dbName: string, args: any) {
    if (!dbName) throw new Error('Database client is not initialized.');
    try {
        return await client.db(dbName).collection("transaction").insertOne({
            ...args,
            date: new Date(args?.date),
        });
    } catch (e: any) {
        throw new Error(`Failed to add transaction in database: ${e.message}`);
    }
};

export async function updatetransaction(dbName: string, _id: string, update: any) {
    if (!dbName) throw new Error('Database client is not initialized.');
    try {
        return await client.db(dbName).collection("transaction").updateOne(
            { _id: new ObjectId(_id) },
            { $set: { ...update, date: new Date(update?.date) } }
        );
    } catch (e: any) {
        throw new Error(`Failed to update transaction in database: ${e.message}`);
    }
};

export async function deletetransactionById(dbName: string, _id: string) {
    if (!dbName) throw new Error('Database client is not initialized.');
    try {
        return await client.db(dbName).collection("transaction").deleteOne({ _id: new ObjectId(_id) });
    } catch (e: any) {
        throw new Error(`Failed to delete transaction by id from the database: ${e.message}`);
    }
};

export async function gettransactionByMonth(dbName: string, args: any) {
    if (!dbName) throw new Error('Database client is not initialized.');
    try {
        return await client.db(dbName).collection("transaction").find({date: {$gte: new Date(args?.startDate), $lt: new Date(args?.endDate)} }).toArray();
    } catch (e: any) {
        throw new Error(`Failed to get transaction by month from database: ${e.message}`);
    }
};