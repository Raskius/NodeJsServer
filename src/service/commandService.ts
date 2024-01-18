import CommandRepository from "../repository/commandRepository";

export default class CommandService{

    private commandRepository;

    constructor(commandRepository: CommandRepository){
        this.commandRepository = commandRepository;
    }

    findAll(){
        return this.commandRepository.findAll();
    }

    findByName(name: string){
        return this.commandRepository.findByName(name);
    }

    findById(id: string){
        return this.commandRepository.findById(id);
    }

    deleteById(id: string){
        return this.commandRepository.deleteById(id);
    }

    save(name: string, description: string, examples: string[], tags: string[]){
        return this.commandRepository.save(name, description, examples, tags)
    }


}