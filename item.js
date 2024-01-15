import { v4 as uuidv4 } from 'uuid';

export default class Item{
    constructor(name){
        this.id = uuidv4();
        this.name = name;
    }

    toString(){
        return `ID: ${this.id}, Name: ${this.name}`
    }

    static containsName(itemsArray, item){
        return itemsArray.some(i => i.name === item.name)
    }
}
