
export default class CommandService{

    constructor(commandRepository){
        this.commandRepository = commandRepository;
    }

    findAll(){
        return this.commandRepository.findAll();
    }

    findByName(name){
        return this.commandRepository.findByName(name);
    }

    findById(id){
        return this.commandRepository.findById(id);
    }

    deleteById(id){
        return this.commandRepository.deleteById(id);
    }

    save(name, description, examples, tags){
        return this.commandRepository.save(name, description, examples, tags)
    }


}