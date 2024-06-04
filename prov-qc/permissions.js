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
    Author: {
        id: isManager,
        pathogen: isManager,
        alert_issued: isManager,
        date_of_reporting: isManager,
        cases: isManager,
    },
    Query: {
        outbreaks: isManager,
        outbreak: isManager,
    },
});    