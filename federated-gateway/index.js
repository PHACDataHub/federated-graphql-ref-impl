import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';

const PORT = 4000;

// Environment variables
const JWT_VERIFY_SECRET = process.env.JWT_VERIFY_SECRET || "changeme"
const prov_qc_url = process.env.QC_URL
const prov_on_url = process.env.ON_URL

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
                //url: "http://localhost:4001"
                url: prov_qc_url
            },
            {
                name: "prov-on",
                //url: "http://localhost:4002"
                url: prov_on_url
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
        host: '0.0.0.0',
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