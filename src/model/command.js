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

    // Exclude ID when exporting
    toJSON() {
        const { id, ...rest } = this;
        return rest;
    }
    
    static serializeArray(commandsArray) {
        return commandsArray.map(command => command.toJSON());
    }

    static deserializeArray(jsonString) {
        const jsonArray = JSON.parse(jsonString);
        return jsonArray.map(obj => new Command(obj.name, obj.description, obj.examples, obj.tags));
    }

    static containsCommand(commandsArray, command){
        return commandsArray.some(i => i.name === command.name)
    }
}
