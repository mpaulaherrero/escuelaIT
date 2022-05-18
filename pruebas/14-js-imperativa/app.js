const salidaComparar = (result, x, y, z, op) => {
    if (result) console.log(`Comparar ${ typeof x === "string" ? `"${x}"`: x}${op}${typeof y === "string"  ? `"${y}"`: y}${op}${ typeof z === "string"  ? `"${z}"`:z} retorna true`);
    else console.log(`Comparar ${ typeof x === "string" ? `"${x}"`: x}${op}${typeof y === "string"  ? `"${y}"`: y}${op}${ typeof z === "string"  ? `"${z}"`:z} retorna false`);
}

const compararEstricto = (x, y, z) => {
     salidaComparar(x===y===z, x, y, z, "===");
}

const comparar = (x, y, z) => {
    salidaComparar(x==y==z, x, y, z, "==");
}

const compararMenor = (x, y, z) => {
    salidaComparar(x<y<z, x, y, z, "<");
}

compararEstricto(1, 2, false);
compararEstricto("3", 3, false);
comparar(5, 4, 0);
comparar(3, 3, "true");
comparar(3, 3, true);
comparar(3, 3, 1);
comparar(10, '10', 10);
comparar(4, 4, 4);
comparar("1", 1, 1.0);

compararMenor(1, 1, 1);
compararMenor(5, 6, 1);
compararMenor(5, 6, 0);
compararMenor(6, 5, 0);
compararMenor(5, 6, 1);
compararMenor(5, 6, 2);
compararMenor(6, 5, 2);
compararMenor(1, 3, 5);
compararMenor(true, 1, '1');
compararMenor(true, 1, Infinity);
compararMenor(true, 1, "cadena");
compararMenor(true, 1, "0cadena");

//por coerción si pregunto en un condicional por la varialbe sola vale true
//, pero si lo comparo con otra no
let numVar = 4;
let boolVar = true;

if(numVar) console.log(`Comparar ${typeof numVar === "string" ? `"${numVar}"`:numVar} retorna true`);
else console.log(`Comparar ${typeof numVar === "string" ? `"${numVar}"`:numVar} retorna false`);

if(numVar==boolVar) console.log(`Comparar ${typeof numVar === "string" ? `"${numVar}"`:numVar}==${typeof boolVar === "string" ? `"${boolVar}"`:boolVar} retorna true`);
else console.log(`Comparar ${typeof numVar === "string" ? `"${numVar}"`:numVar}==${typeof boolVar === "string" ? `"${boolVar}"`:boolVar} retorna false`);

console.log(`1*2+3*4+5*6=>${1*2+3*4+5*6}`);
console.log(`true&&false||false&&true||true&&false=>${true&&false||false&&true||true&&false}`);
console.log(`undefined===undefined=>${undefined===undefined}`);
console.log(`NaN===NaN=>${NaN===NaN}`);
console.log(`null===null=>${null===null}`);
console.log(`true==Infinity=>${true==Infinity}`);