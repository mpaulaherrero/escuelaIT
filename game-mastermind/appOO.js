const { Console } = require("console-mpds");
const console = new Console();

initMastermind().play();

function initMastermind() {
    const that = {
         askContinue(){
             let error;
             let answer;
             do {
               answer = console.readString(`Do you want to continue? (y/n): `);
               error = answer !== `y` && answer !== `n`;
               if (error) {
                 console.writeln(`Please, reply "y" or "n"`);
               }
             } while (error);
             return answer === `y`;
         }
    }
    return {
         play(){
             do {
                 initGame().play();
             } while (that.askContinue());
         }
     }
 }

function initGame(){
    const that = {
        STATES: { PLAYER_LOOSE: 0, PLAYER_WIN: 1, PLAYER_IN_GAME: 2 },
        STATES_MESSAGE: ["You've lost!!! :-(", "You've won!!! ;-)","You're playing"],
        MAX_ATTEMPTS: 10,
        state: 2,
        attemptsResult: [],
        
        proposedCombination: initProposedCombination(),
        secretCombination: initSecretCombination(),
        board: initBoard(),
        
        readProposeCombination(){
            let correctProposedCombination;
            do {
                this.proposedCombination.setValue(this.board.readProposeCombination());
                const errors = this.proposedCombination.checkErrors();
                correctProposedCombination = errors.length === 0;
                if (!correctProposedCombination) {
                   this.board.printErrors(errors);
                }
            } while (!correctProposedCombination);
        },
        checkProposedCombination(){
            this.proposedCombination.compareSecretCombination(this.secretCombination);
        },
        addLastAttemptResult(){
            this.attemptsResult[this.attemptsResult.length] = this.proposedCombination.getResult();
        },
        checkEndGame(){
            if (this.proposedCombination.isWinner()) {
                this.state = this.STATES.PLAYER_WIN
            } else if (this.attemptsResult.length === this.MAX_ATTEMPTS) {
                this.state  = this.STATES.PLAYER_LOOSE;
            } else{
                this.state = this.STATES.PLAYER_IN_GAME;
            }
            return this.state !== this.STATES.PLAYER_IN_GAME;
        },
        getEndGameMessage(){
            return this.STATES_MESSAGE[this.state];
        }
    }

    return {
        play(){
            that.board.welcome();
            do {
                that.board.showResults(that.attemptsResult);
                that.readProposeCombination();
                that.checkProposedCombination();
                that.addLastAttemptResult();
            } while (!that.checkEndGame());
            that.board.showResults(that.attemptsResult);
            that.board.farewell(that.getEndGameMessage());
        }
    }
}

function initCombination(){
    const that = {
       COMBINATION_LENGHT: 4,
       value: "",

       colors: initColors()

    }
    return {
        getLenght(){
            return that.COMBINATION_LENGHT;
        },
        setValue(value){
            that.value=value;
        },
        getValue(){
            return that.value;
        },
        validateLenght(){
            return that.COMBINATION_LENGHT !== that.value.length;
        },
        validateColors() {
            let validColor = true;
            for (let i = 0; validColor && i < that.value.length; i++) {
              validColor = that.colors.validColor(that.value[i]);
            }
            return validColor;
        },
        validateUniqueColors() {
            let uniqueColor = true;
            for (let i = 0; uniqueColor && i < that.value.length; i++) {
              for (let j = i + 1; uniqueColor && j < that.value.length; j++) {
                uniqueColor = that.value[j] !== that.value[i];
              }
            }
            return uniqueColor;
        },
        hasColor(color){
            for (let i = 0; i < that.value.length; i++) {
                if (that.value[i] === color) {
                  return true;
                }
            }
            return false;
        },
        getRandomColor(){
            return that.colors.getRandomColor();
        },
        getColorsString(){
            return that.colors.getString();
        }
    }
}

function initSecretCombination(){
    const that = {
        combination: initCombination(),
        generate(){
            for (let i = 0; i < this.combination.getLenght(); i++) {
                let uniqueColor;
                 do {
                    let randomColor = this.combination.getRandomColor();
                    let originalValue = this.combination.getValue();
                    this.combination.setValue(originalValue + randomColor);
                    uniqueColor = this.combination.validateUniqueColors();
                    if (!uniqueColor) {
                        this.combination.setValue(originalValue);
                    }
                } while (!uniqueColor);
            }
        }
    }
    that.generate();
    console.writeln(`The secret combination is ${that.combination.getValue()}`);
    return that.combination;
}

function initProposedCombination(){
    const that = {
        combination: initCombination(),
        blacks: 0,
        whites: 0,
        isWinner: false
    }
    
    return {
        setValue(value){
            that.combination.setValue(value);
        },
        checkErrors(){
            let errors = [];
            if (that.combination.validateLenght()) {
                errors[errors.length] = `Wrong proposed combination length`;
            }
            if (!that.combination.validateColors()) {
                errors[errors.length] = `Wrong colors, they must be: ${that.combination.getColorsString()}`;
            }
            if (!that.combination.validateUniqueColors()) {
                errors[errors.length] = `Wrong proposed combination, at least one color is repeated`;
            }
            return errors;
        },
        compareSecretCombination(secretCombination){
            that.blacks = 0;
            that.whites = 0;
            for (let i = 0; i < that.combination.getLenght(); i++) {
                if (secretCombination.getValue()[i] === that.combination.getValue()[i]) {
                    that.blacks++;
                } else {
                    if (secretCombination.hasColor(that.combination.getValue()[i])) {
                        that.whites++;
                    }
                }
            }
            that.isWinner = that.blacks === that.combination.getLenght();
        },
        isWinner(){
            return that.isWinner;
        },
        getResult(){
            return `${that.combination.getValue()} --> ${that.blacks} blacks and ${that.whites} whites`;
        }
    }
}

function initColors(){
    const that = {
        COLORS: "rgybmc"
    }    

    return {
        getRandomColor(){
            return that.COLORS[parseInt(Math.random() * that.COLORS.length)];
        },
        validColor(color){
            for (let i = 0; i < that.COLORS.length; i++) {
                if (that.COLORS[i] === color) {
                  return true;
                }
            }
            return false;
        },
        getString(){
            return that.COLORS;
        }
    }
}

function initBoard(){
    return {
        welcome(){
            console.writeln(`----- MASTERMIND -----`);
        },
        showResults(attemptsResult){
            console.writeln(`\n${attemptsResult.length} attempt(s):\n****`);
            for (let i = 0; i < attemptsResult.length; i++) {
                console.writeln(attemptsResult[i]);
            }
        },
        readProposeCombination(){
            return console.readString(`Propose a combination: `)
        },
        printErrors(errors){
            for (let i = 0; i < errors.length; i++) {
                console.writeln(errors[i]);
            }
        },
        farewell(resultMessage){
            console.writeln(resultMessage);
        }
    }
}
