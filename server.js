import express from 'express';
import commandController from './src/controller/commandController.js'

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use the commandsController to handle command-related requests
app.use('/commands', commandController);

// Middleware to serve static files (e.g., HTML, CSS, client-side JavaScript)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
