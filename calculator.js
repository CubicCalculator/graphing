//code
import Math;

var width = window.innerWidth - 20;
var height = window.innerHeight - 20;
void setup() {
    size(width, height);
}

//graphing functions

noStroke();
var dimensionsOfFunc = function(func) {
    if (func.indexOf("x") > -1 && func.indexOf("y") > -1) {
        return ["x", "y"];
    }
    return ["x"];
};

var isEqual = function(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    
    for (var i = 0; i < arr1.length; i ++) {
        if (arr1[i] !== arr2[i]) { return false; }
    }
    
    return true;
};
var findGroup = function(func) {
    var depth = 0;
    
    var start = -1;
    var end = -1;

    for (var i = 0; i < func.length; i ++) {
        if (func[i] === "(") {
            depth ++;
            if (depth === 1) {
                start = i;
            }
        }
        if (func[i] === ")") {
            depth --;
            if (depth === 0) {
                end = i;
                
                return [start, end];
            }
        }
    }
    
    return [start, end];
};
var numTrackBack = function(func, pos) {
    var numFound = false;
    var negative = false;
    var end;
    while (("0123456789.-".split("").indexOf(func[pos]) > -1 || !numFound) && !negative) {
        if ("0123456789.".split("").indexOf(func[pos]) > -1 && !numFound) {
            numFound = true;
            end = pos;
        }
        if (func[pos] === "-" && numFound) {
	    if (pos > 0 && "0123456789.".split("").indexOf(func[pos - 1]) > -1) {		
	        break;		
	    }
            negative = true;
        }
        
        pos --;
    }
    
    return [pos + 1, end + 1];
};
var numTrackForward = function(func, pos) {
    var numFound = false;
    var start;
    
    var origPos = pos;
    while (("0123456789.-".split("").indexOf(func[pos]) > -1 || !numFound) && ("-" !== func[pos] || !numFound)) {
        if ("0123456789.-".split("").indexOf(func[pos]) > -1 && !numFound && origPos !== pos) {
            numFound = true;
            start = pos;
        }
        
        pos ++;
    }
    
    return [start, pos];
};
var operate = function(func, idx, combine) {
    var first = numTrackBack(func, idx);
    var second = numTrackForward(func, idx);
    
    var total = combine(
        parseFloat(func.substring(first[0], first[1])), 
        parseFloat(func.substring(second[0], second[1]))
    );
    
    var res = {"num": total.toString(), "newPos": idx - (first[1] - first[0]) + total.toString().length - 1, "start": first[0], "end": second[1]};
    return res;
};
    
var add = function(a, b) { return a + b; };
var subtract = function(a, b) { return a - b; };
var multiply = function(a, b) { return a * b; };
var divide = function(a, b) { return a / b; };

var Operation = function(name, para, f) {
    this.name = name;
    this.para = para;
    this.func = f;
};
var operations = [
    // sqrt(4) ==> 2
    new Operation('sqrt', 1, function() { return sqrt(arguments[0][0]); }),
    new Operation('nroot', 2, function() { return pow(arguments[0][0], 1/arguments[0][1]);}),
    
    
    new Operation('sin', 1, function() { return sin(arguments[0][0]); }),
    new Operation('cos', 1, function() { return cos(arguments[0][0]); }),
    new Operation('tan', 1, function() { return tan(arguments[0][0]); }),
    new Operation('csc', 1, function() { return 1/sin(arguments[0][0]); }),
    new Operation('sec', 1, function() { return 1/cos(arguments[0][0]); }),
    new Operation('cot', 1, function() { return 1/tan(arguments[0][0]); }),
    new Operation('asin', 1, function() { return asin(arguments[0][0]); }),
    new Operation('acos', 1, function() { return acos(arguments[0][0]); }),
    new Operation('atan', 1, function() { return atan(arguments[0][0]); }),
    new Operation('acsc', 1, function() { return 1/asin(arguments[0][0]); }),
    new Operation('asec', 1, function() { return 1/acos(arguments[0][0]); }),
    new Operation('acot', 1, function() { return 1/atan(arguments[0][0]); }),
    new Operation('sinh', 1, function() { return sinh(arguments[0][0]); }),
    new Operation('cosh', 1, function() { return cosh(arguments[0][0]); }),
    new Operation('tanh', 1, function() { return tanh(arguments[0][0]); }),
    new Operation('csch', 1, function() { return csch(arguments[0][0]); }),
    new Operation('sech', 1, function() { return sech(arguments[0][0]); }),
    new Operation('coth', 1, function() { return coth(arguments[0][0]); }),
    new Operation('asinh', 1, function() { return asinh(arguments[0][0]); }),
    new Operation('acosh', 1, function() { return acosh(arguments[0][0]); }),
    new Operation('atanh', 1, function() { return atanh(arguments[0][0]); }),
    new Operation('acsch', 1, function() { return acsch(arguments[0][0]); }),
    new Operation('asech', 1, function() { return asech(arguments[0][0]); }),
    new Operation('acoth', 1, function() { return acoth(arguments[0][0]); }),
    
    new Operation('abs', 1, function() { return abs(arguments[0][0]); }),
    new Operation('floor', 1, function() { return floor(arguments[0][0]); }),
    new Operation('ceil', 1, function() { return ceil(arguments[0][0]); }),
    new Operation ('round', 1, function() { return round(arguments[0][0]); }),
    new Operation('sq', 1, function() {return sq(arguments[0][0]);}),
    new Operation('pow', 2, function() {return pow(arguments[0][0], arguments[0][1]);}),
    new Operation('log', 2, function() {return log(arguments[0][0], arguments[0][1]);}),
    new Operation('ln', 1, function() {return log(arguments[0][0], e);}),
    new Operation('min', -1, function() {
        var result = arguments[0][0];
        for (var i = 1; i < arguments[0].length; i ++) {
            result = min(result, arguments[0][i]);
        }
        //println(result);
        return result;
    }),
    new Operation('max', -1, function() {
        var result = arguments[0][0];
        for (var i = 1; i < arguments[0].length; i ++) {
            result = max(result, arguments[0][i]);
        }
        return result;
    }),
    
];

var evaluate = function(func, vars, values) {
    func = "0+" + func;
    func = func.toLowerCase();
    func = func.replace(/\s/g, "");
    func = func.replace(/e/g, "2.718281828459045");
    func = func.replace(/pi/g, "3.141592653589793");
    
    // replace variables
    for (var i = 0; i < vars.length; i ++) {
        while (func !== func.replace(vars[i], values[i])) {
            if (str(values[i]).indexOf("e-") > -1) {
                values[i] = 0;
            }
            func = func.replace(vars[i], values[i]);
        }
    }
    func = func.replace(/--/g, "");
    var result = 0;
    
    // find parentheses and handle them
    while (!isEqual(findGroup(func), [-1, -1])) {
        var currGroup = findGroup(func);
        if (currGroup[0] > 0 && 'abcdefghijklmnopqrstuvwxyz'.indexOf(func[currGroup[0] - 1]) > -1) {
            var word = '';
            for (var i = currGroup[0] - 1; i >= 0; i --) {
                if ('abcdefghijklmnopqrstuvwxyz'.indexOf(func[i]) > -1) {
                    word = func[i] + word;
                } else {
                    break;
                }
            }
            
            for (var i = 0; i < operations.length; i ++) {
                if (word === operations[i].name) {
                    var args = [];
                    var start = currGroup[0] + 1;
                    for (var idx = start; idx < currGroup[1]; idx ++) {
                        if (func[idx] === ",") {
                            args.push(evaluate(func.substring(start, idx), [], []));
                            start = idx + 1;
                        }
                    }
                    args.push(evaluate(func.substring(start, idx), [], []));
                    start = idx + 1;
                    
                    func = func.substring(0, currGroup[0]) + 
                        evaluate(operations[i].func(args), [], []) +
                        func.substring(currGroup[1] + 1, func.length);
                    break;
                }
            }
        } else {
            func = func.substring(0, currGroup[0]) + 
                evaluate(func.substring(currGroup[0] + 1, currGroup[1]), [], []) +
                func.substring(currGroup[1] + 1, func.length);
        }
    }
    
    // exponents
    for (var i = 0; i < func.length; i ++) {
        if (func[i] === "^") {
            
            var total = operate(func, i, pow);
            
            func = func.substring(0, total.start) + total.num + func.substring(total.end, func.length);
            i = total.newPos;
        }
    }
    
    // multiplication/division
    for (var i = 0; i < func.length; i ++) {
        if ("*/".split("").indexOf(func[i]) > -1) {
            var total = operate(func, i, (func[i] === "*") ? multiply : divide);
            
            func = func.substring(0, total.start) + total.num + func.substring(total.end, func.length);
            i = total.newPos;
        }
    }
    
    // addition/subtraction
    for (var i = 0; i < func.length; i ++) {
        if ("+-".split("").indexOf(func[i]) > -1) {
            var total = operate(func, i, (func[i] === "+") ? add : subtract);
            func = func.substring(0, total.start) + total.num + func.substring(total.end, func.length);
            i = total.newPos;
        }
    }
    return parseFloat(func);
};

var backgroundLight = 0.4;

var subtractVectors = function(v1, v2){
    return [[v1[0] - v2[0]],
            [v1[1] - v2[1]],
            [v1[2] - v2[2]]];
};
var normalOfPlane = function(face) {
    var nodes = face.nodes;
    
    var n1;
    var n2;
    var n3;
    
    n1 = nodes[0];
    n2 = nodes[1];
    n3 = nodes[2];
    
    var v1 = subtractVectors(n1, n2);
    var v2 = subtractVectors(n1, n3);
    
    var v3 = [[v1[1]*v2[2] - v1[2]*v2[1]],
              [v1[2]*v2[0] - v1[0]*v2[2]],
              [v1[0]*v2[1] - v1[1]*v2[0]]];
    return v3;
};

var normaliseVector = function(v) {
    var d = sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
    return [v[0]/d, v[1]/d, v[2]/d];
};

var lightVector = [-0.5, -0.2, 1];
var lightVector = normaliseVector(lightVector);

var dotProduct = function(v1, v2){
    // Assume everything has 3 dimensions
    return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
};

