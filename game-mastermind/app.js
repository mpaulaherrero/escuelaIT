const { Console } = require("console-mpds");
const console = new Console();
playMastermind();

function playMastermind() {
    do {
        playGame();
    } while (isResumed());

    function playGame(){
        const COLORS = "rgybmc";
        const COMBINATION_LENGHT = 4;
        const secretCombination = generateSecretCombination(COLORS, COMBINATION_LENGHT);
        let attempts = [];
        let attemptResult; 
        console.writeln(`----- MASTERMIND -----`);
        showBoard(attempts);
        do{
            let proposedCombination = getProposedCombination(COMBINATION_LENGHT, COLORS);
            let [black, white] = checkProposedCombination(secretCombination, proposedCombination);
            attempts[attempts.length] = `${proposedCombination} --> ${black} blacks and ${white} whites`;
            showBoard(attempts);
            attemptResult = checkEndGame(black, COMBINATION_LENGHT, attempts.length);
        } while(attemptResult === 'PLAYER_CONTINUE');
        showGameResult(attemptResult);
    }

    function generateSecretCombination(COLORS, COMBINATION_LENGHT) {
        //return "bycr";
        let secretCombination = "";
        for (let i = 0; i < COMBINATION_LENGHT; i++) {
            let repeated;
            do {
                let randomColor = COLORS[parseInt(Math.random() * COLORS.length)];
                repeated = searchColor(randomColor, secretCombination);
                if (!repeated) {
                    secretCombination += randomColor;
                }
            } while (repeated);
        }
        //console.writeln(secretCombination);
        return secretCombination;
    }

    function searchColor(color, COLORS){
        for (let i = 0; i < COLORS.length ; i++) {
            if(COLORS[i] === color){
                return true;
            }
        }
        return false;
    }

    function showBoard(attempts) {
        console.writeln(`\n${attempts.length} attempt(s):\n****`);
        for(let i=0; i< attempts.length; i++){
            console.writeln(`${attempts[i]}`);
        }
    }

    function getProposedCombination(combinationLength, COLORS){
        let proposedCombination;
        let correctProposedCombination;
        do{
            proposedCombination = console.readString(`Propose a combination: `);
            let errorCodes = checkErrorsInProposedCombination(proposedCombination, COLORS, combinationLength);    
            correctProposedCombination = errorCodes.length === 0;
            if (!correctProposedCombination) {
                showErrorMessage(errorCodes, COLORS);
            }
        } while(!correctProposedCombination);
        return proposedCombination;
    
        function checkErrorsInProposedCombination(proposedCombination, COLORS, combinationLength){
            const WRONG_LENGTH_ERROR_CODE = 0;
            const WRONG_COLOR_ERROR_CODE = 1;
            const REPEATED_COLOR_ERROR_CODE = 2;
            
            let errorCodes = [];
            if(proposedCombination.length !== combinationLength){
                errorCodes[errorCodes.length] = WRONG_LENGTH_ERROR_CODE;
            }
            if(!validateColors(proposedCombination, COLORS)){
                errorCodes[errorCodes.length] = WRONG_COLOR_ERROR_CODE;
            } 
            if(!validateUniqueColors(proposedCombination)){
                errorCodes[errorCodes.length] = REPEATED_COLOR_ERROR_CODE;
            }
            return errorCodes;

            function validateColors(proposedCombination, COLORS){
                let validColor = true;
                for(let i=0; validColor && i<proposedCombination.length; i++){
                    validColor = searchColor(proposedCombination[i], COLORS);
                }
                return validColor;
            }

            function validateUniqueColors(proposedCombination){
                let uniqueColor = true;
                for(let i=0; uniqueColor && i<proposedCombination.length; i++){
                    for(let j=i+1; uniqueColor && j<proposedCombination.length; j++){
                        uniqueColor = proposedCombination[j]!==proposedCombination[i];
                    }
                }
                return uniqueColor;
            }
        }    

        function showErrorMessage(errorCodes, COLORS){
            const ERROR_MESSAGES = [`Wrong proposed combination length`, 
                              `Wrong colors, they must be: ${COLORS}`, 
                              `Wrong proposed combination, at least one color is repeated`];
            for(let i=0; i< errorCodes.length; i++){
                console.writeln(ERROR_MESSAGES[errorCodes[i]]);
            }
        }
    }

    function checkProposedCombination(secretCombination, proposedCombination){
        let black=0;
        let white=0;
        for(let i=0; i<secretCombination.length; i++){
            if(secretCombination[i]===proposedCombination[i]){
                black++;
            }else{
                if(searchColor(proposedCombination[i], secretCombination)){
                    white++;
                }
            }
        }
        return [black, white];
    }

    function checkEndGame(black, COMBINATION_LENGHT, attemptsNumber){
        const MAX_ATTEMPT=10;
        if(black === COMBINATION_LENGHT){
            return 'PLAYER_WIN';
        }
        if(attemptsNumber === MAX_ATTEMPT){
            return 'PLAYER_LOOSE';
        }
        return 'PLAYER_CONTINUE';
    }

    function showGameResult(result){
        const WINNER_MESSAGE= "You've won!!! ;-)";
        const LOOSER_MESSAGE="You've lost!!! :-(";

        if(result==='PLAYER_LOOSE'){
            console.writeln(LOOSER_MESSAGE);
        } else {
            console.writeln(WINNER_MESSAGE);
        }
    }

    function isResumed() {
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