const {createLogger, transports, format} = require('winston');
const { Console } = require("console-mpds");
const console = new Console();

function assert(condition, message){
    if(false === condition){
      throw new Error(message ?? 'Assertion Failed')
    }
}

const logger = createLogger({
    level: 'info',
    format: format.simple(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console(),
      new transports.File({ filename: './logs/connect4.log' }),
    ],
  });

function Color(string) {
    this.string = string;
}

Color.prototype.getCode = function (){
    return this.string[0];
}

Color.prototype.getOpposite = function () {
    return Color.values()[(this.ordinal() + 1) % Color.values().length];
}

Color.prototype.ordinal = function () {
    for(let i = 0; i < Color.values().length; i++){
        if (this == Color.values()[i]){
            return i;
        }
    }
    return -1;
}

Color.RED = new Color(`Red`);
Color.YELLOW = new Color(`Yellow`);
Color.NULL = new Color(` `);

Color.values = function () {
    return [Color.RED, Color.YELLOW];
}

Color.get = function (ordinal) {
    return Color.values()[ordinal];
}
function Coordinate(row=undefined, column=undefined) {
    this.row = row;
    this.column = column;
} 

Coordinate.MIN_COLUMNS = 1;
Coordinate.MAX_COLUMNS = 7;
Coordinate.MAX_ROWS = 6;

Coordinate.prototype.shifted = function (coordinate) {
    return new Coordinate(this.row + coordinate.row,
                          this.column + coordinate.column);
}

Coordinate.prototype.toString = function () {
    return `(${this.row},${this.column})`;
}

Coordinate.prototype.isValid = function (){
    return 0 <= this.row && this.row < Coordinate.MAX_ROWS && 0 <= this.column && this.column < Coordinate.MAX_COLUMNS
}

Coordinate.prototype.getOpposite = function () {
    return new Coordinate(this.row * -1, this.column * -1);
}

Coordinate.prototype.clone = function () {
    return new Coordinate(this.row, this.column);
}

function CoordinateView(coordinate) {
    this.coordinate = coordinate;
}    

CoordinateView.prototype.readColumn = function () {
    this.coordinate.column = read(`Columna a colocar`, this.coordinate) - 1;

    function read(title, coordinate) {
        let column;
        let error;
        do {
          column = console.readNumber(`${title}: `);
          error = column < Coordinate.MIN_COLUMNS || Coordinate.MAX_COLUMNS < column;
          if (error) {
            console.writeln(`Por favor un numero entre 1 y ${Coordinate.MAX_COLUMNS} inclusives`)
          }
        } while (error);
        return column
    }    
}

function Direction(name, row, column) {
    this.name = name;
    this.coordinate = new Coordinate(row, column);
}

Direction.NORTH = new Direction('NORTH', 1, 0);
Direction.NORTH_EAST = new Direction('NORTH_EAST', 1, 1);
Direction.EAST = new Direction('EAST', 0, 1);
Direction.SOUTH_EAST = new Direction('SOUTH_EAST', -1, 1);

Direction.getValues = function (){
    return [ Direction.NORTH, Direction.NORTH_EAST, Direction.EAST, Direction.SOUTH_EAST];
}

Direction.prototype.toString = function () {
    return `(${this.name} -> direction: ${this.coordinate.toString()}, oposite direction: ${this.coordinate.getOpposite().toString()})`;
}

Direction.prototype.getOppositeCoordinate = function () {
    return this.coordinate.getOpposite();
}

Direction.prototype.clone = function (){
    return new Direction(this.name, this.coordinate.row, this.coordinate.column);
}

function Line(origenCoordinate, direction) {
    this.direction = direction;
    this.coordinates = [];
    
    this.coordinates[0] = origenCoordinate;
    for (let i = 1; i < Line.LENGTH; i++) {
        this.coordinates[i] = this.coordinates[i - 1].shifted(direction.coordinate);
    }
}

Line.LENGTH = 4;

Line.prototype.toString = function (){
    let msg = `${this.direction.toString()}\n`;
    for(let i=0; i < Line.LENGTH; i++){
        msg += ` ${this.coordinates[i].toString()}`
    }
    return msg;
}

Line.prototype.shift = function(){
    for (let i = 0; i < Line.LENGTH; i++) {
        this.coordinates[i] = this.coordinates[i].shifted(this.direction.getOppositeCoordinate());
    }
}

Line.prototype.clone = function(){
    return new Line(this.coordinates[0].clone(), this.direction.clone());
}

