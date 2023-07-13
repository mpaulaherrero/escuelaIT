export class DialogView {
    static welcomeText = 'Si quieres jugar contra la IA seleciona una columna, si no, cambia la opción y empieza otro juego';
    static winnerText = `Victoria para`;
    static tieText = `¡Empate!`;
    static fullColumn = `La columna esta llena, intente con otra`;
    static selectColumn = `Selecciona una columna`;

    static writeWelcome(){
        this.write(DialogView.welcomeText);
    }

    static writeTie(){
        this.write(DialogView.tieText);
    }

    static writeFullColumn(){
        this.write(DialogView.fullColumn);
    }

    static write(text){
        document.getElementById('dialog').innerHTML=text;
    }

    static writeSelectColumnIfNotWelcome(){
       this.writeIfNotWelcome(DialogView.selectColumn)
    }

    static writeIfNotWelcome(text){
        if(document.getElementById('dialog').innerHTML !== DialogView.welcomeText){
            this.write(text);
        }
    }

    static writeWinner(element){
        const dialogElement = document.getElementById('dialog');
        dialogElement.innerHTML=DialogView.winnerText;
        dialogElement.append(element);
        //dialogElement.parentNode.insertBefore(element,dialogElement.nextSibling);
    }
}