import Command from '../model/command.js';
import { v4 as uuidv4 } from 'uuid';
import { importCommands, exportCommands } from '../utils/commandUtils.js';

export default class CommandRepository {
  private commands: Command[];

  constructor() {
    this.commands = importCommands();
  }

  private updateCommands(){
    this.commands = importCommands();
  }

  findAll(): Command[] {
    this.updateCommands();
    return this.commands;
  }

  findByName(name: string): Command | undefined {
    this.updateCommands();
    return this.commands.find(c => c.getName() === name);
  }

  findById(id: string): Command | undefined {
    this.updateCommands();
    return this.commands.find(c => c.getId() === id);
  }

  save(name: string, description: string, examples: string[], tags: string[]): Command {
    const newCommand = new Command(uuidv4(), name, description, examples, tags);
    this.commands.push(newCommand);
    this.saveCommands();
    return newCommand;
  }

  edit(id: string, name: string, description: string, examples: string[], tags: string[]): Command {

    const existingCommandIndex = this.commands.findIndex(command => command.getId() === id);

    // Command with the given ID already exists, update it
    let command = this.commands[existingCommandIndex];
    name !== undefined && command.setName(name);
    description !== undefined && command.setDescription(description);
    examples !== undefined && command.setExamples(examples);
    tags !== undefined && command.setTags(tags);

    this.saveCommands();
    return command;
  }

  deleteById(commandId: string): Command[] {
    this.commands = this.commands.filter(command => command.getId() !== commandId);
    this.saveCommands();
    return this.commands;
  }

  // Saves commands in 'commands.json' in root directory
  private saveCommands(): void {
    try {
      exportCommands(this.commands);
    } catch (error) {
      console.error('Error saving commands:', error);
    }
  }
}
