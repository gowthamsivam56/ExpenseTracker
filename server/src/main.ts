import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import { ApolloServer } from "@apollo/server";
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
// import bodyParser from 'body-parser';
import { connectDB } from './clients/mongo';
import { resolvers } from './gql/resolvers';
import { readFileSync } from 'fs';
import { gql } from "graphql-tag";


// const typeDefs = `
//     type Query {
//         hello: String
//     }
// `;

// const resolvers = {
//     Query: {
//         hello: () => "Hello World!",
//     },
// };

const typeDefs = gql(readFileSync(__dirname + '/gql/schema.gql', 'utf8'));
const PORT = process.env.PORT || 4000;

// Set up Apollo Server
const startServer = async () => {
    const app = express();
    await connectDB();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use(
        '/graphql',
        cors(),
        // bodyParser.json(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const info = {
                    dbName: req.headers['dbname'] || '',
                };
                return { info };
            },
        })
    );

    app.listen(PORT, () => {
        console.log(`GraphQL server running on port ${PORT}`);
    });
};

startServer();