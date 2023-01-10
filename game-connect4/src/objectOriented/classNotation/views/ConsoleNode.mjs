import { Console } from 'console-mpds';
import { ConsoleView } from './ConsoleView.mjs'

export class ConsoleNode extends ConsoleView {
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