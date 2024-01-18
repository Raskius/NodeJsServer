import express from 'express';
import CommandController from './src/controller/commandController.js';
import CommandRepository from './src/repository/commandRepository.js';
import CommandService from './src/service/commandService.js';
const app = express();
const port = 3000;
// Middleware to parse JSON requests
app.use(express.json());
// Create instances of CommandRepository and CommandService
const commandRepository = new CommandRepository();
const commandService = new CommandService(commandRepository);
// Create an instance of CommandController with CommandService
const commandController = new CommandController(commandService);
app.get('/commands', (req, res) => commandController.getAllCommands(req, res));
app.get('/commands/:id', (req, res) => commandController.getCommandById(req, res));
app.post('/commands', (req, res) => commandController.createCommand(req, res));
app.delete('/commands/:id', (req, res) => commandController.deleteCommand(req, res));
app.put('/commands/:id', (req, res) => commandController.editCommand(req, res));
// // Use the commandsController to handle command-related requests
// app.use('/commands', commandController);
// Middleware to serve static files (e.g., HTML, CSS, client-side JavaScript)
app.use(express.static('public'));
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
