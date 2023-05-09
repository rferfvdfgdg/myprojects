let objects = [];

var bob = 2;

//Runs once at the start
function Start(){

    //Start tick
    setInterval(Tick, 1)
    move = new Vector2(0,0);
    zoom = 0;

}

class Big{
    constructor(a,b,c,d,e){
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        return this;
    }
}

function Add(n1,n2){
    if (n1.a+n2.a > numlimit){
        n1.a = (n1.a+n2.a)-numlimit
        n1.b += 1;
    }
    n1.b += n2.b;
}

function Subtract(n1,n2){
    if (n1.a-n2.a <= 0){
        n1.a = numlimit-(n1.a-n2.a)
        n1.b -= 1;
    }
    n1.b -= n2.b;
}

var numlimit = 10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;

var bob1 = new Big(10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,1);
var bob2 = new Big(100,3);

console.log(bob1);
Add(bob1, bob2);
console.log(bob1);
Subtract(bob1, bob2);
console.log(bob1);

//Runs continuously
function Tick(){

    //Render objects
    ctx.clearRect(0,0,1000,1000);
    objects.forEach(Render);

}

setTimeout(Start, 30)