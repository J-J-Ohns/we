const { Schema, model, SchemaTypes } = require('mongoose')
 
const shoppingListSchema = new Schema({
    userId: {
        type: String,
        lowercase: true,
        required: true,
        immutable: true,
        validate: {
            validator: value => Number.isInteger(Number(value)) && value.length === 2,
        },
    },
    entries: {
        type: SchemaTypes.ObjectId,
        ref: 'ShoppingListEntry1',
    }

})
 
module.exports = model('ShoppingList', shoppingListSchema)