function Board() {
    this.tokens = [];
    this.lastCoordinate = new Coordinate();
    this.winnerLine = undefined;

    for (let i = 0; i < Coordinate.MAX_ROWS; i++) {
        this.tokens[i] = [];
        for (let j = 0; j < Coordinate.MAX_COLUMNS; j++) {
            this.tokens[i][j] = Color.NULL;
        }
    }
}  

Board.prototype.getMaxRows = function (){
    return Coordinate.MAX_ROWS;
}

Board.prototype.getMaxColumns = function (){
    return Coordinate.MAX_COLUMNS;
}

Board.prototype.getToken = function (row, column){
    return this.tokens[row][column];
}

Board.prototype.isLastCoordinateColumnEmpty = function(){
   return this.tokens[0][this.lastCoordinate.column] === Color.NULL;
}

Board.prototype.putLastCoordinate = function(token){
    for (let i = this.getMaxRows()-1; i > -1 ; i--) {
        if(this.tokens[i][this.lastCoordinate.column] === Color.NULL){
            this.tokens[i][this.lastCoordinate.column] = token;
            this.lastCoordinate.row = i;
            break;
        }
    }
    this.checkLastTokenInLine();
}

Board.prototype.putCoordinate = function(column, token){
    this.lastCoordinate.column = column;
    this.putLastCoordinate(token);
    return this.lastCoordinate.row;
}

Board.prototype.isComplete = function (){
    for (let i = 0; i < this.getMaxColumns(); i++) {
        if (this.isColumnEmpty(i)) {
          return false;
        }
    }
    return true;
}

Board.prototype.isColumnEmpty = function (column) {
    return this.tokens[0][column] === Color.NULL;
}

Board.prototype.getEmptyColumns = function () {
    let emptyColumns = [];
    for (let i = 0; i < this.getMaxColumns(); i++) {
        if (this.isColumnEmpty(i)) {
            emptyColumns.push(i);
        }
    }
    return emptyColumns;
}

Board.prototype.isLastTokenInLine = function (){
    return this.winnerLine !== undefined;
}

Board.prototype.checkLastTokenInLine = function (){
    const directions = Direction.getValues();
    this.winnerLine = undefined;

    for (let direction of directions) {
        const line = new Line(this.lastCoordinate, direction);
        for(let i=0; i < Line.LENGTH; i++){
            if(this.isInLine(line)){
                this.winnerLine = line;
                return true;
            }
            line.shift();
        }
    }
    return false;
}

Board.prototype.isInLine = function(line) {
    for (let coordinate of line.coordinates) { 
        if (!coordinate.isValid()) {
            return false;
        }
        if (this.getToken(coordinate.row, coordinate.column) !== this.getToken(this.lastCoordinate.row, this.lastCoordinate.column)) {
            return false;
        }
    }
    return true;    
}

Board.prototype.isFinished = function() {
    return this.isComplete() || this.isLastTokenInLine();
}

Board.prototype.toString = function(){
    const VERTICAL_SEPARATOR = `|`;
    let boardToString = `\n`;
    for (let row = 0; row < this.getMaxRows(); row++) {
      boardToString += `${row} `;
      for (let column = 0; column < this.getMaxColumns(); column++) {
        boardToString += `${VERTICAL_SEPARATOR}${this.getToken(row,column).getCode()}`;
      }
      boardToString += `${VERTICAL_SEPARATOR}\n`;
    }
    boardToString +=  `  +-------------+\n`;
    boardToString +=  `   0 1 2 3 4 5 6 \n`;
    boardToString +=  `\nlastCoordinate:  ${this.lastCoordinate.toString()}\n`;
    boardToString +=  `winnerLine:  ${this.winnerLine ? this.winnerLine.toString():'undefined'}\n`;
    return boardToString;
}

Board.prototype.clone = function(){
    let newTokens = [];
    for (let i = 0; i < this.getMaxRows(); i++) {
        newTokens[i] = [];
        for (let j = 0; j < this.getMaxColumns(); j++) {
            newTokens[i][j] = this.tokens[i][j];
        }
    }
    let newBoard = new Board();
    newBoard.tokens = newTokens;
    newBoard.lastCoordinate = this.lastCoordinate.clone();
    newBoard.winnerLine = this.winnerLine ? this.winnerLine.clone():undefined;
    return newBoard;
}

function BoardView(board) {
    this.board = board;
}    

