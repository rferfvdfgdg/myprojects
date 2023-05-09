Math.dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
Math.mult = function(a, b){
    var buf = [];
    buf[0] = Math.dot([a[0],a[1],a[2],a[3]],[b[0],b[4],b[8],b[12]]);
    buf[1] = Math.dot([a[4],a[5],a[6],a[7]],[b[0],b[4],b[8],b[12]]);
    buf[2] = Math.dot([a[8],a[9],a[10],a[11]],[b[0],b[4],b[8],b[12]]);
    buf[3] = Math.dot([a[12],a[13],a[14],a[15]],[b[0],b[4],b[8],b[12]]);
    buf[4] = Math.dot([a[0],a[1],a[2],a[3]],[b[1],b[5],b[9],b[13]]);
    buf[5] = Math.dot([a[4],a[5],a[6],a[7]],[b[1],b[5],b[9],b[13]]);
    buf[6] = Math.dot([a[8],a[9],a[10],a[11]],[b[1],b[5],b[9],b[13]]);
    buf[7] = Math.dot([a[12],a[13],a[14],a[15]],[b[1],b[5],b[9],b[13]]);
    buf[8] = Math.dot([a[0],a[1],a[2],a[3]],[b[2],b[6],b[10],b[14]]);
    buf[9] = Math.dot([a[4],a[5],a[6],a[7]],[b[2],b[6],b[10],b[14]]);
    buf[10] = Math.dot([a[8],a[9],a[10],a[11]],[b[2],b[6],b[10],b[14]]);
    buf[11] = Math.dot([a[12],a[13],a[14],a[15]],[b[2],b[6],b[10],b[14]]);
    buf[12] = Math.dot([a[0],a[1],a[2],a[3]],[b[3],b[7],b[11],b[15]]);
    buf[13] = Math.dot([a[4],a[5],a[6],a[7]],[b[3],b[7],b[11],b[15]]);
    buf[14] = Math.dot([a[8],a[9],a[10],a[11]],[b[3],b[7],b[11],b[15]]);
    buf[15] = Math.dot([a[12],a[13],a[14],a[15]],[b[3],b[7],b[11],b[15]]);
    return buf;
}