import Command from "../model/command.js";
import fs from 'fs';

export function exportCommands(commandsArray: Command[]): void {
    const jsonCommands = JSON.stringify(Command.serializeArray(commandsArray), null, 2); // 2 spaces for indentation

    // Write the JSON string to a file named commands.json
    fs.writeFileSync('commands.json', jsonCommands);
}

export function importCommands(): Command[] {
    const fileName = 'commands.json'
    try {
        const jsonString: string = fs.readFileSync(fileName, 'utf8');
        const loadedCommands: Command[] = Command.deserializeArray(jsonString);
    
        // Now 'loadedCommands' is an array containing instances of the Command class
        // console.log(loadedCommands);
        return loadedCommands;
    } catch (error) {
        console.error(`Error reading or parsing ${fileName}: ${(error as Error).message}`);
        return [];
    }
}