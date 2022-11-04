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
        
        attempt: initAttempt(),
        secretCombination: initSecretCombination(),
        board: initBoard(),
        
        readAttemptProposeCombination(){
            let correctProposedCombination;
            do {
                this.attempt.setProposedCombinationValue(this.board.readProposeCombination());
                const errors = this.attempt.checkProposedCombinationErrors();
                correctProposedCombination = errors.length === 0;
                if (!correctProposedCombination) {
                   this.board.printErrors(errors);
                }
            } while (!correctProposedCombination);
        },
        checkAttemptProposedCombination(){
            this.attempt.checkProposedCombination(this.secretCombination);
        },
        addLastAttemptResult(){
            this.attemptsResult[this.attemptsResult.length] = this.attempt.getResult();
        },
        checkEndGame(){
            if (this.attempt.isWinner()) {
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
                that.readAttemptProposeCombination();
                that.checkAttemptProposedCombination();
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
        combination: initCombination()
    }
    
    return {
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
        setValue(value){
            that.combination.setValue(value);
        },
        getValue(){
            return that.combination.getValue();
        },
        getLenght(){
            return that.combination.getLenght();
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

function initAttempt(){
    const that = {
        proposedCombination: initProposedCombination(),
        blacks: 0,
        whites: 0
    }
    return {
        checkProposedCombination(secretCombination){
            for (let i = 0; i < that.proposedCombination.getLenght(); i++) {
                if (secretCombination.getValue()[i] === that.proposedCombination.getValue()[i]) {
                    that.blacks++;
                } else {
                    if (secretCombination.hasColor(that.proposedCombination.getValue()[i])) {
                        that.whites++;
                    }
                }
            }
        },
        isWinner(){
            return that.blacks === that.proposedCombination.getLenght();
        },
        setProposedCombinationValue(value){
            that.blacks = 0;
            that.whites = 0;
            return that.proposedCombination.setValue(value);
        },
        checkProposedCombinationErrors(){
            return that.proposedCombination.checkErrors()
        },
        getResult(){
            return `${that.proposedCombination.getValue()} --> ${that.blacks} blacks and ${that.whites} whites`;
        }
    }
}

