import express from 'express';
import Command from '../model/command.js';
import { importCommands, exportCommands } from '../utils/commandUtils.js';

const router = express.Router();


// Example data (in-memory storage for demonstration purposes)
const command1 = new Command('ls', 'List information about the FILEs', [], [])
const command2 = new Command('cd', 'Change the shell working directory')
const command3 = new Command('grep', 'Search for PATTERN in each FILE or standard input')
let commandsHardcoded = [command1, command2, command3];
let commands = importCommands();
if(commands.length == 0){
  commands = commandsHardcoded;
}

exportCommands(commands);

// Get all commands
router.get('/', (req, res) => {
  res.json(commands);
});


// Get a specific command by ID
router.get('/:id', (req, res) => {
  const commandId = req.params.id;
  const command = commands.find((command) => command.id === commandId);

  if (command) {
    res.json(command);
  } else {
    res.status(404).json({ message: 'Command not found' });
  }
});


// Create a new command
router.post('/', (req, res) => {
  const hasCommand = Command.containsCommand(commands, req.body)

  if (hasCommand) {
    res.status(400).json({ error: `There is already a command with name: \'${req.body.name}\'` })
    return;
  }

  const newCommand = new Command(req.body.name, req.body.description, req.body.examples);
  commands.push(newCommand)
  res.status(201).json({ message: `Created request '${newCommand}'` });
})


// Delete the command given the ID
router.delete('/:id', (req, res) => {
  const commandIndex = commands.findIndex(i => i.id == req.params.id);
  
  if (commandIndex == -1) {
    res.status(400).json({ error: `Could not find an command with id: '${req.params.id}'` });
    return;
  }

  // Delete the command from the array
  commands.splice(commandIndex, 1);
  res.status(200).json({ message: `Command '${req.params.id}' successfully deleted.` });
});


export default router;