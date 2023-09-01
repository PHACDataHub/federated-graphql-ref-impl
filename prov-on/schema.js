import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Review @key(fields: "id") {
    id: ID!,
    rating: Int!
    content: String!
    game: Game!
    author: Author!
  }

  extend type Game @key(fields: "id") {
    id: ID! @external
    reviews: [Review]
  }

  extend type Author @key(fields: "id") {
    id: ID! @external
    reviews: [Review]
  }

  extend type Query {
    reviews: [Review]
    review(id: ID!): Review
  }
`;