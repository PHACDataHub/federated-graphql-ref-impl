import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Review @key(fields: "id") {
    id: ID!,
    age: Int!
    gender: String!
    province: String!
    status: String!
    outbreak: Author!
  }

  extend type Author @key(fields: "id") {
    id: ID! @external
    cases: [Review]
  }

  extend type Query {
    cases: [Review]
    case(id: ID!): Review
  }
`;