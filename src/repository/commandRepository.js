import Command from '../model/command.js';
import { v4 as uuidv4 } from 'uuid';
import { importCommands, exportCommands } from '../utils/commandUtils.js';
export default class CommandRepository {
    constructor() {
        this.commands = importCommands();
    }
    updateCommands() {
        this.commands = importCommands();
    }
    findAll() {
        this.updateCommands();
        return this.commands;
    }
    findByName(name) {
        this.updateCommands();
        return this.commands.find(c => c.getName() === name);
    }
    findById(id) {
        this.updateCommands();
        return this.commands.find(c => c.getId() === id);
    }
    save(name, description, examples, tags) {
        const newCommand = new Command(uuidv4(), name, description, examples, tags);
        this.commands.push(newCommand);
        this.saveCommands();
        return newCommand;
    }
    edit(id, name, description, examples, tags) {
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
    deleteById(commandId) {
        this.commands = this.commands.filter(command => command.getId() !== commandId);
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
