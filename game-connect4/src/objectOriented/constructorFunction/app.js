const { Console } = require("console-mpds");
const console = new Console();

function Coordinate(row=undefined, column=undefined) {
    this.MAX_COLUMNS = 7;
    this.MAX_ROWS = 6;

    this.row = row;
    this.column = column;
}

Coordinate.prototype.shifted = function (coordinate) {
    return new Coordinate(this.row + coordinate.row,
                          this.column + coordinate.column);
}

Coordinate.prototype.toString = function () {
    return `(${this.row},${this.column})`;
}

Coordinate.prototype.isValid = function (){
    return 0 <= this.row && this.row < this.MAX_ROWS && 0 <= this.column && this.column < this.MAX_COLUMNS
}

Coordinate.prototype.getOposite = function () {
    return new Coordinate(this.row * -1, this.column * -1);
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

function Direction(name, coordinate) {
    this.name = name;
    this.coordinate = coordinate;
}

Direction.prototype.toString = function () {
    return `(${this.name} -> direction: ${this.coordinate.toString()}, oposite direction: ${this.coordinate.getOposite().toString()})`;
}

Direction.prototype.getOpositeCoordinate = function () {
    return this.coordinate.getOposite();
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

Line.prototype.shift = function(){
    for (let i = 0; i < this.LENGTH; i++) {
        this.coordinates[i] = this.coordinates[i].shifted(this.direction.getOpositeCoordinate());
    }
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

Board.prototype.getMaxRows = function (){
    return this.lastCoordinate.MAX_ROWS;
}

Board.prototype.getMaxColumns = function (){
    return this.lastCoordinate.MAX_COLUMNS;
}

Board.prototype.getToken = function (row, column){
    return this.tokens[row][column];
}

Board.prototype.isLastCoordinateColumnEmpty = function(){
   return this.tokens[0][this.lastCoordinate.column] === this.TOKEN_EMPTY;
}

Board.prototype.putLastCoordinate = function(token){
    for (let i = this.getMaxRows()-1; i > -1 ; i--) {
        if(this.tokens[i][this.lastCoordinate.column] === this.TOKEN_EMPTY){
            this.tokens[i][this.lastCoordinate.column] = token;
            this.lastCoordinate.row = i;
            break;
        }
    }
}

Board.prototype.isComplete = function (){
    for (let i = 0; i < this.getMaxColumns(); i++) {
        if (this.tokens[0][i] === this.TOKEN_EMPTY) {
          return false;
        }
    }
    return true;
}

Board.prototype.isLastTokenInLine = function (){
    const directions = [ new Direction('NORTH', new Coordinate(1, 0)),
                         new Direction('NORTH_EAST', new Coordinate(1, 1)),
                         new Direction('EAST', new Coordinate(0, 1)),
                         new Direction('SOUTH_EAST', new Coordinate(-1, 1))]; 

    for (let direction of directions) {
        //console.writeln(`revisar si hay 4 en línea en dirección ${direction.toString()}`); 
        const line = new Line(this.lastCoordinate, direction);
        for(let i=0; i < line.LENGTH; i++){
            //console.writeln(lines[i].toString());
            if(this.isInLine(line)){
                return true;
            }
            line.shift();
        }
    }
    return false;
}

Board.prototype.isInLine = function(line) {
    //esto esta fallando cuando empiezo en la primera columan 1, 2, 3, 4
    for (let coordinate of line.coordinates) { 
        if (!coordinate.isValid()) {
            //console.writeln(`invalid ${coordinate.toString()}`);
            return false;
        }
        if (this.getToken(coordinate.row, coordinate.column) !== this.getToken(this.lastCoordinate.row, this.lastCoordinate.column)) {
            //console.writeln(`invalid token '${this.getToken(coordinate)}'`);
            return false;
        }
    }
    return true;    
}

function BoardView(board) {
    this.board = board;
}    

BoardView.prototype.writeTokens = function () {
    const VERTICAL_SEPARATOR = `|`;
    let boardToString = `\n`;
    for (let row = 0; row < this.board.getMaxRows(); row++) {
      for (let column = 0; column < this.board.getMaxColumns(); column++) {
        boardToString += `${VERTICAL_SEPARATOR} ${this.board.getToken(row,column)} `;
      }
      boardToString += `${VERTICAL_SEPARATOR}\n`;
    }
    boardToString +=  `+---------------------------+\n`;
    boardToString +=  `  1   2   3   4   5   6   7  \n`;
    console.writeln(boardToString);
};

function Player(color){
    this.color = color;
}

Player.prototype.getColor = function () {
    return this.color
}

function Turn(board){
    this.board = board;
    this.NUMBER_PLAYERS = 2;
    this.players = [new Player('R'), new Player('Y')];
    this.activePlayer = 0;
}

Turn.prototype.next = function () {
    this.activePlayer = (this.activePlayer + 1) % this.NUMBER_PLAYERS;
}

Turn.prototype.getToken = function () {
    return this.players[this.activePlayer].getColor();
}

Turn.prototype.coordinateColumnEmpty = function () {
    return this.board.isLastCoordinateColumnEmpty();
}

Turn.prototype.getCoordinate = function () {
    return this.board.lastCoordinate;
}

Turn.prototype.putCoordinate = function () {
    this.board.putLastCoordinate(this.getToken());
}

function TurnView(turn) {
    this.turn = turn;
}

TurnView.prototype.playTurn = function () {
    console.writeln(`Turno para ${this.turn.getToken()}`);
    let empty;
    do {
        this.getColumn(this.turn.getCoordinate());
        empty = this.turn.coordinateColumnEmpty();
        if (!empty) {
            console.writeln(`La columna esta llena, intente con otra`);
        }
    } while (!empty);
    this.turn.putCoordinate(this.turn.getToken());
}

TurnView.prototype.getColumn = function (coordinate) {
    let coordinateView = new CoordinateView(coordinate);
    coordinateView.readColumn();
}

function Game() {
    this.board = new Board();
    this.turn = new Turn(this.board);
}    

Game.prototype.isFinished = function () {
    return this.board.isComplete() || this.board.isLastTokenInLine()
}

Game.prototype.isWinner = function () {
    return this.board.isLastTokenInLine()
}

Game.prototype.getWinnerToken = function () {
    return this.turn.getToken();
}

Game.prototype.nextTurn = function () {
    this.turn.next();
}

function GameView() {
    this.game = new Game();
    this.boardView = new BoardView(this.game.board);
    this.turnView = new TurnView(this.game.turn);
}    

GameView.prototype.writeFinish = function () {
    if(this.game.isWinner()){
        console.writeln(`Victoria para ${this.game.getWinnerToken()}`);
    } else {
        console.writeln(`¡Empate!`);
    }
}


GameView.prototype.play = function () {
    let finished;
    console.writeln(`--------- Connecta 4 --------`);  
    do {
      this.boardView.writeTokens();
      this.turnView.playTurn();
      finished = this.game.isFinished();
      if (!finished) {
        this.game.nextTurn();
      }
    } while (!finished);
    this.boardView.writeTokens();
    this.writeFinish();
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