const { Schema, model, } = require('mongoose');

const ShoppingListEntrySchema = Schema({
    what_to_buy: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },

})

module.exports = model('ShoppingListEntry', shoppingListEntrySchema)