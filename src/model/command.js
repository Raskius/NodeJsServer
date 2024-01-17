import { v4 as uuidv4 } from 'uuid';

export default class Command{
    constructor(name, description = "", examples = [], tags=[]){
        this.id = uuidv4();
        this.name = name;
        this.description = description;
        this.examples = examples; // TODO Change this later to a map
        this.tags = tags; // Used to fetch commands by one or multiple tags
    }

    toString(){
        return `ID: ${this.id}\nName:\n ${this.name}\nDescription:\n ${this.description} \nExamples:\n ${this.examples}`
    }

    static containsCommand(commandsArray, command){
        return commandsArray.some(i => i.name === command.name)
    }
}