var dirVector = function(node1, node2, center) {
    var res = [];
    for (var i = 0; i < node1.length; i ++) {
        if (abs(node1[i] - center[i]) > abs(node2[i] - center[i])) {
            res.push(round(node1[i] - center[i]));
        } else {
            res.push(round(node2[i] - center[i]));
        }
    }
    
    var magnitude = 0;
    for (var i = 0; i < res.length; i ++) {
        magnitude += res[i] * res[i];
    }
    magnitude = sqrt(magnitude);
    
    for (var i = 0; i < res.length; i ++) {
        res[i] /= magnitude;
    }
    
    return res;
};

var Face = function() {
    var args;
    if (arguments.length === 1 && Array.isArray(arguments[0])) {
        args = arguments[0];
    } else {
        args = arguments;
    }
    this.color = args[0];
    this.transparency = args[1];
    this.drawStyle = args[2];
    
    var pointer = 3;
    if (this.drawStyle === "text") {
        this.text = args[3];
        this.size = args[4];
        pointer += 2;
    }
    
    this.z = 0;
    this.nodes = [];
    for (var i = pointer; i < args.length; i ++) {
        this.nodes.push([]);
        for (var j = 0; j < args[i].length; j ++) {
            this.nodes[i - pointer].push(args[i][j]);
        }
        this.z += args[i][2];
    }
};
var rotateYAxis = function(angle,face,center) {
    var sinAngle = sin(angle);
    var cosAngle = cos(angle);
    
    var nodes = face.nodes;
    for (var i = 0; i < nodes.length; i ++) {
        var node = nodes[i];
        var x = node[0] - center[0];
        var z = node[2] - center[2];
        node[0] = x * cosAngle - z * sinAngle + center[0];
        node[2] = z * cosAngle + x * sinAngle + center[2];
    }
    face.z -= center[2];
    face.z = face.z * cosAngle + face.x * sinAngle + center[2];
    
    if (face.drawStyle === "text") {
        var direction = dirVector(face.nodes[0], [0, 0, 0], [0, 0, 0]);
        face.size = (direction[2] + 2) * 10;
    }
};
var rotateXAxis = function(angle,face,center) {
    var sinAngle = sin(angle);
    var cosAngle = cos(angle);
    
    var nodes = face.nodes;
    for (var i = 0; i < nodes.length; i ++) {
        var node = nodes[i];
        var z = node[2] - center[2];
        var y = node[1] - center[1];
        node[2] = z * cosAngle - y * sinAngle + center[2];
        node[1] = y * cosAngle + z * sinAngle + center[1];
    }
    
    face.z -= center[2];
    face.z = face.z * cosAngle - face.y * sinAngle + center[2];
    
    if (face.drawStyle === "text") {
        var direction = dirVector(face.nodes[0], [0, 0, 0], [0, 0, 0]);
        face.size = (direction[2] + 2) * 10;
    }
};

var maxArr = function(arr) {
    var result = arr[0];
    for (var i = 1; i < arr.length; i ++) {
        result = max(result, arr[i]);
    }
    return result;
};
var drawer = function(faces) {
    strokeWeight(1);
    faces.sort(function(a, b) {
        var aZs = [];
        var bZs = [];
        
        for (var i = 0; i < a.nodes.length; i ++) {
            aZs.push(a.nodes[i][2]);
        }
        for (var i = 0; i < b.nodes.length; i ++) {
            bZs.push(b.nodes[i][2]);
        }
        return maxArr(aZs) - maxArr(bZs);
    });
    
    if (faces) {
        for (var i = 0; i < faces.length; i ++) {
            var face = faces[i];
            
            switch (face.drawStyle) {
                case "shape":
                    if (face.transparency === false) {
                        var fnorm = normalOfPlane(face);
                        var l = max(0, dotProduct(lightVector, normaliseVector(fnorm)));
                        l = backgroundLight + (1 - backgroundLight) * l;
                        stroke(lerpColor(color(0,0,0), face.color, l));
                        fill(lerpColor(color(0,0,0), face.color, l));
                    } else {
                        noFill();
                        stroke(face.color);
                    }
                    beginShape();
                    for (var j = 0; j < face.nodes.length; j ++) {
                        vertex(face.nodes[j][0], face.nodes[j][1]);
                    }
                    vertex(face.nodes[0][0], face.nodes[0][1]);
                    endShape();
                    break;
                case "text":
                    fill(face.color);
                    textSize(face.size);
                    textAlign(CENTER, CENTER);
                    text(face.text, face.nodes[0][0], face.nodes[0][1]);
                    break;
            }
        }
    }
};

var inConstraints = function(val, min, max) {
    return val >= min && val <= max;
};

var graphs = {};
var graph2D = function(funcs, cols, vars, constraints, x, y, w, h) {
    pushMatrix();
    translate(x, y);
    for (var v = 0; v < constraints.length; v ++) {
        if (constraints[v][0] > constraints[v][1]) {
            constraints[v][0] += constraints[v][1];
            constraints[v][1] = constraints[v][0] - constraints[v][1];
            constraints[v][0] -= constraints[v][1];
        }
    }
    var xInterval = (constraints[0][1] - constraints[0][0]) / w;
    var yInterval = (constraints[1][1] - constraints[1][0]) / h;
    stroke(0);
    strokeWeight(1);
    
    var xAxis = 0;
    var yAxis = 0;
    if (0 > constraints[0][1]) {
        xAxis = w;
    } else if (0 > constraints[0][0]) {
        xAxis = -constraints[0][0] / xInterval;
        line(xAxis, 0, xAxis, h);
    } 
    if (0 > constraints[0][1]) {
        yAxis = h;
    } else if (0 > constraints[1][0]) {
        yAxis = h + constraints[1][0] / yInterval;
        line(0, yAxis, w, yAxis);
    }
    var trueYAxis = h + constraints[1][0] / yInterval;
    
    for (var i = 0; i < funcs.length; i ++) {
        var func = funcs[i];
        if (func !== '') {
            var id = func;
            for (var j = 0; j < vars.length + 1; j ++) {
                if (i < vars.length) {
                    id += vars[j];
                } else {
                    id += 'res';
                }
                id += str(constraints[j]);
            }
            if (!(id in graphs)) {
                graphs[id] = [];
                var res;
                var x;
                var y;

                for (var i = constraints[0][0] + xInterval; i < constraints[0][1]; i += xInterval) {
                    res = evaluate(func, vars, [i]);
                    x = round((i - constraints[0][0])/xInterval);
                    y = round(trueYAxis - (res/yInterval));
                    if (inConstraints(res, constraints[1][0], constraints[1][1])) {
                        graphs[id].push([x, y]);
                    } else if (graphs[id].length > 0 && graphs[id][graphs[id].length - 1][0] === x - 1 && inConstraints(graphs[id][graphs[id].length - 1][1], 1, h - 1)) {
                        graphs[id].push([x, constrain(y, 0, h)]);
                    } else {
                        var nextY = round(trueYAxis - (evaluate(func, vars, [i + xInterval])/yInterval));
                        if (inConstraints(nextY, 1, h - 1)) {
                            graphs[id].push([x, constrain(y, 0, h)]);
                        }
                    }
                }
            }
            var prev;
            var curr;
            stroke(cols[i]);
            for (var j = 1; j < graphs[id].length; j ++) {
                prev = graphs[id][j - 1];
                curr = graphs[id][j];
                if (prev[0] === curr[0] - 1 && abs(prev[1] - curr[1]) < h) {
                    line(prev[0], prev[1], curr[0], curr[1]);
                }
            }
        }
    }
    
    stroke(0, 0, 0);
    line(0,0,0,h);
    line(0,0,w,0);
    line(w,0,w,h);
    line(0,h,w,h);
    
    textAlign(CENTER, CENTER);
    textSize(15);
    fill(0, 0, 0);
    if (xAxis > 0 && xAxis < w && yAxis > 0 && yAxis < h) {
        text(0, xAxis + ((yAxis === 0 || yAxis === h) ? 0 : ((xAxis <= w / 2) ? 8 : -8)), yAxis + ((xAxis === 0 || xAxis === w) ? 0 : ((yAxis <= h / 2) ? 8 : -8)));
    }
    text(constraints[0][0], -8, yAxis + ((xAxis === 0 || xAxis === w) ? 0 : ((yAxis <= h / 2) ? 8 : -8)));
    text(constraints[0][1], w + 8, yAxis + ((xAxis === 0 || xAxis === w) ? 0 : ((yAxis <= h / 2) ? 8 : -8)));
    text(constraints[1][0], xAxis + ((yAxis === 0 || yAxis === h) ? 0 : ((xAxis <= w / 2) ? 8 : -8)), h + 8);
    text(constraints[1][1], xAxis + ((yAxis === 0 || yAxis === h) ? 0 : ((xAxis <= w / 2) ? 8 : -8)), -8);
    textAlign(LEFT, BASELINE);
    popMatrix();
};

var graph3DCount = 0;
var graph3DStructures = {};
var graphInterval = 20;
var xor = function(a, b) {
    return (a || b) && (!a || !b);
};
var pointsAdjacent = function(p1, p2) {
    return xor(abs(p1[0] - p2[0]) === 1, abs(p1[1] - p2[1]) === 1);
};

