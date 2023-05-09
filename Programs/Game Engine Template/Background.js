const ctx = document.getElementById("canvas").getContext("2d");

class Camera{
    constructor(position, size){
        this.position = position;
        this.size = size;
        return this;
    }
}

class Mouse{
    constructor(position, size){
        this.position = position;
        this.size = size;
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


let mouse = new Mouse(new Vector2(0,0), new Vector2(-10,-10));
let camera = new Camera(new Vector2(0,0), new Vector2(0,0));

function UpdateMouse(event){
    mouse.position.x = event.clientX+camera.position.x;
    mouse.position.y = event.clientY+camera.position.y;
}

function Render(object){

    if (object instanceof Rect){
        ctx.fillStyle = object.color;
        ctx.beginPath();
        ctx.rect(object.position.x+camera.position.x, object.position.y+camera.position.y, object.size.x, object.size.y);
        ctx.fill();
    }
    if (object instanceof Sprite){
        ctx.drawImage(object.image, object.position.x+camera.position.x, object.position.y+camera.position.y, object.size.x, object.size.y);
    }
}

function CollideBetween(object1, object2){

    var sx1 = object1.size.x
    var sy1 = object1.size.y
    var px1 = object1.position.x
    var py1 = object1.position.y
    var sx2 = object2.size.x
    var sy2 = object2.size.y
    var px2 = object2.position.x
    var py2 = object2.position.y

    return px1+sx1 < px2+sx2 && px1 > px2 && py1+sy1 < py2+sy2 && py1 > py2
}

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

document.onmousemove = UpdateMouse;