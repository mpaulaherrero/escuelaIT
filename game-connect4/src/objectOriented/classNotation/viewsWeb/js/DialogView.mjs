export class DialogView {
    static WELCOME_TEXT = 'Si quieres jugar contra la IA seleciona una columna, si no, cambia la opción y empieza otro juego';
    static WINNER_TEXT = `Victoria para`;
    static TIE_TEXT = `¡Empate!`;
    static FULL_COLUMN_TEXT = `La columna esta llena, intente con otra`;
    static SELECT_COLUMN_TEXT = `Selecciona una columna`;

    static writeWelcome(){
        this.write(DialogView.WELCOME_TEXT);
    }

    static writeTie(){
        this.write(DialogView.TIE_TEXT);
    }

    static writeFullColumn(){
        this.write(DialogView.FULL_COLUMN_TEXT);
    }

    static write(text){
        document.getElementById('dialog').innerHTML=text;
    }

    static writeSelectColumnIfNotWelcome(){
       this.writeIfNotWelcome(DialogView.SELECT_COLUMN_TEXT)
    }

    static writeIfNotWelcome(text){
        if(document.getElementById('dialog').innerHTML !== DialogView.WELCOME_TEXT){
            this.write(text);
        }
    }

    static writeWinner(element){
        const dialogElement = document.getElementById('dialog');
        dialogElement.innerHTML=DialogView.WINNER_TEXT;
        dialogElement.append(element);
        //dialogElement.parentNode.insertBefore(element,dialogElement.nextSibling);
    }
}