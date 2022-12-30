const { Console } = require("console-mpds");
const console = new Console();

function Coordinate(row=undefined, column=undefined) {
    this.MAX_COLUMNS = 7;
    this.MAX_ROWS = 6;

    this.row = row;
    this.column = column;
}

Coordinate.prototype.shifted = function (directionCoordinate) {
    return new Coordinate(this.row + directionCoordinate.row,
                          this.column + directionCoordinate.column);
}

Coordinate.prototype.toString = function () {
    return `(${this.row},${this.column})`;
}

function CoordinateView(coordinate) {
    this.coordinate = coordinate;
}    

CoordinateView.prototype.readColumn = function () {
    this.coordinate.column = read(`Columna a colocar`, this.coordinate.MAX_COLUMNS) - 1;

    function read(title, max) {
        let column;
        let error;
        do {
          column = console.readNumber(`${title}: `);
          error = column < 1 || max < column;
          if (error) {
            console.writeln(`Por favor un numero entre 1 y ${max} inclusives`)
          }
        } while (error);
        return column
    }    
}

function Direction(name, directionCoordinate, opositeDirectionCoordinate) {
    this.name = name;
    this.coordinate = directionCoordinate;
    this.opositeCoordinate = opositeDirectionCoordinate;
}

Direction.prototype.toString = function () {
    return `(${this.name} -> direction: ${this.coordinate.toString()}, oposite direction: ${this.opositeCoordinate.toString()})`;
}

function Line(origenCoordinate, direction) {
    this.LENGTH = 4;
    this.direction = direction;
    this.coordinates = [];
    
    this.coordinates[0] = origenCoordinate;
    for (let i = 1; i < this.LENGTH; i++) {
        this.coordinates[i] = this.coordinates[i - 1].shifted(direction.coordinate);
    }
}

Line.prototype.toString = function (){
    let msg = `${this.direction.toString()}\n`;
    //let msg = "";
    for(let i=0; i < this.LENGTH; i++){
        msg += ` ${this.coordinates[i].toString()}`
    }
    return msg;
}

Line.prototype.oppositeDirection = function (){
    return new Line(this.coordinates[0].shifted(this.direction.opositeCoordinate), this.direction);
}

Line.prototype.getVariations = function(){
    let lines = [];
    lines[0] = this;
    for (let i = 1; i < lines[0].LENGTH; i++) {
        lines[i] = lines[i - 1].oppositeDirection();
    }
    return lines;
}

function Board() {
    this.TOKEN_EMPTY = ` `;
    this.tokens = [];
    this.lastCoordinate = new Coordinate();
    for (let i = 0; i < this.lastCoordinate.MAX_ROWS; i++) {
        this.tokens[i] = [];
        for (let j = 0; j < this.lastCoordinate.MAX_COLUMNS; j++) {
            this.tokens[i][j] = this.TOKEN_EMPTY;
        }
    }
}  

Board.prototype.getToken = function (coordinate){
    return this.tokens[coordinate.row][coordinate.column];
}

Board.prototype.isLastCoordinateColumnEmpty = function(){
   return this.tokens[0][this.lastCoordinate.column] === this.TOKEN_EMPTY;
}

Board.prototype.putLastCoordinate = function(token){
    for (let i = this.lastCoordinate.MAX_ROWS-1; i > -1 ; i--) {
        if(this.tokens[i][this.lastCoordinate.column] === this.TOKEN_EMPTY){
            this.tokens[i][this.lastCoordinate.column] = token;
            this.lastCoordinate.row = i;
            break;
        }
    }
}

Board.prototype.isLastTokenInLine = function (){
    const directions = [ new Direction('NORTH', new Coordinate(1, 0), new Coordinate(-1, 0)),
                         new Direction('NORTH_EAST', new Coordinate(1, 1), new Coordinate(-1, -1)),
                         new Direction('EAST', new Coordinate(0, 1), new Coordinate(0, -1)),
                         new Direction('SOUTH_EAST', new Coordinate(-1, 1), new Coordinate(1, -1))]; 
    
    for (let direction of directions) {
        //console.writeln(`revisar si hay 4 en línea en dirección ${direction.name}`); 
        const lines = new Line(this.lastCoordinate, direction).getVariations();
        for(let i=0; i < lines.length; i++){
            //console.writeln(lines[i].toString());
            if(this.isInLine(lines[i])){
                return true;
            }
        }  
    }            
    return false;
}

