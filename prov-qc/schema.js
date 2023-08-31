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

  extend type Query {
    games: [Game]
    game(id: ID!): Game
    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    deleteGame(id: ID!): [Game]
    addGame(game: AddGameInput!): Game
  }

  input AddGameInput {
    title: String!,
    platform: [String!]!
  }
`;