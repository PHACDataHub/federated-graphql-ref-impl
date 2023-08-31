import { shield, rule, and } from "graphql-shield";

const isAuthenticated = rule()((parent, args, context) => {
    if (context.claims) {
        return context.claims !== undefined;
    }
    return false;
});

const isManager = rule()((parent, args, context) => {
    if (context.claims) {
        return context.claims.role === "Manager";
    }
    return false;
});

// TODO: Add default deny rule
export default shield({
    Game: {
        id: isAuthenticated,
        title: isAuthenticated,
        platform: isAuthenticated,
        reviews: isAuthenticated,
    },
    Author: {
        id: isAuthenticated,
        name: isAuthenticated,
        verified: isAuthenticated,
        reviews: isAuthenticated,
    },
    Query: {
        games: isAuthenticated,
        game: isAuthenticated,
        authors: and(isAuthenticated, isManager),
        author: and(isAuthenticated, isManager),
    },
});    