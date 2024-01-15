import express from 'express';

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Example data (in-memory storage for demonstration purposes)
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
