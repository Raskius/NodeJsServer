import CommandRepository from "../repository/commandRepository";
import Command from "../model/command.js";
export default class CommandService{

    private commandRepository;

    constructor(commandRepository: CommandRepository){
        this.commandRepository = commandRepository;
    }

    findAll(): Command[] {
        return this.commandRepository.findAll();
    }

    findByName(name: string): Command | undefined {
        return this.commandRepository.findByName(name);
    }

    findById(id: string): Command | undefined {
        return this.commandRepository.findById(id);
    }

    deleteById(id: string){
        return this.commandRepository.deleteById(id);
    }

    save(name: string, description: string, examples: string[], tags: string[]){
        return this.commandRepository.save(name, description, examples, tags)
    }


}