var graph3D = function(funcs, colors, vars, constraints, x, y, w, h, d) {
    var graphID = graph3DCount + funcs + constraints;
    if (!(graphID in graph3DStructures)) {
        var axisPos = [
            map(0, constraints[0][0], constraints[0][1], -w/2, w/2), 
            -map(0, constraints[2][0], constraints[2][1], -d/2, d/2), 
            -map(0, constraints[1][0], constraints[1][1], -h/2, h/2)
        ];
        
        graph3DStructures[graphID] = [];
        var structure = graph3DStructures[graphID];
        for (var i = 0; i < graphInterval; i ++) {
            // x axis
            if (inConstraints(axisPos[1], -h/2, h/2) && inConstraints(axisPos[2], -d/2, d/2)) {
                structure.push(new Face(color(0, 0, 0), true, "shape", [w/2 - w/graphInterval*i, axisPos[1], axisPos[2]], [w/2 - w/graphInterval*(i + 1), axisPos[1], axisPos[2]]));
            } else {
                structure.push(new Face(color(0, 0, 0), true, "", [w/2 - w/graphInterval*i, constrain(axisPos[1], -h/2, h/2), constrain(axisPos[2], -d/2, d/2)], [w/2 - w/graphInterval*(i + 1), constrain(axisPos[1], -h/2, h/2), constrain(axisPos[2], -d/2, d/2)]));
            }
            // z axis after rotation
            if (inConstraints(axisPos[0], -w/2, w/2) && inConstraints(axisPos[2], -d/2, d/2)) {
                structure.push(new Face(color(0, 0, 0), true, "shape", [axisPos[0], -h/2 + h/graphInterval*i,  axisPos[2]], [axisPos[0], -h/2 + h/graphInterval*(i + 1), axisPos[2]]));
            } else {
                structure.push(new Face(color(0, 0, 0), true, "", [constrain(axisPos[0], -w/2, w/2), -h/2 + h/graphInterval*i,  constrain(axisPos[2], -d/2, d/2)], [constrain(axisPos[0], -w/2, w/2), -h/2 + h/graphInterval*(i + 1), constrain(axisPos[2], -d/2, d/2)]));
            }
            
            // y axis after rotation
            if (inConstraints(axisPos[0], -w/2, w/2) && inConstraints(axisPos[1], -h/2, h/2)) {
                structure.push(new Face(color(0, 0, 0), true, "shape", [axisPos[0], axisPos[1], -d/2 + d/graphInterval*i,], [axisPos[0], axisPos[1], -d/2 + d/graphInterval*(i + 1)]));
            } else {
                structure.push(new Face(color(0, 0, 0), true, "", [constrain(axisPos[0], -w/2, w/2), constrain(axisPos[1], -h/2, h/2), -d/2 + d/graphInterval*i,], [constrain(axisPos[0], -w/2, w/2), constrain(axisPos[1], -h/2, h/2), -d/2 + d/graphInterval*(i + 1)]));
            }
        }
        
        var pos;
        axisPos = [
            constrain(axisPos[0], -w/2 , w/2),
            constrain(axisPos[1], -h/2, h/2),
            constrain(axisPos[2], -d/2, d/2)
        ];
        structure.push(new Face(color(0, 0, 0), true, "shape", [-w/2, -h/2, -d/2], [w/2, -h/2, -d/2], [w/2, h/2, -d/2], [-w/2, h/2, -d/2]));
        structure.push(new Face(color(0, 0, 0), true, "shape", [-w/2, -h/2, -d/2], [w/2, -h/2, -d/2], [w/2, -h/2, d/2], [-w/2, -h/2, d/2]));
        structure.push(new Face(color(0, 0, 0), true, "shape", [-w/2, h/2, -d/2], [w/2, h/2, -d/2], [w/2, h/2, d/2], [-w/2, h/2, d/2]));
        structure.push(new Face(color(0, 0, 0), true, "shape", [-w/2, -h/2, d/2], [w/2, -h/2, d/2], [w/2, h/2, d/2], [-w/2, h/2, d/2]));
        for (var i = 0; i < 3; i ++) {
            pos = [axisPos[0], axisPos[1], axisPos[2]];
            pos[i] = [-w, d, h][i]/1.8;
            
            structure.push(new Face(color(0, 0, 0), false, "text", [constraints[0], constraints[2], constraints[1]][i][0], map(pos[2], -d/2, d/2, 10, 30), pos));
            pos[i] = -pos[i];
            structure.push(new Face(color(0, 0, 0), false, "text", [constraints[0], constraints[2], constraints[1]][i][1], map(pos[2], -d/2, d/2, 10, 30), pos));
            
            pos[i] *= 1.3;
            structure.push(new Face(color(0, 0, 0), false, "text", ["X", "Z", "Y"][i], map(pos[2], -d/2, d/2, 10, 30), pos));
        }
    }
    var faces = graph3DStructures[graphID];
    
    var xInterval = (constraints[0][1] - constraints[0][0]) / graphInterval;
    var yInterval = (constraints[1][1] - constraints[1][0]) / graphInterval;
    var zInterval = (constraints[2][1] - constraints[2][0]) / graphInterval;
    
    for (var funcIdx = 0; funcIdx < funcs.length; funcIdx ++) {
        var func = funcs[funcIdx];
        var id = func;
        for (var j = 0; j < vars.length + 1; j ++) {
            if (j < vars.length) {
                id += vars[j];
            } else {
                id += "res";
            }
            id += str(constraints[j]);
        }
        id += colors[funcIdx];
        id += graph3DCount;
        if (!(id in graphs)) {
            graphs[id] = { "points": [], "faces": [] };
            var graph = graphs[id];
            for (var i = constraints[0][0]; i <= constraints[0][1]; i += xInterval) {
                graph.points.push([]);
                var row = graphs[id].points[graphs[id].points.length - 1];
		    
                for (var j = constraints[1][0]; j <= constraints[1][1]; j += yInterval) {
                    var res = evaluate(func, vars, [i, j]);
                    row.push([
                        round(map(i, constraints[0][0], constraints[0][1], -w/2, w/2)), 
                        -round(map(j, constraints[1][0], constraints[1][1], -h/2, h/2)), 
                        round(map(res, constraints[2][0], constraints[2][1], -d/2, d/2))
                    ]);
                }
            }
            
            var points = graph.points;
            var faces = graph.faces;
            var faceArgs;
            var potentialPoints;
            for (var i = 0; i < points.length - 1; i ++) {
                for (var j = 0; j < points[i].length - 1; j ++) {
                    faceArgs = [colors[funcIdx], false, "shape"];
                    potentialPoints = [points[i][j], points[i + 1][j], points[i + 1][j + 1], points[i][j + 1]];
                    for (var p = 0; p < potentialPoints.length; p ++) {
                        if (inConstraints(potentialPoints[p][2], -d/2, d/2)) {
                            faceArgs.push(potentialPoints[p]);
                        } 
                    }
                    if (faceArgs.length >= 6) {
                        graph.faces.push(new Face(faceArgs));
                    }
                } 
            }
            for (var i = 0; i < graph.faces.length; i ++) {
                rotateXAxis(radians(-90), graph.faces[i], [0, 0, 0]);
            }
        }
        faces = faces.concat(graphs[id].faces);
    }
    pushMatrix();
    translate(x + w/2, y + h/2);
    scale(max(max(w, h), d) / sqrt(w * w + h * h + d * d));
    drawer(faces);
    popMatrix();
    
    if (mousePressed) {
        for (var i = 0; i < faces.length; i ++) {
            rotateXAxis(-(pmouseY - mouseY)/20, faces[i], [0, 0, 0]);
            rotateYAxis((pmouseX - mouseX)/20, faces[i], [0, 0, 0]);
        }
    }
};

var graph = function(funcs, cols, vars, constraints, x, y, w, h) {
    if (vars.length === 1) {
        graph2D(funcs, cols, vars, constraints, x, y, w, h);
    } else if (vars.length === 2) {
        graph3D(funcs, cols, vars, constraints, x, y, w, h, (w + h) / 2);
    } else {
        throw "Attempted to graph in more than 3 dimensions";
    }
};

smooth();

