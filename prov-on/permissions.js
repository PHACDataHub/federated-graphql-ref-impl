import { shield, rule } from "graphql-shield";

const isAuthenticated = rule()((parent, args, context) => {
    if (context.claims) {
        return context.claims !== undefined;
    }
    return false;
});

// TODO: Add default deny rule
export default shield({
    Review: {
        id: isAuthenticated,
        rating: isAuthenticated,
        content: isAuthenticated,
        game: isAuthenticated,
        author: isAuthenticated,
    },
    Query: {
        reviews: isAuthenticated,
        review: isAuthenticated,
    },
});    