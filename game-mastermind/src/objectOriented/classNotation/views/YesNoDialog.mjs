export class YesNoDialog {
    #question
    #answer
    #console

    constructor(question, console){
        this.#question = question;
        this.#answer = ``;
        this.#console = console;

    }
    
    read() {
        let error = false;
        do {
            this.#answer = this.#console.readString(this.#question);
            error = !this.isAffirmative() && !this.isNegative();
            if (error) {
                this.#console.writeln(`Please, reply "y" or "n"`);
            }
        } while (error);
    }    

    isAffirmative() {
        return this.#answer === `y`;
    }
    isNegative() {
        return this.#answer === `n`;
    }
}    