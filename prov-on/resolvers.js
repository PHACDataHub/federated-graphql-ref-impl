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
        __resolveReference(ref) {
            return db.reviews.find((review) => review.id === ref.id);
        },
        author(review) {
            return review.author.map(id => ({ __typename: "Author", id }));
        },
        game(review) {
            return review.game.map(id => ({ __typename: "Game", id }));
        }
    }
}