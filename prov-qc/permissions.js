import { shield, rule, and } from "graphql-shield";

const isManager = rule()((parent, args, context) => {
    if (!context.claims) {
        return false;
    }
    if ("prov-qc" in context.claims) {
        return context.claims["prov-qc"].role === "Manager";
    }
    return false;
});


// TODO: Add default deny rule
export default shield({
    Game: {
        id: isManager,
        title: isManager,
        platform: isManager,
        reviews: isManager,
    },
    Author: {
        id: isManager,
        name: isManager,
        verified: isManager,
        reviews: isManager,
    },
    Query: {
        games: isManager,
        game: isManager,
        authors: isManager,
        author: isManager,
    },
});    