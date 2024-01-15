import express from 'express';
import Item from '../model/item.js';

const router = express.Router();


// Example data (in-memory storage for demonstration purposes)
const item1 = new Item('Item 1')
const item2 = new Item('Item 2')
const item3 = new Item('Item 3')
let items = [item1, item2, item3];


// Get all items
router.get('/items', (req, res) => {
  res.json(items);
});


// Get a specific item by ID
router.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const item = items.find((item) => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});


// Create a new item
router.post('/items', (req, res) => {
  const hasItem = Item.containsName(items, req.body)

  if (hasItem) {
    res.status(400).json({ error: `There is already an item with name: \'${req.body.name}\'` })
    return;
  }

  const newItem = new Item(req.body.name);
  items.push(newItem)
  res.status(201).json({ message: `Created request ${newItem}!` });
})


// Delete the item given the ID
router.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id == req.params.id);
  
  if (itemIndex == -1) {
    res.status(400).json({ error: `Could not find an item with id: '${req.params.id}'` });
    return;
  }

  // Delete the item from the array
  items.splice(itemIndex, 1);
  res.status(200).json({ message: `Item '${req.params.id}' successfully deleted.` });
});


export default router;