let objects = [];

//Main function
function start(){

    let rect = new Rect(new Vector2(100,25), new Vector2(100,100), "blue");
    let sprite = new Sprite(new Vector2(100,25), new Vector2(500,500), document.getElementById("sprite"));
    
    
    //Runs continuously
    function Tick(){
    
        //Render objects
        ctx.clearRect(0,0,10000,10000);
        objects.forEach(Render);

        rect.position.x += 0.2;
        sprite.position.x += 1;
    
    }

    setInterval(Tick, 1);
}

setTimeout(start,10);