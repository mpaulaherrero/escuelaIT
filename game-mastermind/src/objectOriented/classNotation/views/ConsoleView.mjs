import { Console } from 'console-mpds';

export class ConsoleView {
    #console = new Console()

    writeln(text){
        this.#console.writeln(text); 
    }

    readString(question){
        return this.#console.readString(question); 
    }

    readNumber(question){
        return this.#console.readNumber(question); 
    }
}    