BoardView.prototype.writeTokens = function () {
    const VERTICAL_SEPARATOR = `|`;
    let boardToString = `\n`;
    for (let row = 0; row < this.board.getMaxRows(); row++) {
      for (let column = 0; column < this.board.getMaxColumns(); column++) {
        boardToString += `${VERTICAL_SEPARATOR} ${this.board.getToken(row,column).getCode()} `;
      }
      boardToString += `${VERTICAL_SEPARATOR}\n`;
    }
    boardToString +=  `+---------------------------+\n`;
    boardToString +=  `  1   2   3   4   5   6   7  \n`;
    console.writeln(boardToString);
}

function MinimaxCost(value){
    this.column;
    this.value = value;
}
function Minimax(color, lowerLimit, bestScoreColor){
    this.color = color;
    this.lowerLimit = lowerLimit;
    this.bestScoreColor = bestScoreColor;
    this.opposite=undefined;
}

Minimax.MAX_STEPS = 4;
Minimax.MAX_LIMIT = 1000;
Minimax.MAX_COST = 1;
Minimax.MIN_COST = -1;

Minimax.prototype.getCost = function (steps, board) {
    assert(this.opposite!==undefined,"Hay que definir el jugador opuesto");
    
    if (this.isEnd(steps, board)) return this.getEndCost(board, this.lowerLimit);
    
    let cost = new MinimaxCost(this.lowerLimit);
    let emptyColumns = board.getEmptyColumns();
    for (let column of emptyColumns) {
        let newBoard = board.clone();
        newBoard.putCoordinate(column, this.color);
        //logger.info(`PLAYER ${this.color.getCode()} - STEP: ${steps}, column: ${column}, cost: ${cost.value}, costColumn: ${cost.column}`);
        //logger.info(newBoard.toString());
        let nextMoveCost = this.opposite.getCost(steps + 1, newBoard);
        //logger.info(`PLAYER ${this.color.getCode()} - STEP: ${steps}, cost: ${cost.value}, costColumn: ${cost.column}, nextMoveCost: ${nextMoveCost.value}, nextMoveColumn: ${nextMoveCost.column}`);
        this.nextCost(cost, nextMoveCost, column);
    }
    return cost;
}

Minimax.prototype.nextCost = function (cost, nextMoveCost){}

Minimax.prototype.isEnd = function (steps, board) {
    return steps ===  Minimax.MAX_STEPS || board.isFinished();
}

Minimax.prototype.getEndCost = function (board, costValue){
    let cost = new MinimaxCost(costValue);
    if(!board.isLastTokenInLine()){
        cost.value = this.getBestScore(board) / Minimax.MAX_LIMIT;
    }
    //logger.info(`PLAYER ${this.color.getCode()} END - cost: ${cost.value}`);
    return cost; 
}

Minimax.prototype.getBestScore = function (board){
    let point = 0;
    for (let row = 0; row < board.getMaxRows() - 3; row++) {
        for (let column = 0; column < board.getMaxColumns(); column++) {
            point += this.getInLinePoint(board, new Line(new Coordinate(row, column), Direction.NORTH));
        }    
    }
    for (let row = 0; row < board.getMaxRows(); row++) {
        for (let column = 0; column < board.getMaxColumns() - 3; column++) { 
            point += this.getInLinePoint(board, new Line(new Coordinate(row, column), Direction.EAST)); 
        } 
    }
    for (let row = 0; row < board.getMaxRows() - 3; row++) {
        for (let column = 0; column < board.getMaxColumns() - 3; column++) {
            point += this.getInLinePoint(board, new Line(new Coordinate(row, column), Direction.NORTH_EAST));
        }            
    }
    for (let row = 3; row < board.getMaxRows(); row++) {
        for (let column = 0; column <= board.getMaxColumns() - 4; column++) {
            point += this.getInLinePoint(board, new Line(new Coordinate(row, column), Direction.SOUTH_EAST));
        }
    }
    //logger.info(`PLAYER ${this.color.getCode()} BestScore Total points: ${point}`);
    return point;
}

Minimax.prototype.getInLinePoint = function (board, line) {
    let point = 0;
    let coordinates = line.coordinates;   
    for(let i = 0; i < coordinates.length; i++) {
        if (board.getToken(coordinates[i].row, coordinates[i].column) === this.bestScoreColor) {
            point += 1;
        }
    }
    //logger.info(`PLAYER ${this.color.getCode()} isInLinePoint: (${line.toString()}), point: ${point}`);
    return point;
}
function MaxPlayer(color){
    Minimax.call(this, color, Minimax.MIN_COST, color);
}
MaxPlayer.prototype = Object.create(Minimax.prototype);
MaxPlayer.prototype.constructor = MaxPlayer;