var grapphs = [];
//global variables lmao
var selected = {func: [], name: [], color: [], constraints:[[-10, 10], [-10, 10]], vars: []};
var prevGraph = {};
var constraintsub1 = "";
var constraintsub2 = "";
var constraintPos = "";
var currCons = "startX";
var editCon = false;
var aboutopen = false;
var helpState = 1;
var helpopen = false;
var graphopen = false;
var wh = width/400;
var ht = height/400;
var translat = false;
var titleScroll = 0;
var titleOn = true;
var deselect = true;
var pscale = width/400;
var funcs = [{"func": "sin(x) + cos(y)", "name": "f1", "color": color(0, 0, 204)}, {"func": "(x^2 + y^2)/20", "name": "f2", "color": color(51, 204, 204)}];
var currFuncs = [0, 2];
var prevKey = "";
var sub1 = "";
var sub2 = "";
var pos = 0;
var prevMouse = false;
var currFunc = 0;
var mouseIsPresed = false;
var mouseIsReleased = false;
var editOk = false;
var renamePos = 0;
var rensub1 = "";
var rensub2 = "";
var renprevKey = "";
var funcLetts = ["f","g","h","a","b","c","d","e","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var letts = {};
var menuTranslate = 300;
var funcTranslate = 0;
var dropFunc = true;
var tSize = 40;
var menuUp = false;
var degRad = "rad";
var graphSetting = "carte";
var menuDown = false;
var colpickCols = [color(255, 150, 0), color(255, 89, 0), color(255, 0, 0), color(255, 0, 102), color(255, 0, 150)];
var colOn = false;
var funcState = 0;

var myKey = {"lastKeyCode": 0, "keyCode": 0};
myKey.reset = function() {
    this.lastKeyCode = this.keyCode;
    this.keyCode = 0;
}

textFont(createFont("monospace"));

//union function
var union = function(l1, l2) {
    var together = [];
    for (var i = 0; i < l1.length; i++) {
        together.push(l1[i]);
    }
    for (var i = 0; i < l2.length;i++) {
        var inarr = false;
        for (var x = 0; x < together.length; x++) {
            if (l2[i] === together[x]) {
                inarr = true;
            }
        }
        if (inarr === false) {
            together.push(l2[i]);
        }
    }
    return together;
};

//inarr function
var inArr = function(o, l) {
    var inarray = false;
    for (var i = 0; i < l.length; i++) {
        if (o === l[i]) {
            inarray = true;
        }
    }
    return inarray;
};

//button & edit functions
var button = function(x, y, w, h, rad, r, g, b) {
    popMatrix();
    fill(r, g, b);
    
    
    if (mouseX > x && mouseY > y && mouseX < x+w && mouseY < y+h) {

        fill(r-15, g-15, b-15);

        if (mousePressed) {

            fill(r-30, g-30, b-30);

        }

        if (mouseIsReleased) {
            deselect = false;
            return true;

        }

    }

    rect(x, y, w, h, rad);
    pushMatrix();
    translate(0, funcTranslate);
};

var constraintedit = function(x, y, val, constraint, edited, indices) {
    stroke(0, 0, 0);
    strokeWeight(1);
    if (currCons === constraint) {
        strokeWeight(2);
    }
    fill(255, 255, 255);
    rect(x, y, 100, 20);
    fill(0, 0, 0);
    textSize(12);
    text(val, x+3, y+15);
    if (mouseX > x && mouseX < x+100 && mouseY > y && mouseY < y+20 && mouseIsReleased && currCons !== constraint) {
        currCons = constraint;
        constraintPos = val.length;
    }
    if (currCons === constraint) {
        constraintsub1 = val.substring(0, constraintPos);
        constraintsub2 = val.substring(constraintPos, val.length);
        if (frameCount %60 < 30 || keyPressed) {
            stroke(0, 0, 0);
            strokeWeight(1);
            line(x+4+6.48*constraintPos, y+2, x+4+6.48*constraintPos, y+17);
        }
        if (myKey.keyCode != 0) {
            switch (myKey.keyCode) {
                case LEFT:
                    if (constraintPos > 0) {
                        constraintPos--;
                    }
                    break;

                case RIGHT:
                    if (constraintPos < val.length) {
                        constraintPos++;
                    }
                    break;

                case DELETE:
                case BACKSPACE:
                    if (constraintPos > 0) {
                        constraintsub1 = constraintsub1.substring(0, constraintsub1.length-1);
                        constraintPos--;
                    }
                    break;

                case 189:   // '-' key
                    if (constraintPos === 0) {
                        constraintsub1 += key.toString();
                        constraintPos++;
                    }
                    break;
		case 190:
	            var inArrayxd = false;
	            for (var z = 0; z < str(edited.constraints[indices[0]][indices[1]]).length; z++) {
		        if (str(edited.constraints[indices[0]][indices[1]][z]) === ".") {
			    inArrayxd = true;
			}
		    }
	            if (constraintPos !== 0 && inArrayxd === false) {
			constraintsub1 += key.toString();
			constraintPos++;
		    }
                default:
                    if ((myKey.keyCode >= 48) && (myKey.keyCode <= 57)) {
                        constraintsub1 += key.toString();
                        constraintPos++;
                    }
	        
            }
            myKey.reset();
        }

        edited.constraints[indices[0]][indices[1]] = constraintsub1+constraintsub2;
    }
};

var editconstraints = function(func, old) {
    wh = width/2-(min(width, height)-100)/2;
    ht = height/2-(min(width,height)-100)/2;
    var socm = (min(width,height)-100);
    resetMatrix();
    noStroke();
    fill(206, 207, 225);
    rect(wh, ht, socm, socm);
    fill(0, 0, 0);
    textSize(40*min(width,height)/600);
    textAlign(CENTER);
    text("Edit Constraints:", width/2, height/2-(min(width,height)-100)/2.4);
    stroke(0, 0, 0);
    strokeWeight(2);
    line(wh, ht+socm/8.5, wh+socm, ht+socm/8.5);
    textAlign(LEFT, BASELINE);
    textSize(18*min(width,height)/600);
    text("Minimum x-value:", wh+socm/15, ht+socm/5);
    text("Maximum x-value:", wh+socm*8/13, ht+socm/5);
    constraintedit(wh+socm/7.6, ht+socm/3.9, str(func.constraints[0][0]), "startX", func, [0, 0]);
    constraintedit(wh+socm/1.45, ht+socm/3.9, str(func.constraints[0][1]), "endX", func, [0, 1]);
    if (func.constraints.length === 2) {
        textSize(18*min(width,height)/600);
        text("Minimum y-value:", wh+socm/15, ht+socm/1.6);
        text("Maximum y-value:", wh+socm*8/13, ht+socm/1.6);
        constraintedit(wh+socm/7.6, ht+socm/1.45, str(func.constraints[1][0]), "startY", func, [1, 0]);
        constraintedit(wh+socm/1.45, ht+socm/1.45, str(func.constraints[1][1]), "endY", func, [1, 1]);
    }
    else {
        textSize(18*min(width,height)/600);
        text("Minimum y-value:", wh+socm/15, ht+socm/2.4);
        text("Maximum y-value:", wh+socm*8/13, ht+socm/2.4);
        constraintedit(wh+socm/7.6, ht+socm/2.1, str(func.constraints[1][0]), "startY", func, [1, 0]);
        constraintedit(wh+socm/1.45, ht+socm/2.1, str(func.constraints[1][1]), "endY", func, [1, 1]);
        textSize(18*min(width,height)/600);
        text("Minimum z-value:", wh+socm/15, ht+socm/1.55);
        text("Maximum z-value:", wh+socm*8/13, ht+socm/1.55);
        constraintedit(wh+socm/7.6, ht+socm/1.42, str(func.constraints[2][0]), "startZ", func, [2, 0]);
        constraintedit(wh+socm/1.45, ht+socm/1.42, str(func.constraints[2][1]), "endZ", func, [2, 1]);
    }
    noStroke();
    if (func.constraints[0][0] !== "" && func.constraints[0][1] !== "" && func.constraints[1][0] !== "" && func.constraints[1][1] !== "" && parseInt(func.constraints[0][0], 10) < parseInt(func.constraints[0][1], 10) && parseInt(func.constraints[1][0], 10) < parseInt(func.constraints[1][1], 10) && (func.constraints.length < 3 || parseInt(func.constraints[2][0],10) < parseInt(func.constraints[2][1], 10))) {
        if (button(width/2-50, ht+socm/1.17-20, 100, 40, 5, 206, 207, 225)) {
            grapphs[old].constraints = [];
            for (var c = 0; c < prevGraph.constraints.length; c ++) {
                grapphs[old].constraints.push([]);
                for (var j = 0; j < prevGraph.constraints[c].length; j ++) {
                    grapphs[old].constraints[c].push(parseFloat(prevGraph.constraints[c][j]));
                }
            }
            editCon = false;
        }
        resetMatrix();
        textAlign(CENTER, CENTER);
        textSize(30);
        fill(0, 0, 0);
        text("Done", width/2, ht+socm/1.17);
        textAlign(LEFT, BASELINE);
    }
};

var circButton = function(x, y, d, r, g, b) {
    resetMatrix();
    noStroke();

    fill(r,g,b);

    if (dist(mouseX, mouseY, x, y) < d/2) {

        fill(r-20, g-20, b-20);

        if(mousePressed) {

            fill(r-40, g-40, b-40);

        }

        if (mouseIsReleased) {
            deselect = false;
            return true;
        }

    }

    ellipse(x, y, d, d);
    pushMatrix();
    translate(0, funcTranslate);
};
var optionSelect = function(x, y, r) {
    popMatrix();
    
    fill(255, 255, 255);

    ellipse(x, y, 2*r, 2*r);

    if (dist(mouseX, mouseY, x, y) < r && mouseIsReleased) {

        return true;

    }
    pushMatrix();
};

var edit = function(func, i) {
    fill(0, 0, 0, 0);

    stroke(func.color);
    strokeWeight(1);

    rect(2, (i-currFuncs[0])*65+22,22,15);

    if (frameCount % 60 < 30 || keyPressed) {
        line(4+9 * renamePos, (i-currFuncs[0])*65+24, 4+9 * renamePos, (i-currFuncs[0])*65+35);
    }

    strokeWeight(1);
    rensub1 = func.name.substring(0, renamePos);
    rensub2 = func.name.substring(renamePos,func.name.length);

    console.log('edit:');
    if (myKey.keyCode != 0) {
        switch (myKey.keyCode) {
            case LEFT:
                if (renamePos > 0) {
                    renamePos--;
                }
                break;

            case RIGHT:
                if (renamePos <= func.name.length - 1) {
                    renamePos++;
                }
                break;

            case DELETE:
            case BACKSPACE:
                if (renamePos > 0) {
                    rensub1 = rensub1.substring(0, rensub1.length-1);
                    renamePos --;
                }
                break;

            default:
                rensub1 += key.toString();
                renprevKey = key.toString();
                renamePos++;

        }
        myKey.reset();
    }

    func.name = rensub1 + rensub2;
    funcs[i].name = func.name;

    if (mouseIsReleased) {

        if (mouseX < 2 || mouseX > 24 || mouseY < i*65+22+funcTranslate || mouseY > i*65+37+funcTranslate) {
            renprevKey = "";
            renamePos = 0;
            rensub1 = "";
            rensub2 = "";
            editOk = false;
            mouseIsReleased = false;
        }

    }

};
var hexagonbutton = function(x, y, s, col) {
    resetMatrix();

    noStroke();

    
//hexagonal collision detection

    var inTri1 = false;

    var inTri2 = false;

    var inRect = false;

    var alpha;

    var beta;

    var gamma;

    var tri1 = {

        p1: [x, y-s/1.6+0.5],

        p2: [x+s/2-0.5, y-s/3.4],

        p3:[x-s/2+0.5, y-s/3.4]

    };

    var tri2 = {

        p1: [x-s/2+0.5, y+s/3.4],

        p2: [x,y+s/1.6-0.5],

        p3: [x+s/2-0.5, y+s/3.4]

    };

    
//tri1

    alpha = ((tri1.p2[1] - tri1.p3[1])*(mouseX - tri1.p3[0]) + (tri1.p3[0] - tri1.p2[0])*(mouseY - tri1.p3[1])) / ((tri1.p2[1] - tri1.p3[1])*(tri1.p1[0] - tri1.p3[0]) + (tri1.p3[0] - tri1.p2[0])*(tri1.p1[1] - tri1.p3[1]));

    beta = ((tri1.p3[1] - tri1.p1[1])*(mouseX - tri1.p3[0]) + (tri1.p1[0] - tri1.p3[0])*(mouseY - tri1.p3[1])) / ((tri1.p2[1] - tri1.p3[1])*(tri1.p1[0] - tri1.p3[0]) + (tri1.p3[0] - tri1.p2[0])*(tri1.p1[1] - tri1.p3[1]));

    gamma = 1 - alpha - beta;

    
if (alpha > 0 && beta > 0 && gamma > 0) {

        inTri1 = true;

    }

    
//tri2

    alpha = ((tri2.p2[1] - tri2.p3[1])*(mouseX - tri2.p3[0]) + (tri2.p3[0] - tri2.p2[0])*(mouseY - tri2.p3[1])) / ((tri2.p2[1] - tri2.p3[1])*(tri2.p1[0] - tri2.p3[0]) + (tri2.p3[0] - tri2.p2[0])*(tri2.p1[1] - tri2.p3[1]));

    beta = ((tri2.p3[1] - tri2.p1[1])*(mouseX - tri2.p3[0]) + (tri2.p1[0] - tri2.p3[0])*(mouseY - tri2.p3[1])) / ((tri2.p2[1] - tri2.p3[1])*(tri2.p1[0] - tri2.p3[0]) + (tri2.p3[0] - tri2.p2[0])*(tri2.p1[1] - tri2.p3[1]));

    gamma = 1 - alpha - beta;

    
if (alpha > 0 && beta > 0 && gamma > 0) {

        inTri2 = true;

    }

    //rect

    if (mouseX > tri1.p3[0]-0.5 && mouseX < tri1.p2[0]+0.5 && mouseY > tri1.p2[1] && mouseY < tri2.p1[1]) {

        inRect = true;

    }

    
if (inTri1 || inTri2 || inRect) {

        if (mousePressed) {

            stroke(0, 0, 0);

            strokeWeight(1);

        }

        if (mouseIsReleased) {
            deselect = false;
            return true;

        }

    }

    

//drawing a hexagon

    fill(col);

    beginShape();

    vertex(x, y-s/1.6);

    vertex(x+s/2, y-s/3.4);

    vertex(x+s/2, y+s/3.4);

    vertex(x, y+s/1.6);

    vertex(x-s/2, y+s/3.4);

    vertex(x-s/2, y-s/3.4);

    vertex(x, y-s/1.6);

    endShape();
    pushMatrix();
    translate(0, funcTranslate);
};

var colorpick = function(funcname) {
    resetMatrix();
    pushMatrix();
    translate((width-min(width, height))/2, 0);
    scale(min(width, height)/400);
    fill(177, 177, 201);

    rect(40, 40, 320, 320);

    textSize(20);

    textAlign(CENTER, CENTER);

    fill(0, 0, 0);

    text("Color for " + funcs[funcname].name + ":", 200, 75);

    textAlign(LEFT, BASELINE);

    //hexagonal color picker
    colpickCols = [color(0, 51, 102), color(51, 102, 153), color(51, 102, 204), color(0, 51, 153), color(0, 0, 153), color(0, 0, 204), color(0, 0, 102)];

    for (var i = 140; i < 275; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2, 111*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-140)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-140)/20];

            colOn = false;

            return;

        }

    }


    colpickCols = [color(0, 102, 102), color(0, 102, 153), color(0, 153, 204), color(0, 102, 204), color(0, 51, 204), color(0, 0, 255), color(51, 51, 255), color(51, 51, 153)];

    for (var i = 130; i < 280; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,129*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-130)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-130)/20];

            colOn = false;

            return;

        }

    }

    
    colpickCols = [
        color(102, 153, 153),
        color(0, 153, 153),
        color(51, 204, 204),
        color(0, 204, 255),
        color(0, 153, 255),
        color(0, 102, 255),
        color(51, 102, 255),
        color(51, 51, 204),
        color(102, 102, 153)
    ];
    for (var i = 120; i < 290; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,147*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-120)/20], 10)) {
            funcs[funcname].color = colpickCols[(i-120)/20];
            colOn = false;
            return;
        }
    }


    colpickCols = [
        color(51, 153, 102),
        color(0, 204, 153),
        color(0, 255, 204),
        color(0, 255, 255),
        color(51, 204, 255),
        color(51, 153, 255),
        color(102, 153, 255),
        color(102, 102, 255),
        color(102, 0, 255),
        color(102, 0, 204)
    ];

    for (var i = 110; i < 300; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,165*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-110)/20], 10)) {
            funcs[funcname].color = colpickCols[(i-110)/20];
            colOn = false;
            return;
        }
    }

    colpickCols = [
        color(51, 153, 51),
        color(0, 204, 102),
        color(0, 255, 153),
        color(102, 255, 204),
        color(102, 255, 255),
        color(102, 204, 255),
        color(153, 204, 255),
        color(153, 153, 255),
        color(153, 102, 255),
        color(153, 51, 255),
        color(153, 0, 255)
    ];

    for (var i = 100; i < 310; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,183*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-100)/20], 10)) {
            funcs[funcname].color = colpickCols[(i-100)/20];
            colOn = false;
            return;
        }
    }

    colpickCols = [
        color(0, 102, 0),
        color(0, 204, 0),
        color(0, 255, 0),
        color(102, 255, 153),
        color(153, 255, 204),
        color(204, 255, 255),
        color(204, 204, 255),
        color(204, 153, 255),
        color(204, 102, 255),
        color(204, 51, 255),
        color(204, 0, 255),
        color(153, 0, 204)
    ];
    for (var i = 90; i < 320; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,201*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-90)/20], 10)) {
            funcs[funcname].color = colpickCols[(i-90)/20];
            colOn = false;
            return;
        }
    }

    colpickCols = [
        color(0, 51, 0),
        color(0, 153, 51),
        color(51, 204, 51),
        color(102, 255, 102),
        color(153, 255, 153),
        color(204, 255, 204),
        color(235, 235, 235),
        color(255, 204, 255),
        color(255, 153, 255),
        color(255, 102, 255),
        color(255, 0, 255),
        color(204, 0, 204),
        color(102, 0, 102)
    ];
    for (var i = 80; i < 330; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,219*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-80)/20], 10)) {
            funcs[funcname].color = colpickCols[(i-80)/20];
            colOn = false;
            return;
        }
    }

    colpickCols = [
        color(51, 102, 0),
        color(0, 153, 0),
        color(102, 255, 51),
        color(153, 255, 102),
        color(204, 255, 153),
        color(255, 255, 204),
        color(255, 204, 204),
        color(255, 153, 204),
        color(255, 102, 204),
        color(255, 51, 204),
        color(204, 0, 153),
        color(153, 51, 153)
    ];

    for (var i = 90; i < 320; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,237*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-90)/20], 10)) {
            funcs[funcname].color = colpickCols[(i-90)/20];
            colOn = false;
            return;
        }
    }

    colpickCols = [
        color(51, 51, 0),
        color(102, 153, 0),
        color(153, 255, 51),
        color(204, 255, 102),
        color(255, 255, 153),
        color(255, 204, 153),
        color(255, 153, 153),
        color(255, 102, 153),
        color(255, 51, 153),
        color(204, 51, 153),
        color(153, 0, 153)
    ];
    for (var i = 100; i < 310; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,255*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-100)/20], 10)) {
            funcs[funcname].color = colpickCols[(i-100)/20];
            colOn = false;
            return;
        }
    }

    colpickCols = [
        color(102, 102, 51),
        color(153, 204, 0),
        color(204, 255, 51),
        color(255, 255, 102),
        color(255, 204, 102),
        color(255, 153, 102),
        color(255, 102, 102),
        color(255, 0, 102),
        color(204, 102, 153),
        color(153, 51, 102)
    ];
    for (var i = 110; i < 300; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,273*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-110)/20], 10)) {
            funcs[funcname].color = colpickCols[(i-110)/20];
            colOn = false;
            return;
        }
    }


    colpickCols = [
        color(153, 153, 102),
        color(204, 204, 0),
        color(255, 255, 0),
        color(255, 204, 0),
        color(255, 153, 51),
        color(255, 102, 0),
        color(255, 80, 80),
        color(204, 0, 102),
        color(102, 0, 51)
    ];
    for (var i = 120; i < 290; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,291*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-120)/20], 10)) {
            funcs[funcname].color = colpickCols[(i-120)/20];
            colOn = false;
            return;
        }
    }

    colpickCols = [
        color(153, 102, 51),
        color(204, 153, 0),
        color(255, 153, 0),
        color(204, 102, 0),
        color(255, 51, 0),
        color(255, 0, 0),
        color(204, 0, 0),
        color(153, 0, 51)
    ];
    for (var i = 130; i < 280; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,309*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-130)/20], 10)) {
            funcs[funcname].color = colpickCols[(i-130)/20];
            colOn = false;
            return;
        }
    }

    colpickCols = [
        color(102, 51, 0),
        color(153, 102, 0),
        color(204, 51, 0),
        color(153, 51, 0),
        color(153, 0, 0),
        color(128, 0, 0),
        color(153, 51, 51)
    ];
    for (var i = 140; i < 270; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,327*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-140)/20], 10)) {
            funcs[funcname].color = colpickCols[(i-140)/20];
            colOn = false;
            return;
        }
    }

    
    //black
    if (hexagonbutton(325*min(width, height)/400+(width-min(width, height))/2, 315*min(width, height)/400, 45*min(width, height)/400, color(0, 0, 0), 15)) {
        funcs[funcname].color = color(0, 0, 0);
        colOn = false;
    }
    popMatrix();
    pushMatrix();
    translate(0, funcTranslate);
};

