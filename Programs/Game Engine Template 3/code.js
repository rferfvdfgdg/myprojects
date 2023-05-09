const length = 900;
const seed = Math.random()*100000;
const tiles = []

const tile_size = 10;

for (n=0;n<length/tile_size;n++){
    tiles[n]=[];
}

const tile_index = [

    ["air"],
    ["grass", new color3(125,165,65)],
    ["dirt", new color3(125,75,50)],
    ["stone", new color3(75,75,85)],
    ["copper_ore", new color3(75,125,115)]

]

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
        tiles[x][y] = tile_index[0];
    }else{
        tiles[x][y] = tile_index[3];
        if (y<height+5){
            tiles[x][y] = tile_index[2];
            if (y<height+1){
                tiles[x][y] = tile_index[1];
            }
        }else{
            if (ore<15){
                tiles[x][y] = tile_index[4];
            }
        }
    }
``
});

Math.func(length,length,function(x,y){

    var len = 50;
    for (z = len; z > 0; z--){
        var ix = Math.floor(x/tile_size);
        var iy = Math.floor(y/tile_size);
    
        if (tiles[ix][iy][0] != "air"){
            var ncol = new color3((tiles[ix][iy][1].r-len)+z, (tiles[ix][iy][1].g-len)+z, (tiles[ix][iy][1].b-len)+z)
            ctx.pixel((y-z),x,ncol);
        } 
    }

});


ctx.putImageData(canvas_data,0,0);

function tick(){
    //tx.clearRect(0,0,canvas.width,canvas.height);

    for (z = 0; z < 100; z++){
        for (x = 0; x < 100; x++){
            for (y = 0; y < 100; y++){
                var ix = Math.floor(x/tile_size);
                var iy = Math.floor(y/tile_size);
            
                if (tiles[ix][iy][0] != "air"){
                    ctx.pixel((y+z),x,tiles[ix][iy][1]);
                }
            }
        }
    }
}


window.setInterval(tick,1);