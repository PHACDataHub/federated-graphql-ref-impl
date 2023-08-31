import { shield, rule, deny } from "graphql-shield";

const isAuthenticated = rule()((parent, args, context) => {
    return context.claims !== undefined;
});

// TODO: Add default deny rule
export default shield({
    Query: {
        games: isAuthenticated,
    }
});    