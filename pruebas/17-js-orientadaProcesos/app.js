const { Console } = require("console-mpds");
const console = new Console();

function showYearOfBirth(){
	let age = console.readString(`Escriba tu edad: `);
	let year = 2022-age-1;
	console.writeln(`Naciste en el año: ${year}` );
}

function getRandomIntegerValue(){
	return parseInt(Math.random()*4 + 1);
}

function getUserName(){
	return console.readString(`Escriba su nombre: `);
}

function showWelcomeMessageUser(name){
	console.writeln(`Hola ${name}, bienvenido a la aplicación`);
}

function showFactorial(number){
	let result = 1;
	for (let i = 1; i <= number; i++) {
	    result *= i;
	}
	console.writeln(`El factorial de ${number} es ${result}`);
}

function addArrayValue(array, value){
	array[array.length] = value;
}

showYearOfBirth();
console.writeln(getRandomIntegerValue());
let name = getUserName();
showWelcomeMessageUser(name);
showFactorial(3);

let array = [1, 2];
addArrayValue(array, 3);
console.writeln(array);



