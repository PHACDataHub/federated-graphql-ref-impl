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
        age: canReadReviews,
        gender: canReadReviews,
        province: canReadReviews,
        status: canReadReviews,
        outbreak: canReadReviews,
    },
    Query: {
        cases: canReadReviews,
        case: canReadReviews,
    },
});    