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
                this.#console.writeln(`Por favor, responda "si" o "no"`);
            }
        } while (error);
    }    

    isAffirmative() {
        return this.#answer === `si`;
    }
    isNegative() {
        return this.#answer === `no`;
    }
}    