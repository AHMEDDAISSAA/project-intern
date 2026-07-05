const typeDefs = `#graphql
  type Item {
    id: ID!
    name: String!
  }

  type Query {
    items: [Item]
    item(id: ID!): Item
  }

  type Mutation {
    addItem(name: String!): Item
    deleteItem(id: ID!): String
  }
`;

module.exports = typeDefs;