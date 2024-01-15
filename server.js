import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Item from './item.js';

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Example data (in-memory storage for demonstration purposes)
const item1 = new Item('Item 1')
const item2 = new Item('Item 2')
const item3 = new Item('Item 3')
let items = [item1, item2, item3];

// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Get a specific item by ID
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.post('/items', (req, res) => {
  const hasItem = Item.containsName(items, req.body)
  if (hasItem) {
    res.status(400).json({ error: `There is already an item with name: \'${req.body.name}\'`})
    return;
  }
  const newItem = createRequest(req.body.name);
  items.push(newItem)
  res.status(201).json({ message: `Created request ${newItem}!` });


  function createRequest(name) {
    return new Item(name);
  }

})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