var optMenu = function() {
    resetMatrix();
    //up and down

    if (menuDown === true) {
        if (menuTranslate < 300) {
            menuTranslate += 3;

        }
    }
    if (menuUp === true) {
        if (menuTranslate > 150) {
            menuTranslate -= 3;
        }
    }

    if (menuTranslate === 150) {
        menuUp = false;
    }
    if (menuTranslate === 300) {
        menuDown = false;
    }
    noStroke();
    if (button(5, (height-325)+menuTranslate, 25, 30, 5, 175, 175, 175)) {
        if (menuUp === false && menuDown === false) {
            if (menuTranslate <= 150) {
                menuDown = true;
            }
            if (menuTranslate >= 300) {
                menuUp = true;
            }
        }
    }
    popMatrix();
    pushMatrix();

    translate(0, menuTranslate);

    stroke(255, 255, 255);

    strokeWeight(3);
    if (menuTranslate <= 150 || menuUp === true) {
        line(17.5, height-307, 11, height-316);
        line(17.5, height-307, 24, height-316);
    }
    if (menuTranslate >= 300 || menuDown === true) {
        line(17.5, height-316, 11, height-307);
        line(17.5, height-316, 24, height-307);
    }

    popMatrix();

    noStroke();

    
//drawing menu

    pushMatrix();

    translate(0, menuTranslate);

    fill(175, 175, 175);

    rect(0, height-300,300, 150);

    fill(0, 0, 0);

    textSize(25);

    textAlign(CENTER, CENTER);

    text("Options", 150, height-282);

    stroke(0, 0, 0);

    strokeWeight(1);

    line(0, height-265, 299, height-265);

    textSize(14);

    text("Angle Measure:", 60, height-245);

    textSize(15);

    text("Radians", 65, height-220);

    text("Degrees", 65, height-195);

    text("Graph Setting:", 210, height-245);
    text("Cartesian", 220, height-220);

    text("Parametric", 225, height-195);
    text("Polar", 205, height-170);

    popMatrix();

    fill(255, 255, 255);

    noStroke();

    if (optionSelect(167, height-220+menuTranslate, 10)) {

        graphSetting = "carte";

    }

    if (optionSelect(167, height-195+menuTranslate, 10)) {

        graphSetting = "para";

    }

    if (optionSelect(167, height-170+menuTranslate, 10)) {

        graphSetting = "polar";

    }

    
    if (optionSelect(20, height-220+menuTranslate, 10)) {
    
        degRad = "rad";
    
    }

    if (optionSelect(20, height-195+menuTranslate, 10)) {

        degRad = "deg";

    }

    
    pushMatrix();

    translate(0, menuTranslate);

    fill(0, 0, 0);

    if (degRad === "rad") {

        ellipse(20, height-220, 13, 13);

    }

    else {

        ellipse(20, height-195, 13, 13);

    }

    
    if (graphSetting === "carte") {

        ellipse(167, height-220, 13, 13);

    }

    if (graphSetting === "para") {

        ellipse(167, height-195, 13, 13);

    }

    if (graphSetting === "polar") {

        ellipse(167, height-170, 13, 13);

    }

    popMatrix();

    textAlign(LEFT, BASELINE);



};


