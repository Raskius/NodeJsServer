import { v4 as uuidv4 } from 'uuid';

export default class Command{
    constructor(name, description = "", examples = ""){
        this.id = uuidv4();
        this.name = name;
        this.description = description;
        this.examples = examples; // TODO Change this later to a map
    }

    toString(){
        return `ID: ${this.id}, Name: ${this.name}, Description: ${this.description}`
    }

    static containsCommand(commandsArray, command){
        return commandsArray.some(i => i.name === command.name)
    }
}
