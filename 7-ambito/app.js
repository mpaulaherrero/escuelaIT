for (var i = 0; i <= 5; i++) {
    var cont = i; 
}
console.log(cont);

var y=3;
function A(){
    var x = 2;
    function B(){
        return x + y;
    }
    return B();
}
console.log(A());

var y=3;
function A(){
    var x = 2;
    function B(){
        return x + y;
    }
    return B();
}
console.log(A());

let z=3;
function C(){
    let x = 2;
    function D(){
        return x + z;
    }
    return D();
}
console.log(C());

let nivel0 = 100;
console.log(`---`);
nivel0++;
console.log(nivel0); // 101

{
  let nivel1 = 200;
  console.log(`---`);
  nivel1++;
  console.log(nivel1); // 201
  nivel0++;
  console.log(nivel0); // 102

  {
    let nivel2 = 300;
    console.log(`---`);
    nivel2++;
    console.log(nivel2); // 301
    nivel1++;
    console.log(nivel1); // 202
    nivel0++;
    console.log(nivel0); // 103
  }
  console.log(`---`);
  nivel1++;
  console.log(nivel1); // 203
  nivel0++;
  console.log(nivel0); // 104
}
console.log(`---`);
nivel0++;
console.log(nivel0); // 105

{
  console.log(`---`);
   nivel0++;
  console.log(nivel0); // 106
}

//var ourLocalVariable = "Hi";
function someFunction() {
    var ourLocalVariable = "Hello";
    return ourLocalVariable;
}
//console.log(ourLocalVariable);
//Returns ---> ReferenceError: ourLocalVariable is not defined

function ourScopeExample(){
    console.log(one);
    if (true){
        var one = "I was created using var";
    }
    console.log(one);
}
ourScopeExample();//Returns ---> I was created using var
//console.log(one);

function ourScopeExample(){
    if(true){
        let two = "Created using let";
    }
//    console.log(two);
}
//ourScopeExample();

function outerParent(){
    var one = "I was created using var";        
    let two = "I was created using let";    
    
    function innerChild(){
        console.log(one);
        console.log(two);
    }
    innerChild();
}

outerParent();
//Returns --->
//I was created using var
//I was created using let
let ourGlobalVariable = "Hello";
{
  console.log(ourGlobalVariable);
}
//Returns ---> 'Hello'

{
  let ourLocalVariable = "Bye";
}
//console.log(ourLocalVariable);
//Returns ---> ReferenceError: ourLocalVariable is not defined

function crearObjeto(suma) {
    return { 
        suma, 
        resta: 10, 
        metodo() {
           privado(this);
           console.log(`suma: ${this.suma} - resta: ${this.resta}`)
        }
    };

    function privado(objeto) {
        objeto.suma++;
        objeto.resta--;
        console.log("entre a privado");
    }
}

const o = crearObjeto(7);
o.metodo();
//suma: 8 - resta: 9  
 
let objeto = {
    suma: 0,
    resta: 10,
    metodo: function () {
        this.suma++;
        this.resta--;
        console.log(`suma: ${this.suma} - resta: ${this.resta}`)
    }
};

objeto.metodo();