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

  deleteById(commandId: string): Command[] {
    this.commands = this.commands.filter(command => command.getId() !== commandId);
    this.saveCommands();
    return this.commands;
  }

  private saveCommands(): void {
    try {
      exportCommands(this.commands);
    } catch (error) {
      console.error('Error saving commands:', error);
    }
  }
}
