import { DialogView } from './DialogView.mjs'
export class NumPlayersMenu {

    #options

    constructor(callback) {
        this.#options = document.createElement('p');
        let select = document.createElement('select');
        select.id = "numPlayers";
        select.autocomplete = "off";
        select.append(this.#getOption("Máquina VS IA", 0));
        select.append(this.#getOption("Jugador VS IA", 1, true));
        select.append(this.#getOption("Jugador VS Jugador", 2));
        this.#options.append(select);
        this.#options.append(this.#getButton("Empezar Juego", callback));
        document.getElementById('options').append(this.#options);
        
    }

    #getOption(text,value, selected=false){
        const option = document.createElement('option');
        option.value = value;
        option.innerText = text;
        if(selected){
            option.selected = true;
        }
        return option;
    }

    #getButton(text, callback){
        let button = document.createElement('button');
        button.innerText = text
        button.addEventListener('click', () => {
            DialogView.write(''); 
            callback();
        })
        return button;
    }

    read() {
        return parseInt(document.getElementById('numPlayers').value);
    }
}