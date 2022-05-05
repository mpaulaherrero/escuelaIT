let x=1;
let y=2;
let z=false;
//ojo con esto por que es una trampa que viene del mundo de la matemática
//se lee de izq a derecha y para que retorne true z debe tener el mismo valor booleano resultado de igualar x y y por valor y tipo
//x y y iguales en valor y tipo y z valor true o x y y diferentes en valor y/o tipo y z valor false
//esto se cumple exceptuando NaN
if (x===y===z) console.log("1. retorna true");
else console.log("1. retorna false");

x="3";
y=3;
z=false;
if (x===y===z) console.log("2. retorna true");
else console.log("2. retorna false");

x=5;
y=4;
z=0;

//se lee de izq a derecha y para que para que retorne true z debe tener el mismo valor booleano o la coerción del mismo 
// resultado de igualar x y y, dado que no tienen que ser del mismo tipo
if (x==y==z) console.log("3. retorna true");
else console.log("3. retorna false");

x=3
y=3;
z="true";
if (x==y==z) console.log("4. retorna true");
else console.log("4. retorna false");

x=3;
y=3;
z=true;
if (x==y==z) console.log("5. retorna true");
else console.log("5. retorna false");

x=10;
y='10';
z=10;
if (x==y==z) console.log("6. retorna true");
else console.log("6. retorna false");

x=4;
y=4;
z=4;
if (x==y==z) console.log("7. retorna true");
else console.log("7. retorna false");

console.log(1*2+3*4+5*6)

console.log(true&&false||false&&true||true&&false)

console.log(undefined===undefined);
console.log(NaN===NaN);
console.log(null===null);
console.log(true==Infinity);
console.log(true==4);
console.log(false==4);
console.log(4==true);

//si lo tengo solo vale true, pero si lo comparo no
let boolVar = 4;
let boolVar2 = true;

if(boolVar) console.log("8. retorna true");
else console.log("8. retorna false");

if(boolVar==boolVar2) console.log("9. retorna true");
else console.log("9. retorna false");