class vector2 {
    constructor(x, y){
        this.x = x;
        this.y = y;
        return this;
    }
}

class color3 {
    constructor(r,g,b){
        this.r = r;
        this.g = g;
        this.b = b;
        return this;
    }
    get hex(){
        var hr = this.r.toString(16);
        var hg = this.g.toString(16);
        var hb = this.b.toString(16);
        hr = hr.length<2 ? "0"+hr:hr;
        hg = hg.length<2 ? "0"+hg:hg;
        hb = hb.length<2 ? "0"+hb:hb;
        return "#"+hr+hg+hb;
    }
}

class camera {
    constructor(){
        this.pos = new vector2(0,0);
        this.zoom = 0;
        return this;
    }
}

Math.dot = function(v1,v2){
    return (v1.x*v2.x)+(v1.y*v2.y);
}

Math.func = function(x,y,func){
    for (x_=0;x_<x;x_++){
        for (y_=0;y_<y;y_++){
            func(x_,y_);
        }
    }
}

Math.randomSeeded = function(seed){
    var s_seed = String(Math.round((seed+12)*123));
    var buffer = 0;
    for (char=0;char<s_seed.length;char++){
           buffer += Number(s_seed.charAt(char))**2;
    }
    buffer **= 2;
    buffer = (buffer*this.PI)-Math.floor(buffer*this.PI);
    return buffer;
}

Math.clamp = function(value,min,max){
    return Math.max(Math.min(value,max),min);
}

Math.mag = function(v1,v2){
    return Math.sqrt(((v1.x-v2.x)**2)+((v1.y-v2.y)**2));
}

Math.valueNoise = function(x,y,seed){
    var ix = Math.floor(x);
    var iy = Math.floor(y);
    var gx = x-ix;
    var gy = y-iy;

    gx = (3*gx**2)-(2*gx**3);
    gy = (3*gy**2)-(2*gy**3);

    var p00 = Math.randomSeeded(((ix+0)+(iy+0)*length)+seed);
    var p10 = Math.randomSeeded(((ix+1)+(iy+0)*length)+seed);
    var p01 = Math.randomSeeded(((ix+0)+(iy+1)*length)+seed);
    var p11 = Math.randomSeeded(((ix+1)+(iy+1)*length)+seed);

    var blerp0 = p00+(p10-p00)*gx;
    var blerp1 = p01+(p11-p01)*gx;
    var blerp2 = blerp0+(blerp1-blerp0)*gy;
    blerp2 = Math.clamp(blerp2,0,1);
    return blerp2;
}

Math.perlinNoise = function(x,y,seed){
    var ix = Math.floor(x);
    var iy = Math.floor(y);
    var gx = x-ix;
    var gy = y-iy;

    function getNumber(x,y,seed){
        return (Math.randomSeeded(((x+0)+(y+0)*length)+seed)*10)-5;
    }

    var p00 = new vector2(getNumber(ix+0,iy+0,seed),getNumber(ix+0,iy+0,seed+5));
    var p10 = new vector2(getNumber(ix+1,iy+0,seed),getNumber(ix+1,iy+0,seed+5));
    var p01 = new vector2(getNumber(ix+0,iy+1,seed),getNumber(ix+0,iy+1,seed+5));
    var p11 = new vector2(getNumber(ix+1,iy+1,seed),getNumber(ix+1,iy+1,seed+5));
    
    var d00 = Math.dot(new vector2(gx,gy),p00)/4;
    var d10 = Math.dot(new vector2(gx-1,gy),p10)/4;
    var d01 = Math.dot(new vector2(gx,gy-1),p01)/4;
    var d11 = Math.dot(new vector2(gx-1,gy-1),p11)/4;

    gx = (3*gx**2)-(2*gx**3);
    gy = (3*gy**2)-(2*gy**3);

    var blerp0 = d00+(d10-d00)*gx;
    var blerp1 = d01+(d11-d01)*gx;
    var blerp2 = blerp0+(blerp1-blerp0)*gy;
    blerp2+=0.5;
    blerp2 = Math.clamp(blerp2,0,1);

    return blerp2;
}

Math.voronoiNoise = function(x,y,seed,base){
    var ix = Math.floor(x);
    var iy = Math.floor(y);
    var gx = x-ix;
    var gy = y-iy;

    function getNumber(x,y,seed){
        return Math.randomSeeded(((x+0)+(y+0)*length)+seed);
    }

    points = [];
    points[0] = [new vector2(getNumber(ix+0,iy+0,seed)+0,getNumber(ix+0,iy+0,seed+5)+0),getNumber(ix+0,iy+0,seed)];
    points[1] = [new vector2(getNumber(ix+1,iy-1,seed)+1,getNumber(ix+1,iy-1,seed+5)-1),getNumber(ix+1,iy-1,seed)];
    points[2] = [new vector2(getNumber(ix+0,iy-1,seed)+0,getNumber(ix+0,iy-1,seed+5)-1),getNumber(ix+0,iy-1,seed)];
    points[3] = [new vector2(getNumber(ix-1,iy-1,seed)-1,getNumber(ix-1,iy-1,seed+5)-1),getNumber(ix-1,iy-1,seed)];
    points[4] = [new vector2(getNumber(ix+1,iy-0,seed)+1,getNumber(ix+1,iy-0,seed+5)+0),getNumber(ix+1,iy+0,seed)];
    points[5] = [new vector2(getNumber(ix+0,iy-0,seed)+0,getNumber(ix+0,iy-0,seed+5)+0),getNumber(ix+0,iy+0,seed)];
    points[6] = [new vector2(getNumber(ix-1,iy-0,seed)-1,getNumber(ix-1,iy-0,seed+5)+0),getNumber(ix-1,iy+0,seed)];
    points[7] = [new vector2(getNumber(ix+1,iy+1,seed)+1,getNumber(ix+1,iy+1,seed+5)+1),getNumber(ix+1,iy+1,seed)];
    points[8] = [new vector2(getNumber(ix+0,iy+1,seed)+0,getNumber(ix+0,iy+1,seed+5)+1),getNumber(ix+0,iy+1,seed)];
    points[9] = [new vector2(getNumber(ix-1,iy+1,seed)-1,getNumber(ix-1,iy+1,seed+5)+1),getNumber(ix-1,iy+1,seed)];
    
    var basev = points[0][1];
    var dis = Math.mag(points[0][0],new vector2(gx,gy));
    for (n=1;n<points.length;n++){
        if (Math.mag(points[n][0],new vector2(gx,gy)) < dis){
            dis = Math.mag(points[n][0],new vector2(gx,gy));
            basev = points[n][1];
        }
    }

    if (base){
        return basev;
    }
    return dis;
}