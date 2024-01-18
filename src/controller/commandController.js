import express from 'express';
import Command from '../model/command.js';
import { importCommands, exportCommands } from '../utils/commandUtils.js';

export default class CommandController {

  constructor(commandService) {
    this.commandService = commandService;
  }

  getAllCommands(req, res) {
    const commands = this.commandService.findAll();
    res.json(commands);
  }

  getCommandById(req, res) {
    const commands = this.commandService.findAll();
    const commandId = req.params.id;
    const command = commands.find((command) => command.id === commandId);

    if (command) {
      res.json(command);
    } else {
      res.status(404).json({ message: 'Command not found' });
    }
  }

  createCommand(req, res) {
    const commands = this.commandService.findAll();
    const hasCommand = Command.containsCommand(commands, req.body);

    if (hasCommand) {
      res.status(400).json({ error: `There is already a command with name: '${req.body.name}'` });
      return;
    }

    const newCommand = new Command(req.body.name, req.body.description, req.body.examples);
    commands.push(newCommand);
    exportCommands(commands);
    res.status(201).json({ message: `Created request '${newCommand}'` });
  }

  deleteCommand(req, res) {
    const command = this.commandService.findById(req.params.id);
    if(!command){
      res.status(400).json({ error: `Could not find a command with id: '${req.params.id}'` });
      return;
    }
    console.error(command)
    this.commandService.deleteById(command.id);
    res.status(200).json({ message: `Command '${req.params.id}' successfully deleted.` });
  }
}