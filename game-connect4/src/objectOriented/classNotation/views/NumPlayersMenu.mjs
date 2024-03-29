import { Option } from './Option.mjs'
import { Menu } from './Menu.mjs'

export class NumPlayersMenu extends Menu {

    constructor(console) {
        super("Número de Jugadores", console);
        this.add(new Option("Máquina VS IA", 0));
        this.add(new Option("Jugador VS IA", 1));
        this.add(new Option("Jugador VS Jugador", 2));
    }

    read() {
        this.interact();
        return this.getChoosedOptionValue()
    }
}