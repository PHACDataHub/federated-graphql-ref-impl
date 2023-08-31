import db from './_db.js';

export const resolvers = {
    Query: {
        games() {
            return db.games;
        },
        game(_, args) {
            return db.games.find((game) => game.id === args.id);
        },
        authors() {
            return db.authors;
        },
        author(_, args) {
            return db.authors.find((author) => author.id === args.id);
        }
    },
    Game: {
        __resolveReference(ref) {
            return db.games.find((game) => game.id === ref.id);
        },
        reviews(game) {
            return game.reviews.map(id => ({ __typename: "Review", id }));
        }
    },
    Author: {
        __resolveReference(ref) {
            return db.authors.find((author) => author.id === ref.id);
        },
        reviews(author) {
            return author.reviews.map(id => ({ __typename: "Review", id }));
        }
    },
}