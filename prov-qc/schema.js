import { gql } from 'graphql-tag';

export const typeDefs = gql`

  type Author @key(fields: "id") {
    id: ID!
    pathogen: String!
    alert_issued: Boolean!
    cases: [Review!]
  }

  extend type Review @key(fields: "id") {
    id: ID! @external
    outbreak: Author
  }

  extend type Query {
    outbreaks: [Author]
    outbreak(id: ID!): Author
  }
`;