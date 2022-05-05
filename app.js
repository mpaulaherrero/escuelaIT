let x=1;
let y=2;
let z=false;
//se lee de izq a derecha y para que retorne true z debe tener el mismo valor booleano resultado de igualar x y y
if (x===y===z) console.log("retorna true");
else console.log("retorna false");

x=5;
y=4;
z=0;

//se lee de izq a derecha y para que para que retorne true z debe tener el mismo valor booleano o cast resultado de igualar x y y, dado que no tienen que ser del mismo tipo
if (x==y==z) console.log("retorna true");
else console.log("retorna false");

console.log(1*2+3*4+5*6)

console.log(true&&false||false&&true||true&&false)