const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//CLASSES//
class Camera{
    constructor(position, size){
        this.position = position;
        this.size = size;
        this.speed = 0.2;
        this.zoomspeed = 0.02;
        this.zoom = 1;
        this.zmin = 1;
        this.zmax = 10;
        return this;
    }
}

class Keyboard{
    constructor(keys){
        this.keys = keys;
        return this;
    }
}

class Mouse{
    constructor(position, size){
        this.position = position;
        this.size = size;
        this.down = false;
        objects[objects.length] = this;
        return this;
    }
}

class Vector2{
    constructor(x,y){
        this.x = x;
        this.y = y;
        return this;
    }
}

class Color3{
    constructor(r,g,b){
        this.r = r;
        this.g = g;
        this.b = b;
        return this;
    }
}

class Rect{
    constructor(position,size,color){
        this.position = position;
        this.size = size;
        this.color = color;
        objects[objects.length] = this;
        return this;
    }
}

class Sprite{
    constructor(position,size,image){
        this.position = position;
        this.size = size;
        this.image = image;
        objects[objects.length] = this;
        return this;
    }
}

//SET OBJECTS//
var keys = [];

let mouse = new Mouse(new Vector2(0,0), new Vector2(-10,-10));
let camera = new Camera(new Vector2(0,0), new Vector2(canvas.width,canvas.height));
let keyboard = new Keyboard(keys);

//MOUSE POSITION//
function UpdateMouse(event){
    mouse.position.x = event.clientX+camera.position.x;
    mouse.position.y = event.clientY+camera.position.y;
}

//KEY INPUTS//
function KeyDown(event){
    var key = event.key;
    if (keys[event.key] == undefined){
        keys[event.key] = true;
    }
}

function KeyUp(event){
    var key = event.key;
    if (keys[event.key] == true){
        keys[event.key] = null;
    }
}

//RGB TO HEX//
function Color(r,g,b){
    var R = (r < 16) ? "0":"";
    var G = (g < 16) ? "0":"";
    var B = (b < 16) ? "0":"";

    return "#"+R+r.toString(16)+G+g.toString(16)+B+b.toString(16);
}

//DRAW POINT//
function DrawPixel (x, y, r, g, b) {

    var index = (x + y * canvas.width) * 4;
    
    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = 255;
}

//RENDER OBJECTS//
function Render(object){

    var cpx = camera.position.x;
    var cpy = camera.position.y;

    var opx = object.position.x;
    var opy = object.position.y;
    var osx = object.size.x;
    var osy = object.size.y;

    if (object instanceof Rect){

        //Check if in camera range

        ctx.resetTransform();
        if (CollideBetween(object, camera) == true){
            console.log("bob");
            ctx.fillStyle = object.color;
            ctx.beginPath();
            ctx.rect(camera.zoom*(opx+cpx)+canvas.width/2, camera.zoom*(opy+cpy)+canvas.height/2, camera.zoom*osx, camera.zoom*osy);
            ctx.fill();
        }
    }

    if (object instanceof Sprite){

        //Check if in camera range
        if (CollideBetween(object, camera) == true){
            ctx.drawImage(object.image, camera.zoom*(opx+cpx)+canvas.width/2, camera.zoom*(opy+cpy)+canvas.height/2, camera.zoom*osx, camera.zoom*osy);
        }

    }

}

//GET COLLISION FROM TWO OBJECTS//
function CollideBetween(object1, object2){

    var sx1 = object1.size.x
    var sy1 = object1.size.y
    var px1 = object1.position.x
    var py1 = object1.position.y
    var sx2 = object2.size.x
    var sy2 = object2.size.y
    var px2 = object2.position.x
    var py2 = object2.position.y

    if (object2 instanceof Camera){
        var z2 = 1/camera.zoom
        return px1 < -px2+(camera.size.x*z2/2) && px1+sx1 > -px2-(camera.size.x*z2/2) && py1 < -py2+(camera.size.y*z2/2) && py1+sy1 > -py2-(camera.size.y*z2/2)
    }

    return px1+sx1 < px2+sx2 && px1 > px2 && py1+sy1 < py2+sy2 && py1 > py2
}

//GET COLLISION FROM OBJECT//
function Collision(object){
    collisionArray = [];

    for (var n = 0; n < objects.length; n++){
        if (objects[n] != object){
            if (objects[n] != object){
                if (CollideBetween(object, objects[n]) == true){
                    collisionArray[collisionArray.length] = objects[n];
                }
            }
        }
    }
    return collisionArray
}

//RANDOM FUNCTION//
function Random(min,max){
    return(Math.ceil(min+(Math.random()*(max-min))));
}

function HexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

function UpdateClick(doc){
    if (doc.buttons > 0){
        mouse.down = true;
    }else{
        mouse.down = false;
    }
}


    //Random Function
    function GetRandomSeed(SEED){

        var NEW_SEED = String(SEED*123);
        const RAND_ARRAY = [];

        for (n = 0; n < 22; n++){

            var SNUM = NEW_SEED;
            var NEW_NUM_ARRAY = [];

            //Generate new seed
            for (r = 0; r < Math.ceil(SNUM.length/2); r++){
                var NNUM = SNUM.slice(r*2, (r*2)+2);
                NEW_NUM_ARRAY[r] = Number(NNUM)**2
            }
            var STR = "";

            //Convert array to string
            for (r = 0; r < NEW_NUM_ARRAY.length; r++){
                STR += String(NEW_NUM_ARRAY[r]);
            }

            //Add digits into array
            for (r = 0; r < STR.length; r++){
                RAND_ARRAY[RAND_ARRAY.length] = STR.slice(r,r+1);
            }
            NEW_SEED = STR;

        }

        return RAND_ARRAY;
    }

document.onmousemove = UpdateMouse;
document.onkeydown = KeyDown;
document.onkeyup = KeyUp;
document.onmouseup = UpdateClick;
document.onmousedown = UpdateClick;
