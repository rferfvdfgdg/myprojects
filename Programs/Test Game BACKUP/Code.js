let objects = [];
let time = new Date();

//Main function
function start(){

    //Set Variables
    const BLOCKS = [];
    const SPRITE_SIZE = 16;
    const SIZE = new Vector2(500,50);
    const SEED = Random(1,100000);
    
    const FRICTION = 0.03;
    const GRAVITY = 0.01;

    // "Noise" function //
    function Noise(X,f,i){
        var noise = Math.sin(X/f)+(Math.sin((X/f)/2)*2)+(Math.sin((X/f)/3)*3)+(Math.sin((X/f)/4)*4)+(Math.sin((X/f)/5)*5);
        return Math.round(noise*i);
    }

    //Generate map
    for (x = -SIZE.x/2; x<SIZE.x/2; x++){

        var X = (x+SEED);
        var noise = Noise(X,3,0.4);

        for (y = 0; y<SIZE.y-noise; y++){

            if (y <= 1){
                BLOCKS[x+","+(y+noise)] = new Sprite(new Vector2(x*SPRITE_SIZE,(y+noise)*SPRITE_SIZE), new Vector2(SPRITE_SIZE,SPRITE_SIZE), document.getElementById("Grass"))
            }else{
                if (y < 5){
                    BLOCKS[x+","+(y+noise)] = new Sprite(new Vector2(x*SPRITE_SIZE,(y+noise)*SPRITE_SIZE), new Vector2(SPRITE_SIZE,SPRITE_SIZE), document.getElementById("Dirt"))
                }else{
                    BLOCKS[x+","+(y+noise)] = new Sprite(new Vector2(x*SPRITE_SIZE,(y+noise)*SPRITE_SIZE), new Vector2(SPRITE_SIZE,SPRITE_SIZE), document.getElementById("Stone"))
                }
            }  
        }
    }

    var rarity = 50;

    //Generate ore
    for (const key in BLOCKS){

        //Get position from key
        var pos = new Vector2(Number(key.split(",")[0]), Number(key.split(",")[1]));

        //Check if block is stone
        if (BLOCKS[key].image == document.getElementById("Stone")){
            if (Noise(pos.x,0.5,0.4)+Noise(pos.y,0.2,0.4) > 3){
                BLOCKS[key].image = document.getElementById("Copper_Ore");
            }
        }
    }

    //Generate background
    for (x = 0; x < canvas.width; x++){
        for (y = 0; y < canvas.height; y++){
            DrawPixel(x,y,125,200,240)
        }
    }

    const PLAYER = new Rect(new Vector2(0,-100), new Vector2(SPRITE_SIZE-2,SPRITE_SIZE-2), "blue", 2)
    const SPEED = 0.7;
    const JUMPSPEED = 1;

    const velocity = new Vector2(0,0);

    //Runs continuously
    function Tick(){

        //Sort objects by z value
        objects.sort(function(a, b) {
            return a.zvalue - b.zvalue;
        })

        //Player Collision
        var ix = Math.ceil((PLAYER.position.x-2)/SPRITE_SIZE)
        var iy = Math.ceil((PLAYER.position.y-2)/SPRITE_SIZE)

        function GetCollision(n1,n2,n3,n4){
            if (n1){
                if (BLOCKS[ix+","+(iy-1)]){
                    if(PLAYER.position.y < iy*SPRITE_SIZE){
                        return true
                    }
                }
                if (BLOCKS[(ix-1)+","+(iy-1)]){
                    if(PLAYER.position.y > iy*SPRITE_SIZE){
                        return true
                    }
                }
            }
            if (n2){
                if (BLOCKS[ix+","+(iy+1)]){
                    if(PLAYER.position.y > iy*SPRITE_SIZE){
                        return true
                    }
                }
                if (BLOCKS[(ix-1)+","+(iy+1)]){
                    if(PLAYER.position.y > iy*SPRITE_SIZE){
                        return true
                    }
                }
            }
            if (n3){
                if (BLOCKS[(ix-1)+","+iy]){
                    if(PLAYER.position.x-2 < ix*SPRITE_SIZE){
                        return true
                    }
                }
            }
            if (n4){
                if (BLOCKS[(ix+1)+","+iy]){
                    if(PLAYER.position.x > ix*SPRITE_SIZE){
                        return true
                    }
                }
            }
        }

        //Move Player
        function Control(){

               //Delta
               const t1 = new Date();
    
               //Render objects
               ctx.clearRect(0,0,2000,2000);
               ctx.putImageData(canvasData, 0, 0);
               objects.forEach(Render);
       
               //Jump
               if (keyboard.keys[" "]){
                if (velocity.y == 0){
                    velocity.y = -JUMPSPEED;
                }
               }

               //Move
               if (keyboard.keys["a"]){
                velocity.x = -SPEED;
               }
               if (keyboard.keys["d"]){
                velocity.x = SPEED;
               }
       
               //Zoom
               if (keyboard.keys["ArrowDown"]){
                   camera.zoom += (camera.zoomspeed*camera.zoom)*delta;
                   camera.zoom = Math.min(Math.max(camera.zoom, camera.zmin), camera.zmax)
               }
               if (keyboard.keys["ArrowUp"]){
                   camera.zoom -= (camera.zoomspeed*camera.zoom)*delta;
                   camera.zoom = Math.min(Math.max(camera.zoom, camera.zmin), camera.zmax)
               }

                //Gravity
                velocity.y += GRAVITY;
                velocity.x += -Math.sign(velocity.x)*FRICTION;

               if (Math.abs(velocity.x)<=FRICTION){
                velocity.x = 0;
               }
                
                //Move
                PLAYER.position.y += (velocity.y*((camera.zmax+1)-camera.zoom))*delta;
                PLAYER.position.x += (velocity.x*((camera.zmax+1)-camera.zoom))*delta;

                //Collision
                if (velocity.y < 0){
                    if (GetCollision(1,0,0,0)){
                        PLAYER.position.y = ((iy)*SPRITE_SIZE);
                        velocity.y = 0;
                    }
                }else{
                    if (GetCollision(0,1,0,0)){
                        PLAYER.position.y = ((iy)*SPRITE_SIZE)+2;
                        velocity.y = 0;
                    }
                }
                if (velocity.x < 0){
                    if (GetCollision(0,0,1,0)){
                        PLAYER.position.x = ((ix)*SPRITE_SIZE);
                        velocity.x = 0;
                    }
                }else{
                    if (GetCollision(0,0,0,1)){
                        PLAYER.position.x = ((ix)*SPRITE_SIZE)+2;
                        velocity.x = 0;
                    }
                }
       
               //Set delta
               var t2 = new Date();
               delta = Math.min(Math.max(1/(t2.getTime()-t1.getTime()),0.01), 1);
        
        }
        Control();

        //Lock player with camera pos
        camera.position.y = -PLAYER.position.y-(SPRITE_SIZE/2)+1;
        camera.position.x = -PLAYER.position.x-(SPRITE_SIZE/2)+1;

    }

    setInterval(Tick, 1);
}

setTimeout(start,10);