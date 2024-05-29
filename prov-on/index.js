import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { buildSubgraphSchema } from '@apollo/subgraph/dist/buildSubgraphSchema.js';

import { applyMiddleware } from 'graphql-middleware';

import jwt from "jsonwebtoken";

import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import permissions from './permissions.js';

const PORT = 8080;

// Environment variables
const JWT_VERIFY_SECRET = process.env.JWT_VERIFY_SECRET || "changeme"

// TODO: move getClaims to separate module
function getClaims(req) {
    // Header names in Express are auto-converted to lowercase
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        // Remove Bearer from string
        token = token.replace(/^Bearer\s+/, "");
        return jwt.verify(token, JWT_VERIFY_SECRET);
    }
    return null;
}

// server setup
const server = new ApolloServer({
    schema: applyMiddleware(
        buildSubgraphSchema([{ typeDefs, resolvers }]),
        permissions
    ),
})

const { url } = await startStandaloneServer(server, {
    listen: {
        host: '0.0.0.0',
        port: PORT
    },
    // Context function should be async and return an object
    context: async ({ req }) => ({
        claims: getClaims(req),
    }),
});

console.log('Prov ON service is ready at port', PORT);