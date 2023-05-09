let objects = [];
let time = new Date();

const pixel_size = 27;
const pixel_count = 32;
const pixel_array = [];

//Document
document.body.style.background = "#3b3b3b";

canvas.style.width = pixel_count*pixel_size+"px";
canvas.style.height = pixel_count*pixel_size+"px";
canvas.style.imageRendering = "pixelated";

//Draw grid
function drawGrid(){
    for (x = 0; x < pixel_count; x++){
        for (y = 0; y < pixel_count; y++){
            if (pixel_array[y+(x*pixel_count)] instanceof Color3){
                var c = pixel_array[y+(x*pixel_count)];
                DrawPixel(x,y,c.r,c.g,c.b);
            }else{
                if ((y+x)%2 == 0){
                    DrawPixel(x,y,200,200,200);
                }else{
                    DrawPixel(x,y,255,255,255);
                }
            }
        }
    }
}

//Inputs
let size = 1;
let color = "#000000";
document.getElementById("size").value = 1;
document.getElementById("color").value = "#000000";

document.getElementById("size").oninput = function () {

    var input = document.getElementById("size").value;

    if (input == NaN){
        document.getElementById("size").value = 1;
    }
    if (Number(input) && String(input).length > 3){
        document.getElementById("size").value = Number(String(input).slice(0,3));
    }
    if (input < 1){
        document.getElementById("size").value = 1;
    }
    if (input > 999){
        document.getElementById("size").value = 999;
    }

    size = document.getElementById("size").value;

};

document.getElementById("color").oninput = function () {

    color = document.getElementById("color").value;

};

const file = new File([1,2,3,4,5], "nums.txt");
var current_tool = "pen";

//Main function
function start(){

    //Runs continuously
    function Tick(){
    
        //Render objects
        //ctx.clearRect(0,0,2000,2000);
        //objects.forEach(Render);

        var x = (mouse.position.x-25)/pixel_size;
        var y = (mouse.position.y-25)/pixel_size;

        drawGrid();
        ctx.putImageData(canvasData,0,0);

        if (mouse.down && mouse.position.x > 10 && mouse.position.x < (pixel_count*pixel_size)+10 && mouse.position.y > 10 && mouse.position.y < (pixel_count*pixel_size)+10){

            if (current_tool == "pen"){
                for (n = -size/2; n < size/2; n++){
                    for (i = -size/2; i < size/2; i++){
                        var X = x+n;
                        var Y = y+i;
                        if (X < 0){
                            X = 0;
                        }
                        if (X > canvas.width-1){
                            X = canvas.width-1;
                        }
                        if (Y < 0){
                            Y = 0;
                        }
                        if (Y > canvas.height-1){
                            Y = canvas.height-1;
                        }
                        var ind = Math.ceil(Y)+(Math.ceil(X)*pixel_count);
                        var col = HexToRgb(color);
                        pixel_array[ind] = new Color3(col.r, col.g, col.b);
                    }
                }
            }

            if (current_tool == "erase"){
                for (n = -size/2; n < size/2; n++){
                    for (i = -size/2; i < size/2; i++){
                        var X = x+n;
                        var Y = y+i;
                        if (X < 0){
                            X = 0;
                        }
                        if (X > canvas.width-1){
                            X = canvas.width-1;
                        }
                        if (Y < 0){
                            Y = 0;
                        }
                        if (Y > canvas.height-1){
                            Y = canvas.height-1;
                        }
                        var ind = Math.ceil(Y)+(Math.ceil(X)*pixel_count);
                        pixel_array[ind] = null;
                    }
                }
            }
  
        }

        if (keyboard.keys["x"]){
            current_tool = "erase";
        }
        if (keyboard.keys["c"]){
            current_tool = "pen";

            var pixel_data = "";
            var array = [];

            for (x = 0; x < pixel_count; x++){
                for (y = 0; y < pixel_count; y++){

                    var ind = y+(x*pixel_count);

                    var r = pixel_array[ind] ? pixel_array[ind].r.toString(16) : "ff";
                    var g = pixel_array[ind] ? pixel_array[ind].g.toString(16) : "ff";
                    var b = pixel_array[ind] ? pixel_array[ind].b.toString(16) : "ff";

                    r = r.length<2 ? "0"+r : r;
                    g = g.length<2 ? "0"+g : g;
                    b = b.length<2 ? "0"+b : b;

                    array[ind] = r+g+b;

                    pixel_data += r+g+b+",";
                    

                }
            }
            console.log(pixel_data);
        }

        oldx = x;
        oldy = y;

    }

    setInterval(Tick, 1);
}

setTimeout(start,10);