//menus and dropdowns
var about = function() {
    resetMatrix();
    noStroke();
    fill(206, 207, 225);
    rect(width-300, height-300, 300, 300);
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(0, 0, 0);
    text("About", width-150, height-280);
    strokeWeight(3);
    stroke(0, 0, 0);
    line(width-300, height-260, width, height-260);
    textSize(15);
    text("We hope you have been\nenjoying CubicCalculator.\n\nIf you need to\ncontact us, e-mail us at\nandrewprasetya05@gmail.com\nor\nhprasetya02@gmail.com.\n\nHappy calculating!", width-150, height-160);
    noStroke();
    if (button(width-200, height-60, 100, 40, 5, 206, 207, 225)) {
        aboutopen = false;
    }
    resetMatrix();
    textSize(20);
    fill(0, 0, 0);
    text("Close", width-150, height-40);
    textAlign(LEFT, BASELINE);
};

var titleScreen = function() {
    pushMatrix();
    textAlign(CENTER, CENTER);
    if (translat === true) {
        
        translate(0, titleScroll);
        titleScroll-=abs((titleScroll - 1) * 0.1);
    }
    if (titleScroll < -width) {
        titleOn = false;
    }
    fill(150, 150, 150);
    noStroke();
    rect(0, 0, width, height);
    imageMode(CENTER);
    /* @pjs preload = "hpcubiccalc.png"; */
    PImage b;
    b = loadImage("hpcubiccalc.png");
    if (wh >= ht * 2.8) {
        image(b, width/2, height/2.5, 300*wh, 107*wh);
    } else {
        image(b, width/2, height/2.5, 560*ht, 200*ht);
    }
    fill(77, 77, 77, 150);
    textSize(12*wh);
    text("Click to proceed", 200*wh, 275*ht);
    textSize(10*wh);
    text("Andrew and Hazel Prasetya", 325*wh, 370*ht);
    textAlign(LEFT, BASELINE);
    if (mouseIsReleased) {
        translat = true;
    }
    popMatrix();
};

var funcDropDown = function() {
    deselect = true;
    if (funcState === -1) {
        funcTranslate-=abs((funcTranslate + 400) * 0.15);
        if (funcTranslate < -399) {
            funcState = 2;
        }
    }
    else if (funcState === 1) {
        funcTranslate += abs((funcTranslate) * 0.15);
        if (funcTranslate > -1) {
            funcState = 0;
        }
    }
    pushMatrix();
    translate(0, funcTranslate);
    noStroke();
    if (funcState !== 2) {
        if (funcState === -1) {
            button(width-80, -3, 83, 33, 3, 206, 207, 225);
            fill(97, 97, 97);
            textAlign(CENTER, CENTER);
            textSize(13);
            resetMatrix();
            text("Add Graph", width-40, 13);
            textAlign(LEFT, BASELINE);
        }
        resetMatrix();
        translate(0, funcTranslate);
        noStroke();
        fill(226, 227, 245);
        rect(0, 0, width, 400);
        
        //rename/edit function
        if (editOk !== false) {
    
            edit(funcs[editOk+currFuncs[0]], editOk+currFuncs[0]);
    
        }
        
        //other stuff
        if (editOk === false && colOn === false && menuUp === false && currFunc !== "" && helpopen === false) {
    
            strokeWeight(1);
            sub1 = funcs[currFunc-currFuncs[0]].func.substring(0, pos);
            sub2 = funcs[currFunc-currFuncs[0]].func.substring(pos,funcs[currFunc].func.length);

            if (myKey.keyCode != 0) {
                switch (myKey.keyCode) {
                    case LEFT:
                        if (pos > 0) {
                            pos--;
                        }
                        break;

                    case RIGHT:
                        if (pos <= funcs[currFunc-currFuncs[0]].func.length-1) {
                            pos++;
                        }
                        break;

                    case DELETE:
                    case BACKSPACE:
                        if (pos > 0) {
                            sub1 = sub1.substring(0, sub1.length-1);
                            funcs[currFunc-currFuncs[0]].func = sub1 + sub2;
                            pos --;
                        }
                        break;

                    case UP:
                        if (currFunc >= 1) {
                            currFunc --;
                            pos = funcs[currFunc-currFuncs[0]].func.length;
                        }
                        break;

                    case DOWN:
                        if (currFunc-currFuncs[0] <= funcs.length-1) {
                            currFunc++;
                            pos = funcs[currFunc-currFuncs[0]].func.length;
                        }
                        break;

                    default:
                        if ((myKey.keyCode == 32) || (myKey.keyCode >= 48)) {
                            sub1 += key.toString();
                            prevKey = key.toString();
                            funcs[currFunc-currFuncs[0]].func = sub1 + sub2;
                            pos++;
                        }
                }
                myKey.reset();
            }
    
            if (mouseIsPresed && mouseY > currFunc*65+15+funcTranslate && mouseY < currFunc*65+60+funcTranslate && mouseX > 25 && mouseX < width-25) {
                deselect = false;

                if (round((mouseX-30)/(tSize/1.818)) > funcs[currFunc-currFuncs[0]].func.length) {
                    pos = funcs[currFunc-currFuncs[0]].func.length;
                }
                else {
                    pos = round((mouseX-35)/(tSize/1.818));
                }
            }
        }
        
        //drawing boxes and taking mouse input
        for (var i = currFuncs[0]; i < currFuncs[1]; i++) {
    
            fill(0, 0, 0);
    
            textSize(15);
    
            stroke(funcs[i].color);
    
            fill(255, 255, 255);
    
            strokeWeight(1);
    
            if (i === currFunc) {
                strokeWeight(2);
    
            }
    
            rect(30, (i-currFuncs[0])*65 + 15, width-75, 50, 3);
            if (funcs[i].func.length < (width-60)/23.214) {
    
                tSize = 40;
    
                textSize(tSize);
    
            }
    
            else {
    
                tSize = 40/(funcs[i].func.length/((width-60)/23.214));
    
                textSize(tSize);
    
            }
    
            fill(0, 0, 0);
            text(funcs[i-currFuncs[0]].func, 35, (i-currFuncs[0])*65-7 + 60);
    
            if (mouseIsPresed && mouseY > (i-currFuncs[0])*65+15+funcTranslate&& mouseY < (i-currFuncs[0])*65+65+funcTranslate&& mouseX > 25 && mouseX < width-45 && mouseY < 400+funcTranslate && editOk === false && colOn === false && helpopen === false && currFunc !== i) {
                deselect = false;
                currFunc = i;
                pos = funcs[currFunc-currFuncs[0]].func.length;
            }
            if (mouseIsReleased && mouseY > (i-currFuncs[0])*65+15+funcTranslate&& mouseY < (i-currFuncs[0])*65+65+funcTranslate&& mouseX > 25 && mouseX < width-45 && mouseY < 400+funcTranslate && helpopen === false) {
                deselect = false;
            }
    
            noStroke();
    
            strokeWeight(1);
    
            if (editOk === false && colOn === false && menuUp === false && helpopen === false) {
    
                if (button(2, (i-currFuncs[0])*65+20+funcTranslate, 25, 20, 2, 226, 227, 245)) {
    
                    editOk = i-currFuncs[0];
    
                    renamePos = funcs[editOk].name.length;
    
                }
    
            }
            
            fill(0, 0, 0);
    
            textSize(15);
    
            fill(funcs[i].color);
    
            text(funcs[i].name,5, (i-currFuncs[0])*65+35);
    
            noStroke();
    
            strokeWeight(1);
    
            noFill();
    
        }
    
        
        
        //buttons to shift viewing window
        if (funcs.length > 6) {
            if (colOn === false && menuUp === false && editOk === false && helpopen === false) {
                //go up
                if (currFuncs[0] !== 0) {
                    if (circButton(width-21, 50+funcTranslate, 30, 175, 175, 175)) {
                        if (currFunc+1 === currFuncs[1]) {
                            currFunc --;
                        }
                        currFuncs[0] -= 1;
                        currFuncs[1] -= 1;
                    }
                }
                //go down
                if (currFuncs[1]-1 !== funcs.length-1) {
                    if (circButton(width-21, 90+funcTranslate, 30, 175, 175, 175)) {
                        currFuncs[0] += 1;
                        currFuncs[1] += 1;
                    }
                }
            }
            else {
                fill(175, 175, 175);
                ellipse(width-21, 50, 30, 30);
                ellipse(width-21, 90, 30, 30);
            }
        
            //lines drawn over scroll buttons to signify meaning
            stroke(255, 255, 255);
            strokeWeight(3);
            if (currFuncs[0] !== 0) {
                line(width-21, 43, width-30, 53);
                line(width-21, 43, width-12, 53);
            }
            if (currFuncs[1]-1 !== funcs.length-1) {
                line(width-21, 98, width-30, 88);
                line(width-21, 98, width-12, 88);
            }
        }
        
        //new or delete function
        if (colOn === false && menuUp === false && editOk === false && helpopen === false) {
    
            //delete function
    
            if (circButton(width-22, 360+funcTranslate, 30, 175, 175, 175) && funcs.length>1 && currFunc !== "") {
    
                funcs.splice(currFunc, 1);
                currFuncs[1]--;
                if (currFunc === funcs.length) {
    
                    currFunc--;
    
                }
                if (funcs.length >= 6) {
                    currFuncs[0]--;
                }
                pos = funcs[currFunc].func.length;
    
            }
     
           //new function
    
            if (circButton(width-22, 320+funcTranslate, 30, 175, 175, 175)) {
    
                letts = {};
    
                for (var i = 0; i < funcs.length;i++) {
    
                    if (!(funcs[i].name[0] in letts)) {
    
                        var funcLett = funcs[i].name[0];
    
                        letts[funcLett] = [];
    
                    }
    
                }
    
                for (var i = 0; i < funcs.length; i++) {
                    letts[funcs[i].name[0]].push(funcs[i].name[1]);
                }
                var decided = false;
                for (var x = 0; x < funcLetts.length; x++) {
                    for (var i = 1; i < 10; i++) {
                        if (funcLetts[x] in letts) {
                            if (letts[funcLetts[x]].indexOf(str(i)) === -1) {
                                funcs.push({"func":"","name":funcLetts[x] + str(i),"color":color(0, 0, 255)});
                                decided = true;
                                break;
                            }
                        }
                        else if (i === 1 && funcLetts[x] !== "f") {
                            funcs.push({"func":"","name":funcLetts[x] + str(i),"color":color(255, 0, 0)});
                            decided = true;
                            break;
                        }
                    }
                    if (decided === true) {
                        break;
                    }
                }
    
                currFunc = funcs.length-1;
                if (funcs.length > 6) {
                    currFuncs[0] += 1;
                }
                currFuncs[1] += 1;
                pos = funcs[currFunc].func.length;
    
            }
    
        }
        else {
    
            fill(175, 175, 175);
    
            noStroke();
    
            ellipse(width-22, 360+funcTranslate, 30, 30);
    
            ellipse(width-22, 320+funcTranslate, 30, 30);
    
        }
    
        //lines drawn over function buttons to signify meaning
    
        stroke(255, 255, 255);
        strokeWeight(3);
        line(width-14, 360, width-30, 360);
        line(width-31, 320, width-13, 320);
        line(width-22, 311, width-22, 328);
    
        //Color Picker
        for (var i = 0; i < currFuncs[1]; i++) {
    
            noStroke();
    
            if (button(2, i * 65 +45+funcTranslate, 25, 15, 2, 226, 227, 245) && helpopen === false) {
    
                colOn = i;
    
            }
    
            textSize(8);
    
            fill(0, 0, 0);
    
            text("Color", 4, i*65+56);
    
        }
    }
    noStroke();
    if (button(0, 399+funcTranslate, 30, 30, 3, 206, 207, 225) && helpopen === false) {
        if (funcState === 0 || funcState === 1) {
            funcState = -1;
        }
        else if (funcState === 2|| funcState === -1) {
            graphopen = false;
            funcState = 1;
        }
    }
    if (funcState === 0 || funcState === 1) {
        stroke(255, 255, 255);
        strokeWeight(3);
        line(5, 413, 15, 406);
        line(15, 406, 25, 413);
        line(5, 423, 15, 416);
        line(15, 416, 25, 423);
    }
    else if (funcState === 2||funcState === -1) {
        stroke(255, 255, 255);
        strokeWeight(3);
        line(5, 415, 15, 422);
        line(15, 422, 25, 415);
        line(5, 405, 15, 412);
        line(15, 412, 25, 405);
    }
    
    
    //flashing line for function value
    if (!(deselect === true && mouseIsReleased === true)) {
        strokeWeight(1);
        if (frameCount % 60 < 30 && editOk === false || keyPressed && editOk === false) {
            if (tSize === 40) {
                stroke(0, 0, 0);
                strokeWeight(1);
                line(35 + 0.55*tSize * (pos), (currFunc-currFuncs[0])*65+20, 35 + 0.55*tSize * pos, (currFunc-currFuncs[0])*65+59);
            }
    
            else {
                stroke(0, 0, 0);
                strokeWeight(1);
                line(35 + 0.55*tSize * (pos), (currFunc-currFuncs[0])*65+23+0.1*tSize, 35 + 0.55*tSize * pos, (currFunc-currFuncs[0])*65+59-0.1*tSize);
            }
    
        }
    }
    
    
    resetMatrix();
    pushMatrix();
    translate(0, funcTranslate);
    
    if (mouseIsReleased && deselect === true && editOk === false && colOn === false && menuUp === false && helpopen === false) {
        currFunc = "";
    }
};

