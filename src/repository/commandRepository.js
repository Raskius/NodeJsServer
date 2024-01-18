import { importCommands, exportCommands } from '../utils/commandUtils.js';

export default class commandRepository {

    findAll() {
        return importCommands();
    }

    findByName(name){
        let commands = importCommands();
        return commands.find(c => c.name === name) || undefined;
    }
    
    findById(id){
        let commands = importCommands();
        return commands.find(c => c.id === id) || undefined;
    }
    
    save(command){
        let commands = this.findAll();
        commands.push(command);
        exportCommands(commands);
        return true;
    }
    
    deleteById(commandId){
        let commands = importCommands();
        let commandsFiltered = commands.filter(command => command.id !== commandId);
        exportCommands(commandsFiltered);
        return true;
    }

}