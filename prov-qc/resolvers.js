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
    Mutation: {
        deleteGame(_, args) {
            db.games = db.games.filter((g) => g.id !== args.id);
            return db.games
        },
        addGame(_, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString(),
            };
            db.games.push(game);
            return game;
        }
    },
    Game: {
        reviews(parent) {
            return  // TODO
        }
    },
    Author: {
        reviews(parent) {
            return  // TODO
        }
    },
}