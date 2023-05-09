const length = 1000;
const seed = Math.random()*100000;
const tiles = []

const tile_size = 10;

for (n=0;n<length/tile_size;n++){
    tiles[n]=[];
}

Math.func(length/tile_size,length/tile_size,function(x,y){

    var freq = 25;
    var inte = 15;
    var height = Math.perlinNoise(x/freq,0,seed)+(Math.perlinNoise(x/(freq/2),0,seed)/4)+(Math.perlinNoise(x/(freq/4),0,seed)/8);
    height *= inte;
    height += 25;

    var freq = 5;
    var ore = Math.voronoiNoise(x/freq,y/freq,seed,1);
    ore *= 255;

    if (y<height){
        tiles[x][y] = 0;
    }else{
        tiles[x][y] = 1;
        if (ore<15){
            tiles[x][y] = 2;
        }
    }

});

Math.func(length,length,function(x,y){

    var ix = Math.floor(x/tile_size);
    var iy = Math.floor(y/tile_size);

    if (tiles[ix][iy] == 2){
        ctx.pixel(y,x,new color3(25,50,75));
    } 
    if (tiles[ix][iy] == 1){
        ctx.pixel(y,x,new color3(100,200,50));
    }

});


ctx.putImageData(canvas_data,0,0);