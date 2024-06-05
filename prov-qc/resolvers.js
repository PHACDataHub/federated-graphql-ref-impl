import db from './_db.js';

export const resolvers = {
    Query: {
        outbreaks() {
            return db.authors;
        },
        outbreak(_, args) {
            return db.authors.find((author) => author.id === args.id);
        }
    },
    Author: {
        __resolveReference(ref) {
            return db.authors.find((author) => author.id === ref.id);
        },
        cases(author) {
            return author.reviews.map(id => ({ __typename: "Case", id }));
        }
    },
}