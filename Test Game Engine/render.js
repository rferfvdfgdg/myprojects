const canvas = document.createElement('canvas');
canvas.style = "position: absolute; top: 0px; left: 0px; image-rendering: pixelated";
const gl = canvas.getContext('webgl', { antialias: true });
document.body.appendChild(canvas);
canvas.width = 1680;
canvas.height = 940;

if (!gl) {
    console.error("Unable to initialize WebGL. Your browser or machine may not support it.");
}

gl.viewport(0, 0, canvas.width, canvas.height);
const ratio = canvas.width/canvas.height;

var transformation_matrix = new Float32Array([
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    0,0,0,1
]);


const vertexData = [
    0, 1/canvas.width*250, 0,
    1/canvas.height*250, -1/canvas.width*250, 0,
    -1/canvas.height*250, -1/canvas.width*250, 0
];

/*
const vertexData = [
    0, 1, 0,
    1, -1, 0,
    -1, -1, 0
];
*/
const colorData = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
]

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `
    precision mediump float;

    attribute vec3 position;
    attribute vec3 color;
    varying vec3 vColor;

    uniform mat4 matrix;

    void main() {
        vColor = color;
        gl_Position = matrix * vec4(position, 1);
    }

`);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, `
    precision mediump float;

    varying vec3 vColor;

    void main() {
        gl_FragColor = vec4(vColor,1.0);
    }

`);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    throw new Error(`Could not compile WebGL program. \n\n${info}`);
}

const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, `color`);
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);

const uniformLocations = {
    matrix: gl.getUniformLocation(program, `matrix`)
}

const Mouse = {x: 0,y: 0}
window.onmousemove = function(event){Mouse.x=event.clientX;Mouse.y=event.clientY;};

var n = 0;
function Render(){

    gl.clearColor(0, 0, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    n += 0.01;

    transformation_matrix[0] = Math.cos(n);
    transformation_matrix[1] = -Math.sin(n);
    transformation_matrix[4] = Math.sin(n);
    transformation_matrix[5] = Math.cos(n);

    gl.uniformMatrix4fv(uniformLocations.matrix, false, transformation_matrix);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    requestAnimationFrame(Render);
}
Render();