var addGraph = function() {
    translate(0, 400+funcTranslate);
    noStroke();
    fill(205, 206, 225);
    rect(width-130, 0, 130, ceil(funcs.length/3)*30+85);
    noStroke();
    if (button(width-120, floor((funcs.length-1)/3)*30+480+funcTranslate, 60, 25, 5, 205, 206, 225)) {
        graphopen = false;
        selected = {func: [], name: [], color: [], constraints:[[-10, 10], [-10, 10]], vars: []};
    }
    if (button(width-50, floor((funcs.length-1)/3)*30+480+funcTranslate, 40, 25, 5, 205, 206, 225)) {
        if (selected.func !== []) {
            grapphs.push(selected);
        }
        selected = {func: [], name: [], color: [], constraints:[[-10, 10], [-10, 10]], vars: []};
        graphopen = false;
    }
    resetMatrix();
    translate(0, 400+funcTranslate);
    fill(100, 100, 100);
    textSize(15);
    textAlign(CENTER, CENTER);
    text("Add graph for:", width-65, 15);
    text("Cancel", width-91, floor((funcs.length-1)/3)*30+92);
    text("OK", width-30, floor((funcs.length-1)/3)*30+92);
    stroke(0, 0, 0);
    strokeWeight(1);
    line(width-130, 30, width, 30);
    line(width-130, floor((funcs.length-1)/3)*30+70, width, floor((funcs.length-1)/3)*30+70);
    noStroke();
    for (var i = 0; i < funcs.length; i++) {
        if (i%3 === 0) {
            noStroke();
            if (inArr(funcs[i].func, selected.func) === true) {
                stroke(0, 0, 0);
                strokeWeight(1);
            }
            if (button(width-120, floor(i/3)*30 +440+funcTranslate, 30, 20, 3, 205, 206, 225)) {
                if (inArr(funcs[i].func, selected.func) === false) {
                    selected.func.push(funcs[i].func);
                    selected.name.push(funcs[i].name);
                    selected.color.push(funcs[i].color);
                    selected.vars = union(selected.vars, dimensionsOfFunc(funcs[i].func));
                    if (dimensionsOfFunc(funcs[i].func).length === 2) {
                        selected.constraints.push([-10, 10]);
                        graph3DCount ++;
                    }
                }
            }
            resetMatrix();
	    translate(0, 400+funcTranslate);
            fill(100, 100, 100);
            textSize(15);
            text(funcs[i].name, width-106, floor(i/3)*30+50);
        }
        else if (i%3 === 1) {
            noStroke();
            if (inArr(funcs[i].func, selected.func) === true) {
                stroke(0, 0, 0);
                strokeWeight(1);
            }
            if (button(width-80, floor(i/3)*30+440+funcTranslate, 30, 20, 3, 205, 206, 225)) {
                if (inArr(funcs[i].func, selected.func) === false) {
                    selected.func.push(funcs[i].func);
                    selected.name.push(funcs[i].name);
                    selected.color.push(funcs[i].color);
                    selected.vars = union(selected.vars, dimensionsOfFunc(funcs[i].func));
                    if (dimensionsOfFunc(funcs[i].func).length === 2) {
                        selected.constraints.push([-10, 10]);
                        graph3DCount ++;
                    }
                }
            }
            resetMatrix();
            translate(0, 400+funcTranslate);
            fill(100, 100, 100);
            textSize(15);
            text(funcs[i].name, width-66, floor(i/3)*30+50);
        }
        else if (i%3 === 2) {
            noStroke();
            if (inArr(funcs[i].func, selected.func) === true) {
                stroke(0, 0, 0);
                strokeWeight(1);
            }
            if (button(width-40, floor(i/3)*30+440+funcTranslate, 30, 20, 3, 205, 206, 225)) {
                if (inArr(funcs[i].func, selected.func) === false) {
                    selected.func.push(funcs[i].func);
                    selected.name.push(funcs[i].name);
                    selected.color.push(funcs[i].color);
                    selected.vars = union(selected.vars, dimensionsOfFunc(funcs[i].func));
                    if (dimensionsOfFunc(funcs[i].func).length === 2) {
                        selected.constraints.push([-10, 10]);
                        graph3DCount ++;
                    }
                }
            }
            resetMatrix();
            translate(0, 400+funcTranslate);
            fill(100, 100, 100);
            textSize(15);
            text(funcs[i].name, width-26, floor(i/3)*30+50);
        }
    }
    textAlign(LEFT, BASELINE);
};

