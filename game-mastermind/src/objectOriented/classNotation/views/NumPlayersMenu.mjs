import { Option } from '../types/Option.mjs'
import { Menu } from '../types/Menu.mjs'

export class NumPlayersMenu extends Menu {

    constructor(console) {
        super("Número de Jugadores", console);
        this.add(new Option("Máquina VS Jugador", 0));
        this.add(new Option("Jugador VS Jugador", 1));
    }

    read() {
        this.interact();
        return this.getChoosedOptionValue()
    }
}