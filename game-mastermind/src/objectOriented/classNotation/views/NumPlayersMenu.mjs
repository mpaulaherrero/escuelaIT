import { Option } from './Option.mjs'
import { Menu } from './Menu.mjs'

export class NumPlayersMenu extends Menu {

    constructor(console) {
        super("Number of Players", console);
        this.add(new Option("Machine VS Machine", 0));
        this.add(new Option("Machine VS Player", 1));
        this.add(new Option("Player VS Player", 2));
    }

    read() {
        this.interact();
        return this.getChoosedOptionValue()
    }
}