Board.prototype.isInLine = function(line) {
    //esto esta fallando cuando empiezo en la primera columan 1, 2, 3, 4
    for (let coordinate of line.coordinates) { 
        if (!this.isValid(coordinate)) {
            //console.writeln(`invalid ${coordinate.toString()}`);
            return false;
        }
        if (this.getToken(coordinate) !== this.getToken(this.lastCoordinate)) {
            //console.writeln(`invalid token '${this.getToken(coordinate)}'`);
            return false;
        }
    }
    return true;    
}

Board.prototype.isValid = function (coordinate){
    return 0 <= coordinate.row && coordinate.row < this.lastCoordinate.MAX_ROWS && 0 <= coordinate.column && coordinate.column < this.lastCoordinate.MAX_COLUMNS
}

function BoardView(board) {
    this.board = board;
}    

BoardView.prototype.writeTokens = function () {
    const VERTICAL_SEPARATOR = `|`;
    let boardToString = `\n`;
    for (let row = 0; row < this.board.lastCoordinate.MAX_ROWS; row++) {
      for (let column = 0; column < this.board.lastCoordinate.MAX_COLUMNS; column++) {
        boardToString += `${VERTICAL_SEPARATOR} ${this.board.getToken(new Coordinate(row,column))} `;
      }
      boardToString += `${VERTICAL_SEPARATOR}\n`;
    }
    boardToString +=  `+---------------------------+\n`;
    boardToString +=  `  1   2   3   4   5   6   7  \n`;
    console.writeln(boardToString);
};

BoardView.prototype.placeToken = function (token) {
    this.coordinateView = new CoordinateView(this.board.lastCoordinate);
    let empty;
    do {
        this.coordinateView.readColumn(this.board.lastCoordinate.MAX_COLUMNS);
        empty = this.board.isLastCoordinateColumnEmpty();
        if (!empty) {
            console.writeln(`La columna esta llena, intente con otra`);
        }
    } while (!empty);
    this.board.putLastCoordinate(token);
}    

function Game() {
    this.MAX_PLAYERS = 2;
    this.players = ['R','Y'];
    this.turn = 0;
    this.board = new Board();
}    

Game.prototype.isWinner = function () {
    return this.board.isLastTokenInLine();
}

Game.prototype.nextTurn = function () {
    this.turn = (this.turn + 1) % this.MAX_PLAYERS;
}

Game.prototype.getTurnToken = function () {
    return this.players[this.turn];
}

function GameView() {
    this.game = new Game();
    this.boardView = new BoardView(this.game.board);
}    

GameView.prototype.writeWinner = function () {
    console.writeln(`Victoria para ${this.game.getTurnToken()}`);
}

GameView.prototype.playTurn = function () {
    console.writeln(`Turno para ${this.game.getTurnToken()}`);
    this.boardView.placeToken(this.game.getTurnToken());
}    

GameView.prototype.play = function () {
    let winner;
    console.writeln(`--------- Connecta 4 --------`);  
    do {
      this.boardView.writeTokens();
      this.playTurn();
      winner = this.game.isWinner();
      if (!winner) {
        this.game.nextTurn();
      }
    } while (!winner);
    this.boardView.writeTokens();
    this.writeWinner();
}

function YesNoDialog(question) {
    this.question = question;
    this.answer = ``;
}

YesNoDialog.prototype.read = function () {
    let error = false;
    do {
        answer = console.readString(this.question);
        error = !this.isAffirmative() && !this.isNegative();
        if (error) {
        console.writeln(`Por favor, responda "si" o "no"`);
        }
    } while (error);
}

YesNoDialog.prototype.isAffirmative = function () {
    return answer === `si`;
}

YesNoDialog.prototype.isNegative = function () {
    return answer === `no`;
}

function Connect4() {
    this.continueDialog = new YesNoDialog(`¿Quieres jugar otra partida? `);
}

Connect4.prototype.play = function () {
    do {
        const gameView = new GameView();
        gameView.play();
        this.continueDialog.read();
    } while (this.continueDialog.isAffirmative());
}

new Connect4().play();