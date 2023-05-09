let objects = [];
let time = new Date();

//Main function
function start(){

    for (n = 0; n < 10000; n++){
        new (new Vector2(Random(-1000,1000),Random(-1000,1000)), new Vector2(10,10), Color(Random(1,255),Random(1,255),Random(1,255)));
    }

    var size = new Vector2(canvas.width, canvas.height);

    for (var x = -5; x < 5; x++){
        for (var y = -5; y < 5; y++){
            DrawPixel((canvas.width/2)+x,(canvas.height/2)+y,10,10,10);
        }
    }

    //Runs continuously
    function Tick(){

        //Delta
        const t1 = new Date();
    
         //Render objects
        ctx.clearRect(0,0,2000,2000);
        ctx.putImageData(canvasData, 0, 0);
        objects.forEach(Render);

        //Stuff
        if (keyboard.keys["w"]){
            camera.position.y += (camera.speed*((camera.zmax+1)-camera.zoom))*delta;
        }
        if (keyboard.keys["s"]){
            camera.position.y -= (camera.speed*((camera.zmax+1)-camera.zoom))*delta;
        }
        if (keyboard.keys["a"]){
            camera.position.x += (camera.speed*((camera.zmax+1)-camera.zoom))*delta;
        }
        if (keyboard.keys["d"]){
            camera.position.x -= (camera.speed*((camera.zmax+1)-camera.zoom))*delta;
        }

        if (keyboard.keys["ArrowDown"]){
            camera.zoom += (camera.zoomspeed*camera.zoom)*delta;
            camera.zoom = Math.min(Math.max(camera.zoom, camera.zmin), camera.zmax)
        }
        if (keyboard.keys["ArrowUp"]){
            camera.zoom -= (camera.zoomspeed*camera.zoom)*delta;
            camera.zoom = Math.min(Math.max(camera.zoom, camera.zmin), camera.zmax)
        }

        //Set delta
        var t2 = new Date();
        delta = Math.min(Math.max(1/(t2.getTime()-t1.getTime()),0.01), 1);

    }

    setInterval(Tick, 1);
}

setTimeout(start,10);