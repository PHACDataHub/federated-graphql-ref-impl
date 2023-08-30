import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';

import jwt from "jsonwebtoken";

import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import permissions from './permissions.js';

// Environment variables
const JWT_VERIFY_SECRET = process.env.JWT_VERIFY_SECRET || "changeme"

// TODO: move getClaims to separate module
function getClaims(req) {
    let claims = null;
    // Header names in Express are auto-converted to lowercase
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    // Remove Bearer from string
    token = token.replace(/^Bearer\s+/, "");

    if (token) {
        claims = jwt.verify(token, JWT_VERIFY_SECRET);
    }
    return claims;
}

// server setup
const server = new ApolloServer({
    schema: applyMiddleware(
        makeExecutableSchema({ typeDefs, resolvers }),
        permissions
    ),
})

const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    },
    // Context function should be async and return an object
    context: async ({ req }) => ({
        claims: getClaims(req),
    }),
});

console.log('Server ready at port', 4000);