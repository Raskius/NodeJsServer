import { v4 as uuidv4 } from 'uuid';

export default class Command{

    private id: string;
    private name: string;
    private description: string;
    private examples: string[];
    private tags: string[];
    


    constructor(id: string = uuidv4(), name: string, description: string = "", examples: string[] = [], tags: string[] = []){
        this.id = id;
        this.name = name;
        this.description = description;
        this.examples = examples; // TODO Change this later to a map
        this.tags = tags; // Used to fetch commands by one or multiple tags
    }

    getId(): string{
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    getDescription(): string{
        return this.description;
    }

    setDescription(description: string) {
        this.description = description;
    }

    getExamples(): string[] {
        return this.examples;
    }

    setExamples(examples: string[]) {
        this.examples = examples;
    }

    getTags(): string[] {
        return this.tags;
    }

    setTags(tags: string[]) {
        this.tags = tags;
        
    }
    toString(){
        return `ID: ${this.id}\nName:\n ${this.name}\nDescription:\n ${this.description} \nExamples:\n ${this.examples}`
    }

    // Exclude ID when exporting
    toJSON() {
        return this;
    }
    // toJSON() {
    //     const { id, ...rest } = this;
    //     return rest;
    // }
    
    static serializeArray(commandsArray: Command[]) {
        return commandsArray.map(command => command.toJSON());
    }

    static deserializeArray(jsonString: string): Command[] {
        const jsonArray: Command[] = JSON.parse(jsonString);
        return jsonArray.map(obj => new Command(obj.id, obj.name, obj.description, obj.examples, obj.tags));
    }

    static containsCommand(commandsArray: Command[], command: Command){
        return commandsArray.some(i => i.name === command.name)
    }
}
