const Canvas = document.getElementById("canvas").getContext("2d");
Canvas.canvas = document.getElementById("canvas");
Canvas.x = Canvas.canvas.width;
Canvas.y = Canvas.canvas.height;
Canvas.pixels = Canvas.getImageData(0,0,Canvas.x,Canvas.y);

Canvas.apply = function(){
    Canvas.putImageData(Canvas.pixels,0,0);
}

Canvas.pixel = function(x_,y_,col_){
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
    var index = (y+x*Canvas.x)*4;
    Canvas.pixels.data[index+0] = color.r;
    Canvas.pixels.data[index+1] = color.g;
    Canvas.pixels.data[index+2] = color.b;
    Canvas.pixels.data[index+3] = 255;
}