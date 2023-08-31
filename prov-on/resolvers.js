import db from './_db.js';

export const resolvers = {
    Author: {
        reviews(author) {
            return db.reviews.filter((review) => review.author_id === author.id);
        }
    },
    Game: {
        reviews(game) {
            return db.reviews.filter((review) => review.game_id === game.id);
        }
    },
    Query: {
        reviews() {
            return db.reviews;
        },
        review(_, args) {
            return db.reviews.find((review) => review.id === args.id);
        },
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