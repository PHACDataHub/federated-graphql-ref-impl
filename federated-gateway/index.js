import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';

const PORT = 4000;

// Environment variables
const JWT_VERIFY_SECRET = process.env.JWT_VERIFY_SECRET || "changeme"


// Set shared context value for all requests going through the gateway
class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
        if (context.authJwt) {
            // Pass authorization header from incoming request to downstream APIs
            request.http.headers.set("authorization", context.authJwt)
        }
    }
}

const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
            {
                name: "prov-qc",
                url: "http://localhost:4001"
            }
        ]
    }),
    buildService({ name, url }) {
        return new AuthenticatedDataSource({ url })
    }
});

const server = new ApolloServer({
    gateway
});


const { url } = await startStandaloneServer(server, {
    listen: {
        port: PORT
    },
    context: async ({ req }) => {
        // Header names in Express are auto-converted to lowercase
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (token) {
            return {
                authJwt: token
            };
        }
        return {
            authJwt: null
        };
    }
});