MaxPlayer.prototype.nextCost = function (maxCost, minCost, column){
    if (maxCost.column === undefined || minCost.value > maxCost.value) {
        maxCost.value = minCost.value;
        maxCost.column = column;
        //logger.info(`PLAYER ${this.color.getCode()} - newCost: ${maxCost.value}, newColumn: ${maxCost.column}`);
    }
}
function MinPlayer(color){
    Minimax.call(this, color, Minimax.MAX_COST, color.getOpposite());
}
MinPlayer.prototype = Object.create(Minimax.prototype);
MinPlayer.prototype.constructor = MinPlayer;

MinPlayer.prototype.nextCost = function (minCost, maxCost, column){
    if (minCost.column === undefined || maxCost.value < minCost.value) {
        minCost.value = maxCost.value;
        minCost.column = column;
        //logger.info(`PLAYER ${this.color.getCode()} - newCost: ${minCost.value}, newColumn: ${maxCost.column}`);
    }
}
function Player(indexColor, board){
    this.color = Color.get(indexColor);
    this.board = board;
}

Player.prototype.isCoordinateColumnEmpty = function () {
    return this.board.isLastCoordinateColumnEmpty();
}

Player.prototype.getCoordinate = function () {
    return this.board.lastCoordinate;
}

Player.prototype.putCoordinate = function () {
    this.board.putLastCoordinate(this.color);
}
function UserPlayer(indexColor, board){
    Player.call(this, indexColor, board);
}
UserPlayer.prototype = Object.create(Player.prototype);
UserPlayer.prototype.constructor = UserPlayer;

UserPlayer.prototype.accept = function (visitor){
    visitor.visitUserPlayer();
}

UserPlayer.prototype.setColumn = function (){
    assert(false,"El usuario escoge su columna mediante la vista");
}
function MachinePlayer(indexColor, board){
    Player.call(this, indexColor, board);
}
MachinePlayer.prototype = Object.create(Player.prototype);
MachinePlayer.prototype.constructor = MachinePlayer;

MachinePlayer.prototype.accept = function (visitor){}

MachinePlayer.prototype.setColumn = function (){}

function RandomMachinePlayer(indexColor, board){
    MachinePlayer.call(this, indexColor, board);
}
RandomMachinePlayer.prototype = Object.create(MachinePlayer.prototype);
RandomMachinePlayer.prototype.constructor = RandomMachinePlayer;

RandomMachinePlayer.prototype.accept = function (visitor){
    visitor.visitMachinePlayer();
}

RandomMachinePlayer.prototype.setColumn = function (){
    const emptyColumns = this.board.getEmptyColumns();
    this.getCoordinate().column = emptyColumns[Math.floor(Math.random() * emptyColumns.length)];
}

function MinimaxMachinePlayer(indexColor, board){
    MachinePlayer.call(this, indexColor, board);
}
MinimaxMachinePlayer.prototype = Object.create(MachinePlayer.prototype);
MinimaxMachinePlayer.prototype.constructor = MinimaxMachinePlayer;

MinimaxMachinePlayer.prototype.accept = function (visitor){
    visitor.visitMinimaxMachinePlayer();
}

MinimaxMachinePlayer.prototype.setColumn = function (){
    const maxPlayer = new MaxPlayer(this.color);
    const minPlayer = new MinPlayer(this.color.getOpposite());
    minPlayer.opposite = maxPlayer;
    maxPlayer.opposite = minPlayer;

    const cost = maxPlayer.getCost(0,this.board);
    this.getCoordinate().column = cost.column;    
}
function PlayerView(player) {
    this.player = player;
}

PlayerView.prototype.playTurn = function () {
    console.writeln(`Turno para ${this.player.color.getCode()}`);
    this.player.accept(this);
    this.player.putCoordinate();
}

PlayerView.prototype.putToken = function (message){
    this.player.setColumn();
    console.writeln(`${message}: ${this.player.getCoordinate().column+1}`); 
}

PlayerView.prototype.visitUserPlayer = function () {
    let coordinateView = new CoordinateView(this.player.getCoordinate());
    let empty;
    do {
        coordinateView.readColumn();
        empty = this.player.isCoordinateColumnEmpty();
        if (!empty) {
            console.writeln(`La columna esta llena, intente con otra`);
        }
    } while (!empty);
}

PlayerView.prototype.visitMachinePlayer = function () {
    this.putToken(`Columna a colocar random`);
}

PlayerView.prototype.visitMinimaxMachinePlayer = function () {
    this.putToken(`Columna a colocar inteligente`);
}

