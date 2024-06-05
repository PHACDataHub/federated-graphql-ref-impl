import db from './_db.js';

export const resolvers = {
    Author: {
        reviews(author) {
            return db.reviews.filter((review) => review.author_id === author.id);
        }
    },
    Query: {
        cases() {
            return db.reviews;
        },
        case(_, args) {
            return db.reviews.find((review) => review.id === args.id);
        },
    },
    Review: {
        __resolveReference(ref) {
            return db.reviews.find((review) => review.id === ref.id);
        },
        outbreak(review) {
            return review.author.map(id => ({ __typename: "Outbreak", id }));
        }
    }
}