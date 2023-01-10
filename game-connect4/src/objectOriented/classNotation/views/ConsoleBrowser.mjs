import { ConsoleView } from './ConsoleView.mjs'

export class ConsoleBrowser extends ConsoleView {
    #documentBody = document.getElementById('resultProcess').contentWindow.document
    
    constructor(){
      super();
      const body = `<!DOCTYPE html>
      <head>
          <style>
              .text {
                font-family: "Lucida Console", Courier, monospace;
                font-size: 1em;
                color: #ddd; 
              }
              .code {
                  margin: 0px;
                  display: inline;
              }
              #codeInput {
                  border: none;
                  background-color: transparent;
                  padding: 0;
                  margin: 0;
              }
              #codeInput:focus {
                  outline: none;
              }
          </style>
      </head>
      <body>
        <pre id="console" class="code text">mariapaulaherrero % </pre>
        <input type="text" id="codeInput" class="text" size="10" autofocus></input>
      </body>`;
      this.#documentBody.open();
      this.#documentBody.write(body);
      this.#documentBody.close();
    }
    
    writeln(text){
      console.log(text);
      this.#documentBody.getElementById('console').appendChild(document.createTextNode(text + `\n`));
    }

    readString(question){
        console.log(question);
        this.#documentBody.getElementById('console').appendChild(document.createTextNode(question));
        const answer = prompt(question);
        console.log(answer);
        this.#documentBody.getElementById('console').appendChild(document.createTextNode(`${answer}\n`));
        return answer;
    }

    readNumber(question) {
        let input;
        do {
          input = parseInt(this.readString(question));
          if (isNaN(input)) {
            console.log('FORMAT ERROR!!! Enter a number formatted value.');
            this.#documentBody.getElementById('console').innerHTML += 'FORMAT ERROR!!! Enter a number formatted value\n';
          }
        } while (isNaN(input));
        //document.getElementById('console').innerHTML +=  ' ' + input + `\n`;
        return input;
    }

    async read(){
      console.log('waiting keypress..');
      await this.waitingKeypress();
      const result = this.#documentBody.getElementById('codeInput').value;
      this.#documentBody.getElementById('console').appendChild(document.createTextNode(`${result}\n`));
      this.#documentBody.getElementById('codeInput').value = "";
      console.log("result de read: " + result);
      return result;
    }

    waitingKeypress() {
      return new Promise((resolve) => {
        this.#documentBody.addEventListener('keypress', onKeyHandler);
        function onKeyHandler(e) {
          if (e.key === "Enter") {
            document.removeEventListener('keydown', onKeyHandler);
            console.log('presionado key')
            resolve();
          }
        }
      });
    }
}