document.getElementById("size").value = 1;
let tool = "pen";

document.getElementById("pen").onclick = () => tool="pen";
document.getElementById("eraser").onclick = () => tool="eraser";

//Runs constantly on start
function tick(){

    document.getElementById("size").value = Math.clamp(document.getElementById("size").value, 1, 255)

    //get mouse canvas index
    let index = new vector2(Math.floor((Mouse.position.x-107)/PImage.incr),Math.floor((Mouse.position.y-5)/PImage.incr));
    let size = Number(document.getElementById("size").value);
    let color = new color3(document.getElementById("color").value);

    if (tool == "pen"){

        if (index.x < PImage.x && index.x >= 0 && index.y < PImage.y && index.y >= 0 && Mouse.down){
            for (x = -size+1; x < size; x++){
                for (y = -size+1; y < size; y++){
                    PImage.buffer[Math.clamp(index.x+x,0,PImage.x-1)][Math.clamp(index.y+y,0,PImage.y-1)] = 1;
                }
            }
        }

    }

    if (tool == "eraser"){
        
        if (index.x < PImage.x && index.x >= 0 && index.y < PImage.y && index.y >= 0 && Mouse.down){
            for (x = -size+1; x < size; x++){
                for (y = -size+1; y < size; y++){
                    PImage.buffer[Math.clamp(index.x+x,0,PImage.x-1)][Math.clamp(index.y+y,0,PImage.y-1)] = 0;
                }
            }
        }

    }

    //apply PImage data to canvas
    ctx.applyPImage(PImage.buffer);
    console.log(PImage.buffer);
}