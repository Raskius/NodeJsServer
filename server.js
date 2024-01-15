import express from 'express';
import itemController from './src/controller/itemController.js'

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use the itemsController to handle item-related requests
app.use('/items', itemController);

// Middleware to serve static files (e.g., HTML, CSS, client-side JavaScript)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
