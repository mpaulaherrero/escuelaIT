const { Console } = require("console-mpds");
const console = new Console();

let anominaDosOMasParametros =
  function(x, y)
    { x++; y++; console.writeln(x+y); };
console.writeln(typeof anominaDosOMasParametros);
console.writeln(anominaDosOMasParametros);
console.writeln(anominaDosOMasParametros(1, 2));

let flechaDosOMasParametros =
  (x, y) =>
    { x++; y++; console.writeln(x+y); };
console.writeln(typeof flechaDosOMasParametros);
console.writeln(flechaDosOMasParametros);
console.writeln(flechaDosOMasParametros(1, 2));

let anominaUnParametro =
  function(x)
    { x++; console.writeln(x); };
console.writeln(typeof anominaUnParametro);
console.writeln(anominaUnParametro);
console.writeln(anominaUnParametro(1));

let flechaUnParametro =
  x =>
    { x++; console.writeln(x); };
console.writeln(typeof flechaUnParametro);
console.writeln(flechaUnParametro);
console.writeln(flechaUnParametro(1));

let anominaCeroParametros =
  function()
    { console.writeln(0); };
console.writeln(typeof anominaCeroParametros);
console.writeln(anominaCeroParametros);
console.writeln(anominaCeroParametros());

let flechaCeroParametros =
  () =>
    { console.writeln(0); };
console.writeln(typeof flechaCeroParametros);
console.writeln(flechaCeroParametros);
console.writeln(flechaCeroParametros());

let anominaSoloRetorno =
  function(x)
    { return x+1; };
console.writeln(typeof anominaSoloRetorno); 
console.writeln(anominaSoloRetorno); 
console.writeln(anominaSoloRetorno(1)); 

let flechaSoloRetorno =
  x => x+1;
console.writeln(typeof flechaSoloRetorno); // function
console.writeln(flechaSoloRetorno); // x => x+1
console.writeln(flechaSoloRetorno(1)); //2

console.writeln(sum(1, 10, (x) => { return 2*x; }));
console.writeln(sum(1, 10, x => { return 2*x; }));
console.writeln(sum(1, 10, x => 2*x));

function sum(from, to, operation) {
  let result = 0;
  for(let i=from; i<=to; i++){
    result += operation(i);
  }
  return result;
}

let double = function(x) {
  return 2*x;
}

console.writeln(sum(1, 10, double));
