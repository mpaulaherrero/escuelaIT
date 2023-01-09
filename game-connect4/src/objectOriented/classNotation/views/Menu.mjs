export class Menu {
    #console
    #title
    #options
    #answer

    constructor(title, console) {
        this.#title = title;
        this.#options = [];
        this.#console = console;
    }

    add(option) {
        this.#options.push(option);
    }

    interact() {
        this.show();
        this.execChoosedOption();
    }

    show() {
        this.#showTitle();
        for (let i = 0; i < this.#options.length; i++) {
            this.#console.writeln((i+1) + ". " + this.#options[i].getTitle());
        }
    }

    #showTitle() {
        let string = "\n" + this.#title + "\n";
        for (let i = 0; i < this.#title.length; i++) {
            string += "-";
        }
        this.#console.writeln(string);
    }

    execChoosedOption() {
        let ok;
        do {
            this.#answer = this.#readInt("Escoge una opción [1-" + this.#options.length + "]: ") - 1;
            ok = 0 <= this.#answer && this.#answer <= this.#options.length - 1;
            if (!ok) {
                this.#console.writeln("¡Error! la opción debe ser un número entre [1-" + this.#options.length + "]");
            }
        } while (!ok);
        this.#console.writeln("");
    }

    #readInt(prompt){
        return Number.parseInt(this.#console.readNumber(prompt));
    }

    getChoosedOptionValue(){
        return this.#options[this.#answer].getValue();
    }
}
