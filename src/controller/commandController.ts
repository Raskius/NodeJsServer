import { Request, Response } from 'express';
import Command from '../model/command.js';
import CommandService from '../service/commandService.js';

export default class CommandController {

  private commandService: CommandService;

  constructor(commandService: CommandService) {
    this.commandService = commandService;
  }

  getAllCommands(req: Request, res: Response) {
    const commands: Command[] = this.commandService.findAll();
    res.json(commands);
  }

  getCommandById(req: Request, res: Response) {
    const commands = this.commandService.findAll();
    const commandId = req.params.id;
    const command = commands.find((command) => command.getId() === commandId);

    if (command) {
      res.json(command);
    } else {
      res.status(404).json({ message: 'Command not found' });
    }
  }

  createCommand(req: Request, res: Response) {
    const {name, description, examples} = req.body;
    const command = this.commandService.findByName(name);
    
    if(command !== undefined){
      res.status(400).json({ error: `A command with that name already exists: '${name}'` });
      return;
    }
    const newCommand = this.commandService.save(name, description, examples, []);
    res.status(201).json({ message: `Command '${newCommand.getName()}' created successfully` });
  }

  deleteCommand(req: Request, res: Response) {
    const command = this.commandService.findById(req.params.id);
    if(!command){
      res.status(400).json({ error: `Could not find a command with id: '${req.params.id}'` });
      return;
    }
    this.commandService.deleteById(command.getId());
    res.status(200).json({ message: `Command '${command.getName()}' successfully deleted.` });
  }

  editCommand(req: Request, res: Response) {
    let commandId = req.params.id;
    const command = this.commandService.findById(commandId);

    const {name, description, examples, tags} = req.body;
    if(command === undefined){
      res.status(400).json({ error: `A command with that id does not exist: '${commandId}'` });
      return;
    }

    const newCommand = this.commandService.edit(commandId, name, description, examples, tags);
    res.status(201).json({ message: `Command '${newCommand.getName()}' updated successfully` });
  }
  
}