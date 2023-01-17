export class DialogView {
    static welcomeText = 'Si quieres jugar contra la IA seleciona una columna, si no, cambia la opción y empieza otro juego';

    static writeWelcome(){
        document.getElementById('dialog').innerHTML=DialogView.welcomeText;
    }

    static write(text){
        document.getElementById('dialog').innerHTML=text;
    }

    static writeIfNotWelcome(text){
        if(document.getElementById('dialog').innerHTML !== DialogView.welcomeText){
            document.getElementById('dialog').innerHTML=text;
        }
    }

    static writeWinner(text, element){
        const dialogElement = document.getElementById('dialog');
        dialogElement.innerHTML=text;
        dialogElement.append(element);
        //dialogElement.parentNode.insertBefore(element,dialogElement.nextSibling);
    }
}    