function Turn(board, numOfPlayers){
    this.players = [];
    this.activePlayer = 0;

    switch(numOfPlayers){
        case 0: 
            this.players[0] = new RandomMachinePlayer(0, board);
            this.players[1] = new MinimaxMachinePlayer(1, board);
            break;
        case 1:
            this.players[0] = new UserPlayer(0, board);
            this.players[1] = new MinimaxMachinePlayer(1, board);
            break;
        default:
            this.players[0] = new UserPlayer(0, board);
            this.players[1] = new UserPlayer(1, board);
    }
}

Turn.NUMBER_PLAYERS = 2;

Turn.prototype.next = function () {
    this.activePlayer = (this.activePlayer + 1) % Turn.NUMBER_PLAYERS;
}

Turn.prototype.getToken = function () {
    return this.players[this.activePlayer].color;
}

Turn.prototype.getActivePlayer = function () {
    return this.players[this.activePlayer];
}

function Game(numPlayers) {
    this.board = new Board();
    this.turn = new Turn(this.board, numPlayers);
}    

Game.prototype.isFinished = function () {
    return this.board.isFinished();
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

function GameView(numPlayers) {
    this.game = new Game(numPlayers);
    this.boardView = new BoardView(this.game.board);
}    

GameView.prototype.writeFinish = function () {
    if(this.game.isWinner()){
        console.writeln(`Victoria para ${this.game.getWinnerToken().getCode()}`);
    } else {
        console.writeln(`¡Empate!`);
    }
}

GameView.prototype.play = function () {
    let finished;
    console.writeln(`--------- Connecta 4 --------`);  
    do {
      this.boardView.writeTokens();
      new PlayerView(this.game.turn.getActivePlayer()).playTurn();
      finished = this.game.isFinished();
      if (!finished) {
        this.game.nextTurn();
      }
    } while (!finished);
    this.boardView.writeTokens();
    this.writeFinish();
}

function Option(title, value) {
    this.title = title;
    this.value = value;
}

function Menu(title) {
    this.title = title;
    this.options = [];
    this.answer = undefined;
}

Menu.prototype.add = function (option) {
    this.options.push(option);
}

Menu.prototype.interact = function () {
    this.show();
    this.execChoosedOption();
}

Menu.prototype.show = function () {
    this.showTitle();
    for (let i = 0; i < this.options.length; i++) {
        console.writeln((i+1) + ". " + this.options[i].title);
    }
}

Menu.prototype.showTitle = function () {
    let string = "\n" + this.title + "\n";
    for (let i = 0; i < this.title.length; i++) {
        string += "-";
    }
    console.writeln(string);
}

Menu.prototype.execChoosedOption = function () {
    let ok;
    do {
        this.answer = this.readInt("Escoge una opción [1-" + this.options.length + "]: ") - 1;
        ok = 0 <= this.answer && this.answer <= this.options.length - 1;
        if (!ok) {
            console.writeln("¡Error! la opción debe ser un número entre [1-" + this.options.length + "]");
        }
    } while (!ok);
    console.writeln("\n");
}

Menu.prototype.readInt = function (prompt){
    return Number.parseInt(console.readNumber(prompt));
}

Menu.prototype.getChoosedOptionValue = function (){
    return this.options[this.answer].value;
}

function NumPlayersMenu() {
    Menu.call(this, "Número de Jugadores");
    this.add(new Option("Máquina VS IA", 0));
    this.add(new Option("Jugador VS IA", 1));
    this.add(new Option("Jugador VS Jugador", 2));
}
NumPlayersMenu.prototype = Object.create(Menu.prototype);
NumPlayersMenu.prototype.constructor = NumPlayersMenu;

NumPlayersMenu.prototype.read = function () {
    this.interact();
    return this.getChoosedOptionValue()
}

function YesNoDialog(question) {
    this.question = question;
    this.answer = ``;
}

YesNoDialog.prototype.read = function () {
    let error = false;
    do {
        this.answer = console.readString(this.question);
        error = !this.isAffirmative() && !this.isNegative();
        if (error) {
        console.writeln(`Por favor, responda "si" o "no"`);
        }
    } while (error);
}

YesNoDialog.prototype.isAffirmative = function () {
    return this.answer === `si`;
}

YesNoDialog.prototype.isNegative = function () {
    return this.answer === `no`;
}

function Connect4() {
    this.continueDialog = new YesNoDialog(`¿Quieres jugar otra partida? `);
    this.numPlayersMenu = new NumPlayersMenu();
}

Connect4.prototype.play = function () {
    do {
        const numPlayers = this.numPlayersMenu.read();
        const gameView = new GameView(numPlayers);
        gameView.play();
        this.continueDialog.read();
    } while (this.continueDialog.isAffirmative());
}

new Connect4().play();