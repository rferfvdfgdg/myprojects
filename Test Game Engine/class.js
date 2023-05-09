class Vector3 {
    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     */
    constructor(x,y,z){
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.mat4 = new Float32Array([1,0,0,x,0,1,0,y,0,0,1,z,0,0,0,1]);
    }

    translate(vec){
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
        this.mat4 = new Float32Array([1,0,0,x,0,1,0,y,0,0,1,z,0,0,0,1]);
        return this;
    }
}