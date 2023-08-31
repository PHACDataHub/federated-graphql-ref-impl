import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Review {
    id: ID!,
    rating: Int!
    content: String!
    game: Game!
    author: Author!
  }

  extend type Query {
    reviews: [Review]
    review(id: ID!): Review
  }

  type Mutation {
  }
`;