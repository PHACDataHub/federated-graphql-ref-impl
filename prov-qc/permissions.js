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
    Review: {
        id: isAuthenticated,
        rating: isAuthenticated,
        content: isAuthenticated,
        game: isAuthenticated,
        author: and(isAuthenticated, isManager),
    },
    Author: {
        id: isAuthenticated,
        name: isAuthenticated,
        verified: isAuthenticated,
        reviews: isAuthenticated,
    },
    Query: {
        reviews: isAuthenticated,
        review: isAuthenticated,
        games: isAuthenticated,
        game: isAuthenticated,
        authors: and(isAuthenticated, isManager),
        author: and(isAuthenticated, isManager),
    },
    Mutation: {
        deleteGame: isAuthenticated,
        addGame: isAuthenticated,
    },
});    