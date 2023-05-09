const ctx = document.getElementById("canvas").getContext("2d");

class Camera{
    constructor(position, size, speed, zoom){
        this.position = position;
        this.size = size;
        this.speed = speed;
        this.zoom = zoom;
        objects[objects.length] = this;
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

class Circle{
    constructor(position,size){
        this.position = position;
        this.size = size;
        objects[objects.length] = this;
        return this;
    }
}


let mouse = new Mouse(new Vector2(0,0),new Vector2(0,0));
let camera = new Camera(new Vector2(0,0),new Vector2(0,0), 1, 0);

function UpdateMouse(event){
    mouse.position.x = event.clientX-camera.position.x-10;
    mouse.position.y = event.clientY-camera.position.y-10;
}

function Render(object){
    ctx.strokeStyle = object.color;
    ctx.beginPath();
    ctx.arc(object.position.x+camera.position.x,object.position.y+camera.position.y,object.size+(camera.zoom/10), 0, 360);
    ctx.stroke();
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