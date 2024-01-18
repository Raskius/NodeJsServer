import Command from '../model/command.js';
import { v4 as uuidv4 } from 'uuid';
import { importCommands, exportCommands } from '../utils/commandUtils.js';
export default class CommandRepository {
    constructor() {
        this.commands = importCommands();
    }
    findAll() {
        return this.commands;
    }
    findByName(name) {
        return this.commands.find(c => c.name === name);
    }
    findById(id) {
        return this.commands.find(c => c.id === id);
    }
    save(name, description, examples, tags) {
        const newCommand = new Command(uuidv4(), name, description, examples, tags);
        this.commands.push(newCommand);
        this.saveCommands();
        return newCommand;
    }
    deleteById(commandId) {
        this.commands = this.commands.filter(command => command.id !== commandId);
        this.saveCommands();
        return this.commands;
    }
    saveCommands() {
        try {
            exportCommands(this.commands);
        }
        catch (error) {
            console.error('Error saving commands:', error);
        }
    }
}
