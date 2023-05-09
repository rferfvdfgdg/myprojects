for (x = 0; x < Canvas.x; x++){
    for (y = 0; y < Canvas.y; y++){
        let color = new color3(Math.random()*255);
        let pos = new vector2(x,y);
        Canvas.pixel(pos,color);
    }
}
Canvas.apply();