var help = function() {
    resetMatrix();
    fill(255, 255, 255, 100);
    rect(0, 0, width, height);
    fill(200, 200, 200);
    rect(width-300, height-300,300, 300);
    fill(0, 0, 0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Help", width-150, height-280);
    stroke(0, 0, 0);
    strokeWeight(2);
    line(width-300, height-260, width, height-260);
    switch(helpState) {
        case 1:
            textSize(15);
            funcState = 2;
            funcTranslate = -400;
            text("Welcome to the help tutorial!\n\nTo start editing and creating\nfunctions, click on the button\nwith two arrows.\n\nIf you want to make a graph\nfor one of your functions, click\non the button at the top-left.", width-150, height-160);
            line(20, 25, 60, 80);
            textSize(13);
            text("Click to open\nfunctions editor", 60, 100);
            line(width-50, 25, width-110, 80);
            text("Click to select which\ngraph you want shown", width-110, 100);
            break;
        case 2:
            funcState = 0;
            funcTranslate = 0;
            textSize(12);
            text("Once you open up the functions\neditor, there are several functions\nyou can use.\n\nYou can create or delete functions\nusing the buttons in the bottom-left.\nWith 6 or more functions, two arrow\nbuttons will appear, allowing you to\nscroll through the buttons.\n\nYou can rename and change the color\nof the graphs of specific functions by\nclicking either the name or the 'color'\nbutton of the function, respectively.", width-150, height-155);
            line(25, 30, 60, 15);
            text("Click to\nrename function", 105, 20);
            line(25, 55, 100, 100);
            text("Click to change\ncolor of graph for function", 155, 105);
            line(15, 395, 70, 330);
            text("Click to close\nfunction menu", 120, 325);
            break;
        case 3:
            funcState = 2;
            funcTranslate = -400;
            textSize(20);
            text("Now that you know how\nto use CubicCalculator,\nstart graphing!", width-150, height-155);
    }
    textSize(15);
    text("Page " + helpState + "/3", width-150, height-30);
    noStroke();
    if (helpState !== 1) {
        if (button(width-285, height-50, 80, 40, 5, 210, 210, 210)) {
            helpState --;
        }
        resetMatrix();
        fill(0, 0, 0);
        textSize(13);
        text("Prev Page", width-245, height-30);
    }
    if (button(width-95, height-50, 80, 40, 5, 210, 210, 210) && helpState !== 3) {
        helpState++;
        mouseIsReleased = false;
    }
    if (button(width-95, height-50, 80, 40, 5, 210, 210, 210) && helpState === 3) {
        helpopen = false;
    }
    resetMatrix();
    fill(0, 0, 0);
    textSize(13);
    if (helpState !== 3) {
        text("Next Page", width-55, height-30);
    }
    else {
        text("Exit Help", width-55, height-30);
    }
    textAlign(LEFT, BASELINE);
};

//draw loop, makes program actually function and enables interaction
void draw() {
    background(255, 255, 255);
    //functions menu
    if (titleOn === false && editCon === false) {
        resetMatrix();
        funcDropDown();
        resetMatrix();
    }
    else {
        pushMatrix();
        translate(0, funcTranslate);
        background(255, 255, 255);
        fill(226, 227, 245);
        rect(0, 0, width, 400);
        circButton(width-20, height-20, 30, 206, 207, 225);
        circButton(width-20, height-60, 30, 206, 207, 225);
        resetMatrix();
        textFont(createFont("times new roman"));
        textAlign(CENTER, CENTER);
        fill(255, 255, 255);
        textSize(28);
        text("i", width-20, height-60);
        textAlign(LEFT, BASELINE);
        textFont(createFont("monospace"));
        fill(255, 255, 255);
        textFont(createFont("arial"));
        textAlign(CENTER, CENTER);
        textSize(23);
        text("?", width-20, height-20);
        translate(0, funcTranslate);
        textAlign(LEFT, BASELINE);
        textFont(createFont("monospace"));
        stroke(0, 0, 0);
        strokeWeight(3);
        rect(30, 15, width-75, 50);
        noStroke();
        button(1, 20+funcTranslate, 25, 20, 2, 226, 227, 245);
        button(2, 45+funcTranslate, 25, 15, 2, 226, 227, 245);
        fill(0, 0, 0);
        textSize(8);
        text("Color", 4, 56);
        fill(0, 0, 0);
        textSize(15);
        fill(funcs[0].color);
        text(funcs[0].name,5, +35);
        noStroke();
        circButton(width-22, 320+funcTranslate, 30, 175, 175, 175);
        circButton(width-22, 360+funcTranslate, 30, 175, 175, 175);
        strokeWeight(1);
        button(0, 399+funcTranslate, 30, 30, 3, 206, 207, 225);
        resetMatrix();
        translate(0, funcTranslate);
        noFill();
        stroke(255, 255, 255);
        strokeWeight(3);
        line(width-14, 360, width-30, 360);
        line(width-31, 320, width-13, 320);
        line(width-22, 311, width-22, 328);
        line(5, 413, 15, 406);
        line(15, 406, 25, 413);
        line(5, 423, 15, 416);
        line(15, 416, 25, 423);
        noStroke();
        button(width-80, 400+funcTranslate, 83, 30, 3, 206, 207, 225);
        resetMatrix();
        translate(0, funcTranslate);
        fill(97, 97, 97);
        textAlign(CENTER, CENTER);
        textSize(13);
        text("Add Graph", width-40, 413);
        textAlign(LEFT, BASELINE);
        popMatrix();
    }
    
    //drawing graphs
    for (var i = 0; i < grapphs.length; i++) {
        resetMatrix();
        textSize(15);
        pushMatrix();
        translate(0, funcTranslate+400);
        fill(grapphs[i].color[0]);
        textAlign(CENTER, CENTER);
        textSize(15);
        if (grapphs[i].func.length === 1) {
            if (str(grapphs[i].name+"("+grapphs[i].vars+") = "  + grapphs[i].func).length > 18) {
                textSize(15/(textWidth(str(grapphs[i].name+"("+grapphs[i].vars+") = "  + grapphs[i].func))/150));
            }
            text(grapphs[i].name+"("+grapphs[i].vars+") = "  + grapphs[i].func, ((i%floor(width/200))*min(width, height)/1.5)+min(width, height)/4+25, (min(width, height)/3 + 30)*(floor(i/floor(width/200)))+40);
        }
        else {
            fill(0, 0, 0);
            var string = "";
            for (var x = 0; x < grapphs[i].name.length; x++) {
                string+=grapphs[i].name[x];
                if (x !== grapphs[i].name.length-1) {
                    string+=", ";
                }
            }
            if (string.length > 18) {
                textSize(15/(textWidth(string)/150));
            }
            text(string,  ((i%floor(width/200))*min(width, height)/1.5) +min(width, height)/4+25, (min(width, height)/1.5+30)*(floor(i/floor(width/200)))+40);
        }
        noStroke();
        if (button((i%floor(width/200))*min(width, height)/1.5 + min(width,height)/4-50, (min(width, height)/1.5+30)*(floor(i/floor(width/200)))+457+funcTranslate, 100, 20, 2, 226, 227, 245)&&editCon === false&&colOn === false && graphopen === false && helpopen === false) {
            prevGraph = {"constraints": [], "index": i};
            for (var c = 0; c < grapphs[i].constraints.length; c ++) {
                prevGraph.constraints.push([]);
                for (var j = 0; j < grapphs[i].constraints[c].length; j ++) {
                    prevGraph.constraints[c].push(grapphs[i].constraints[c][j]);
                }
            }
            editCon = [prevGraph, i];
            constraintPos = str(prevGraph.constraints[0][0]).length;
            currCons = "startX";
        }
        if (button((i%floor(width/200))*min(width, height)/1.5 + min(width,height)/4+60, (min(width, height)/1.5 + 30)*(floor(i/floor(width/200)))+457+funcTranslate, 20, 20, 2, 226, 227, 245)&&editCon === false&&helpopen === false) {
            grapphs.splice(i, 1);
            break;
        }
        stroke(255, 0, 0);
        strokeWeight(3);
        line(i%floor(width/200)*min(width, height)/1.5 + min(width,height)/4+65, (min(width, height)/1.5+30)*(floor(i/floor(width/200)))+472,i%floor(width/200)*min(width, height)/1.5 + min(width,height)/4+75, (min(width, height)/1.5 + 30)*(floor(i/floor(width/200)))+462);
        line(i%floor(width/200)*min(width, height)/1.5 + min(width,height)/4+65, (min(width, height)/1.5+30)*(floor(i/floor(width/200)))+462,i%floor(width/200)*min(width, height)/1.5 + min(width,height)/4+75, (min(width, height)/1.5 + 30)*(floor(i/floor(width/200)))+472);
        fill(0, 0, 0);
        textSize(10);
        text("Edit Constraints", min(width, height)/1.5*(i%floor(width/200)) + min(width,height)/4, (min(width, height)/1.5 + 30)*(floor(i/floor(width/200)))+467);
        textAlign(LEFT, BASELINE);
        textSize(13);
        resetMatrix();
	graph(grapphs[i].func, grapphs[i].color, grapphs[i].vars, grapphs[i].constraints, min(width, height)/1.5+25, floor(i*min(width,height)/1.5/3)+ 495+funcTranslate, min(width, height)/2, min(width, height)/2);

    }
    
    //color menu
    if (colOn !== false && editOk === false && menuUp === false && helpopen === false) {
        noStroke();
        colorpick(colOn-currFuncs[0]);

    }
    
    //editing constraints
    if (editCon !== false) {
        editconstraints(editCon[0], editCon[1]);
    }
    
    //options menu
    optMenu();
    
    //add graph button
    noStroke();
    if (titleOn === false && editCon === false) {
        if (graphopen === true) {
            addGraph();
        }
        if (graphopen === false) {
            if (funcState === 2) {
                noStroke();
                if (button(width-80, -3, 83, 33, 3, 206, 207, 225)) {
                    graphopen = true;
                }
                resetMatrix();
                fill(97, 97, 97);
                textAlign(CENTER, CENTER);
                textSize(13);
                text("Add Graph", width-40, 13);
                textAlign(LEFT, BASELINE);
            }
            else {
                noStroke();
                if (button(width-80, 400+funcTranslate, 83, 30, 3, 206, 207, 225)) {
                    graphopen = true;
                }
                fill(97, 97, 97);
                textAlign(CENTER, CENTER);
                textSize(13);
                text("Add Graph", width-40, 413);
                textAlign(LEFT, BASELINE);
            }
        }
    }
    
    //title screen
    if (titleOn === true) {
        titleScreen();
    }
    
    
    //help button
    if (titleOn === false && editCon === false) {
        noStroke();
        if (circButton(width-20, height-20, 30, 206, 207, 225)) {
            helpState = 1;
            helpopen = true;
            mouseIsReleased = false;
        }
        resetMatrix();
        textFont(createFont("arial"));
        textAlign(CENTER, CENTER);
        fill(255, 255, 255);
        textSize(23);
        text("?", width-20, height-20);
        textAlign(LEFT, BASELINE);
        textFont(createFont("monospace"));
        if (helpopen === true) {
            help();
        }
    }
    
    //about button
    if (titleOn === false && helpopen === false && editCon === false) {
        noStroke();
        if (circButton(width-20, height-60, 30, 206, 207, 225)) {
            aboutopen = true;
            mouseIsReleased = false;
        }
        if (aboutopen === true) {
            about();
        }
        else {
            resetMatrix();
            textFont(createFont("times new roman"));
            textAlign(CENTER, CENTER);
            fill(255, 255, 255);
            textSize(28);
            text("i", width-20, height-60);
            textAlign(LEFT, BASELINE);
            textFont(createFont("monospace"));
        }
    }
    
    //handling mouse/key on/off

    mouseIsPresed = false;
    mouseIsReleased = false;
};

//mouse and key functions
void mousePressed() {
    if (prevMouse !== true) {
        mouseIsPresed = true;
    }
};

void mouseReleased() {
    mouseIsReleased = true;
};

void keyPressed() {
    myKey.keyCode = keyCode;
};

void keyReleased() {
    myKey.reset();
};
