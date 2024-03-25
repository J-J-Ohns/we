const express = require('express');
const ShoppingList = require('../models/shoppingList1');
const ShoppingListEntry = require('../models/shoppingListEntry1');
 
const router = express.Router()
 
router.get('/:id', async (req, res) => {
    const { id } = req.params;
 
    try {
        const shoppingList = await ShoppingList.findOne({ userId: id }); //async function
 
        if (!shoppingList) {
            return res.status(404).json({ error: 'The id does not exist.' });
        }
 
        res.json({ id: shoppingList.userId, entries: shoppingList.entries });
    } catch (error) {
        console.error('Error retrieving shopping list:', error);
        res.status(500).send('Internal Server Error');
    }
});
 
router.post('/', async (req, res) => {
    const { id, list } = req.body

    let shoppingList = await shoppingListForId(id)
    if (shoppingList) {
        res.status(409).send('ID already exists')
        return
    }

    shoppingList = await createShoppingList(id)
    if (!shoppingList) {
        res.status(400).send('The request contains invalid data')
        return
    }

    const newEntriesIds = await createEntries(list)
    if (newEntriesIds.length === 0) {
        await ShoppingList.deleteOne({ userId: id })
        res.status(400).send('The request contains invalid data')
        return
    }

    await addEntriesToShoppingList(newEntriesIds, shoppingList)

    res.send(`Shopping list for ${id} created successfully`)
})

async function shoppingListForId(id) {
    return await ShoppingList.findOne({ userId: id })
}

async function createShoppingList(id) {
    try {
        return await ShoppingList.create({ userId: id, entries: [] })
    } catch (error) {
        console.log(error)
        return null
    }
}

async function createEntries(list) {
    const entries = []

    try {
        for (const element of list.split(',').map(elem => elem.trim())) {
            const entry = await ShoppingListEntry.create({ what_to_buy: element })
            entries.push(entry._id)
        }
    } catch ({ message }) {
        console.error(message)
    }

    return entries
}

async function addEntriesToShoppingList(entriyIds, shoppinglist) {
    entriyIds.forEach(entryId => shoppinglist.entries.push(entryId))
    await shoppinglist.save()
}
module.exports = router 