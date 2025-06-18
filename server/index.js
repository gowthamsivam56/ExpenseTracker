import express from 'express';
import { ApolloServer } from "@apollo/server";
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
// import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const DB_URL =  'mongodb://localhost:27017/mydatabase';

const typeDefs = `
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello World!",
    },
};

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
    }
};

// Set up Apollo Server
const startServer = async () => {
    const app = express();
    await connectDB();

    const server = new ApolloServer ({
        typeDefs,
        resolvers,
    });

    await server.start();
    
    app.use(
        '/graphql',
        cors(),
        // bodyParser.json(),
        express.json(),
        expressMiddleware(server)
    );

    app.listen(4000, () => {
        console.log('Server ready at http://localhost:4000/graphql');
    });
};

startServer();
