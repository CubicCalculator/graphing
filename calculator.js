
smooth();

var g = '2.*a + 2*b - 3 * (a / b) + 15.';
var f = '(x - 2)^2';

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
        if (func[i] === '(') {
            depth ++;
            if (depth === 1) {
                start = i;
            }
        }
        if (func[i] === ')') {
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
    while (('0123456789.-'.split('').indexOf(func[pos]) > -1 || !numFound) && !negative) {
        if ('0123456789.'.split('').indexOf(func[pos]) > -1 && !numFound) {
            numFound = true;
            end = pos;
        }
        if (func[pos] === '-' && numFound) {
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
    while (('0123456789.-'.split('').indexOf(func[pos]) > -1 || !numFound) && ('-' !== func[pos] || !numFound)) {
        if ('0123456789.-'.split('').indexOf(func[pos]) > -1 && !numFound && origPos !== pos) {
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
    
    return {'num': total.toString(), 'newPos': idx - (first[1] - first[0]) + total.toString().length - 1, 'start': first[0], 'end': second[1]};
};

var add = function(a, b) { return a + b; };
var subtract = function(a, b) { return a - b; };
var multiply = function(a, b) { return a * b; };
var divide = function(a, b) { return a / b; };

var evaluate = function(func, vars, values) {
    func = func.toLowerCase();
    func = func.replace(/\s/g, '');
    func = func.replace(/e/g, '2.718281828459045');
    func = func.replace(/pi/g, '3.141592653589793');
    
    // replace variables
    for (var i = 0; i < vars.length; i ++) {
        while (func !== func.replace(vars[i], values[i])) {
            func = func.replace(vars[i], values[i]);
        }
    }

    var result = 0;
    
    // find parentheses and handle them
    while (!isEqual(findGroup(func), [-1, -1])) {
        var currGroup = findGroup(func);
        func = func.substring(0, currGroup[0]) + 
            evaluate(func.substring(currGroup[0] + 1, currGroup[1]), [], []) +
            func.substring(currGroup[1] + 1, func.length);
    }
    
    // exponents
    for (var i = 0; i < func.length; i ++) {
        if (func[i] === '^') {
            
            var total = operate(func, i, pow);
            
            func = func.substring(0, total.start) + total.num + func.substring(total.end, func.length);
            i = total.newPos;
        }
    }
    
    // multiplication/division
    for (var i = 0; i < func.length; i ++) {
        if ('*/'.split('').indexOf(func[i]) > -1) {
            var total = operate(func, i, (func[i] === '*') ? multiply : divide);
            
            func = func.substring(0, total.start) + total.num + func.substring(total.end, func.length);
            i = total.newPos;
        }
    }
    
    // addition/subtraction
    for (var i = 0; i < func.length; i ++) {
        if ('+-'.split('').indexOf(func[i]) > -1) {
            
            var total = operate(func, i, (func[i] === '+') ? add : subtract);
            
            func = func.substring(0, total.start) + total.num + func.substring(total.end, func.length);
            i = total.newPos;
        }
    }
    
    return parseFloat(func);
};

var graph2D = function(func, vars, constraints, x, y, w, h) {
    pushMatrix();
    println(x);
    translate(x, y);
    //scale(100);
    for (var v = 0; v < constraints.length; v ++) {
        if (constraints[v][0] > constraints[v][1]) {
            constraints[v][0] += constraints[v][1];
            constraints[v][1] = constraints[v][0] - constraints[v][1];
            constraints[v][0] -= constraints[v][1];
        }
    }
    
    var xInterval = (constraints[0][1] - constraints[0][0]) / 200;
    var yInterval = (constraints[1][1] - constraints[1][0]) / 200;
    stroke(0);
    strokeWeight(1);
    line(0,0,0,200);
    line(0,0,200,0);
    line(200,0,200,200);
    line(0,200,200,200);
    line(100, 0, 100, 200);
    line(0, 100, 200, 100);
    var prevRes = evaluate(func, vars, [constraints[0][0]]);
    var prev = [0, 100 - (prevRes/yInterval)];
    for (var i = constraints[0][0] + xInterval; i <= constraints[0][1]; i += xInterval) {
        var res = evaluate(func, vars, [i]);
        if (res >= constraints[1][0] && res <= constraints[1][1] && prevRes >= constraints[1][0] && prevRes <= constraints[1][1] ) {
            //strokeWeight(10);
            line(prev[0], prev[1], (i - constraints[0][0])/xInterval, 100 - (res/yInterval));
        }
        
        prevRes = res;
        prev = [(i - constraints[0][0])/xInterval, 100 - (res/yInterval)];
    }
    popMatrix();
};
var graph = function(func, vars, constraints, x, y, w, h) {
    if (vars.length === 1) {
        graph2D(func, vars, constraints, x, y, w, h);
    } else if (vars.length === 2) {
        
    } else {
        throw 'Attempted to graph in more than 3 dimensions';
    }
};

//println('f(2) = ' + evaluate(f, ['x'], [2]));

graph(f, ['x'], [[-2, 2], [-4, 4]], 100, 100);
draw = function() {
    //background(255, 255, 255);
    //graph(f, ['x'], [[-2, 2], [-4, 4]]);
};
