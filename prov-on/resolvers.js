import db from './_db.js';

export const resolvers = {
    Query: {
        reviews() {
            return db.reviews;
        },
        review(_, args) {
            return db.reviews.find((review) => review.id === args.id);
        },
    },
    Mutation: {

    },
    Review: {
        author(parent) {
            return // TODO 
        },
        game(parent) {
            return // TODO 
        }
    }
}