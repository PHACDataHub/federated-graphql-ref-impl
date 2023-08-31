import { shield, rule, and } from "graphql-shield";

const canReadReviews = rule()((parent, args, context) => {
    if (!context.claims) {
        return false;
    }
    if (!("prov-on" in context.claims)) {
        return false;
    }
    if (context.claims["prov-on"].reviews) {
        return context.claims["prov-on"].reviews.includes("read");
    }
    return false;
});

// TODO: Add default deny rule
export default shield({
    Review: {
        id: canReadReviews,
        rating: canReadReviews,
        content: canReadReviews,
        game: canReadReviews,
        author: canReadReviews,
    },
    Query: {
        reviews: canReadReviews,
        review: canReadReviews,
    },
});    