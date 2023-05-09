const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvas_data = ctx.getImageData(0,0,canvas.width,canvas.height);

ctx.pixel = function(x,y,color){
    var index = (y+x*canvas.width)*4;
    canvas_data.data[index+0] = color.r;
    canvas_data.data[index+1] = color.g;
    canvas_data.data[index+2] = color.b;
    canvas_data.data[index+3] = 255;
}