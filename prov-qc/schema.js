import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Game @key(fields: "id") {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
  }

  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }

  extend type Review @key(fields: "id") {
    id: ID! @external
    author: Author
    game: Game
  }

  extend type Query {
    games: [Game]
    game(id: ID!): Game
    authors: [Author]
    author(id: ID!): Author
  }
`;