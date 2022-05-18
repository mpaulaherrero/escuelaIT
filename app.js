const { Console } = require("console-mpds");
const console = new Console();

[head, ...rest] = [];
console.writeln(head); // undefined
console.writeln(rest); // undefined