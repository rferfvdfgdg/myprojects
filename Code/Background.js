const ctx = document.getElementById("canvas").getContext("2d");

class Camera{
    constructor(position, size){
        this.position = position;
        this.size = size;
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


let mouse = new Rect(new Vector2(0,0),new Vector2(0,0));
let camera = new Camera(new Vector2(0,0),new Vector2(0,0));

/// Math Functions ///

function Value(num){ //Apparently just Math.sign();
    return Math.round(num/(Math.sqrt(Math.pow(num, 2))));
}

/// Other Functions ///

function UpdateMouse(event){
    mouse.position.x = event.clientX+camera.position.x;
    mouse.position.y = event.clientY+camera.position.y;
}

function Render(object){
    if (object instanceof Rect){
        ctx.fillStyle = object.color;
        ctx.beginPath();
        ctx.rect(object.position.x+camera.position.x,object.position.y+camera.position.y,object.size.x,object.size.y);
        ctx.fill();
    }
    if (object instanceof Sprite){
        ctx.drawImage(object.image, object.position.x+camera.position.x, object.position.y+camera.position.y)
    }
}

function CollideBetween(object1, object2){
    return object1.position.x<object2.position.x+object2.size.x&&object1.position.x+object1.size.x>object2.position.x&&object1.position.y<object2.position.y+object2.size.y&&object1.position.y+object1.size.y>object2.position.y
}

function Collision(object){
    collisionArray = [];

    for (var n = 0; n < objects.length; n++){
        if (objects[n] != object){
            if (CollideBetween(object, objects[n]) == true){
                collisionArray[collisionArray.length] = objects[n];
            }
        }
    }
    return collisionArray
}

document.onmousemove = UpdateMouse;