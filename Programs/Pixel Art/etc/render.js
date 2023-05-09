let imagex, imagey;
do{
    imagex = prompt("Width:", "32");
}while (Number(imagex) < 2 || Number(imagex) > 256 || isNaN(Number(imagex)))
console.log(Number(imagex));
do{
    imagey = prompt("Height:", "32");
}while (Number(imagey) < 2 || Number(imagey) > 256 || isNaN(Number(imagey)))

const PImage = [];
PImage.x = Number(imagex);
PImage.y = Number(imagey);
PImage.incr = 720/Math.max(PImage.x,PImage.y);
PImage.buffer = [];
for (x_ = 0; x_ < PImage.x; x_++){
    PImage.buffer[x_] = [];
    for (y_ = 0; y_ < PImage.y; y_++){
        PImage.buffer[x_][y_] = 0;
    }
}

///BACKGROUND CANVAS///
let canvas1 = document.createElement("canvas");
canvas1.style.imageRendering = "Pixelated";
canvas1.style.position = "absolute";
canvas1.style.zIndex = "2";
canvas1.width = PImage.x;
canvas1.height = PImage.y;
canvas1.style.width = PImage.x*PImage.incr + "px";
canvas1.style.height = PImage.y*PImage.incr + "px";
canvas1.style.left = "100px";
canvas1.style.border = "solid #071625 4px";
document.body.appendChild(canvas1);
let ctx1 = canvas1.getContext("2d");
canvas1.pixels = ctx1.getImageData(0,0,canvas1.width,canvas1.height);
for (x_ = 0; x_ < canvas1.width; x_++){
    for (y_ = 0; y_ < canvas1.height; y_++){
        if ((x_+y_)%2==0){
            var index = (x_+y_*canvas1.width)*4;
            canvas1.pixels.data[index+0] = 224;
            canvas1.pixels.data[index+1] = 224;
            canvas1.pixels.data[index+2] = 224;
            canvas1.pixels.data[index+3] = 255;
        }else{
            var index = (x_+y_*canvas1.width)*4;
            canvas1.pixels.data[index+0] = 255;
            canvas1.pixels.data[index+1] = 255;
            canvas1.pixels.data[index+2] = 255;
            canvas1.pixels.data[index+3] = 255;
        }
    }
}
ctx1.putImageData(canvas1.pixels,0,0);

///DRAWING CANVAS///
const canvas = document.createElement("canvas");
canvas.style.imageRendering = "Pixelated";
canvas.style.position = "absolute";
canvas.style.zIndex = "5";
canvas.width = PImage.x;
canvas.height = PImage.y;
canvas.style.width = PImage.x*PImage.incr + "px";
canvas.style.height = PImage.y*PImage.incr + "px";
canvas.style.left = "100px";
canvas.style.border = "solid #071625 4px";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
canvas.pixels = ctx.getImageData(0,0,canvas.width,canvas.height);

///CANVAS FUNCTIONS///
ctx.apply = function(){
    ctx.putImageData(canvas.pixels,0,0);
}

ctx.pixel = function(x_,y_,col_){
    let x, y, color;
    if (typeof x_ == "number"){
        x = x_;
        y = y_;
        color = (typeof col_ == "number") ? new color3(col_):col_;
    }else{
        x = x_.x;
        y = x_.y;
        color = (typeof y_ == "number") ? new color3(y_):y_;
    }
    var index = (x+y*canvas.width)*4;
    canvas.pixels.data[index+0] = color.r;
    canvas.pixels.data[index+1] = color.g;
    canvas.pixels.data[index+2] = color.b;
    canvas.pixels.data[index+3] = 255;
}

ctx.applyPImage = function(buffer){
    for (x_ = 0; x_ < canvas.width; x_++){
        for (y_ = 0; y_ < canvas.height; y_++){
            if (buffer[x_][y_] == 1){
                ctx.pixel(x_,y_,buffer[x_][y_]);
            }
        }
    }
    ctx.apply();
}