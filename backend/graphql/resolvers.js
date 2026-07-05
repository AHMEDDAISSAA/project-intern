const Item = require('../models/Item');

const resolvers = {
  Query: {
    items: async () => await Item.find(),
    item: async (_, { id }) => await Item.findById(id),
  },
  Mutation: {
    addItem: async (_, { name }) => {
      const newItem = new Item({ name });
      await newItem.save();
      return newItem;
    },
    deleteItem: async (_, { id }) => {
      await Item.findByIdAndDelete(id);
      return "Item supprimé";
    },
  },
};

module.exports = resolvers;