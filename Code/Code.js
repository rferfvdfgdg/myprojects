let objects = [];

let rect;
let sprite;

//Runs once at the start
function Start(){

    //Start tick
    setInterval(Tick, 1)

    rect = new Rect(new Vector2(100,25), new Vector2(50,100), "blue");
    sprite = new Sprite(new Vector2(172,25), new Vector2(100,25), document.getElementById("sprite"));

}


//Runs continuously
function Tick(){

    ctx.clearRect(0,0,1000,1000);

    //Render objects
    objects.forEach(Render);
    console.log(mouse.position);

}

setTimeout(Start, 12);