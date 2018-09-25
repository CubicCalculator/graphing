
smooth();
//global variables lmao

var funcs = [{"func": "", "name": "f1", "color": color(0, 0, 0)}];

var keyIsPresed = false;

var prevKey = "";

var keyIsReleased = false;

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


//actual code

textFont(createFont("monospace"));


var scroll = function(x, y, w, h, r, g, b) {

    noStroke();
    
fill(r, g, b);
    
if (mouseX > x && mouseY > y && mouseX < x+w && mouseY < y+h) {

        fill(r-15, g-15, b-15);

        if (mouseIsPressed) {

            fill(r-40, g-40, b-40);

        }


        rect(x, y, w, h);

        if (mouseIsPressed) {

            return true;

        }

    }
};

var circButton = function(x, y, d, r, g, b) {

    noStroke();

    fill(r,g,b);

    if (dist(mouseX, mouseY, x, y) < d/2) {

        fill(r-20, g-20, b-20);

        if(mouseIsPressed) {

            fill(r-40, g-40, b-40);

        }

        if (mouseIsReleased) {

            return true;
        }

    }

    ellipse(x, y, d, d);

};

var button = function(x, y, w, h, rad, r, g, b) {

    fill(r, g, b);

    if (mouseX > x && mouseY > y && mouseX < x+w && mouseY < y+h) {

        fill(r-15, g-15, b-15);

        if (mouseIsPressed) {

            fill(r-30, g-30, b-30);

        }

        if (mouseIsReleased) {

            return true;

        }

    }

    rect(x, y, w, h, rad);

};

var optionSelect = function(x, y, r) {

    fill(255, 255, 255);

    ellipse(x, y, 2*r, 2*r);

    if (dist(mouseX, mouseY, x, y) < r && mouseIsReleased) {

        return true;

    }

};

var edit = function(func, i) {

    fill(0, 0, 0, 0);

    stroke(func.color);

    strokeWeight(1);

    rect(2, i*65+22,22,15);

    
if (frameCount % 60 < 30 || keyIsPressed) {

        line(4+9 * renamePos, i*65+24, 4+9 * renamePos, i*65+35);

    }

    strokeWeight(1);

    rensub1 = func.name.substring(0, renamePos);

    rensub2 = func.name.substring(renamePos,func.name.length);

    if (keyIsPresed && keyCode !== 16 && key.code !== 8 && keyCode !== UP && keyCode !== DOWN && keyCode !== LEFT && keyCode !== RIGHT && keyCode !== 18 && keyCode !== 17 && keyCode !== 20 && keyCode !== 157 && func.name.length <2) {

        rensub1 += key.toString();

        renprevKey = key.toString();

        renamePos++;

    }

    if (keyIsPresed && key.code === 8 && renamePos >= 1) {

        rensub1 = rensub1.substring(0, rensub1.length-1);

        renamePos --;

    }

    if (keyIsPresed && keyCode === LEFT && renamePos >= 1) {

        renamePos--;

    }

    if (keyIsPresed && keyCode === RIGHT && renamePos <= func.name.length-1) {

        renamePos++;

    }

    if (keyIsReleased) {

        renprevKey = "";

    }

    func.name = rensub1 + rensub2;

    
funcs[i].name = func.name;

    if (mouseIsReleased) {

        if (mouseX < 2 || mouseX > 24 || mouseY < i*65+22 || mouseY > i*65+37) {

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

        if (mouseIsPressed) {

            stroke(0, 0, 0);

            strokeWeight(1);

        }

        if (mouseIsReleased) {

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

};

var colpickCols = [color(255, 150, 0), color(255, 89, 0), color(255, 0, 0), color(255, 0, 102), color(255, 0, 150)];

var colOn = false;

var colorpick = function(funcname) {

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

        if (hexagonbutton(i, 111, 20, colpickCols[(i-140)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-140)/20];

            colOn = false;

            return;

        }

    }


    colpickCols = [color(0, 102, 102), color(0, 102, 153), color(0, 153, 204), color(0, 102, 204), color(0, 51, 204), color(0, 0, 255), color(51, 51, 255), color(51, 51, 153)];

    for (var i = 130; i < 280; i+=20) {

        if (hexagonbutton(i,129, 20, colpickCols[(i-130)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-130)/20];

            colOn = false;

            return;

        }

    }

    
colpickCols = [color(102, 153, 153),color(0, 153, 153),color(51, 204, 204),color(0, 204, 255),color(0, 153, 255),color(0, 102, 255),color(51, 102, 255),color(51, 51, 204),color(102, 102, 153)];

    for (var i = 120; i < 290; i+=20) {

        if (hexagonbutton(i,147, 20, colpickCols[(i-120)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-120)/20];

            colOn = false;

            return;

        }

    }

    
colpickCols = [color(51, 153, 102),color(0, 204, 153),color(0, 255, 204),color(0, 255, 255),color(51, 204, 255),color(51, 153, 255),color(102, 153, 255),color(102, 102, 255),color(102, 0, 255), color(102, 0, 204)];

    for (var i = 110; i < 300; i+=20) {

        if (hexagonbutton(i,165, 20, colpickCols[(i-110)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-110)/20];

            colOn = false;

            return;

        }

    }

    colpickCols = [color(51, 153, 51),color(0, 204, 102),color(0, 255, 153),color(102, 255, 204),color(102, 255, 255),color(102, 204, 255),color(153, 204, 255),color(153, 153, 255),color(153, 102, 255),color(153, 51, 255),color(153, 0, 255)];

    for (var i = 100; i < 310; i+=20) {

        if (hexagonbutton(i,183, 20, colpickCols[(i-100)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-100)/20];

            colOn = false;

            return;

        }

    }

    
colpickCols = [color(0, 102, 0),color(0, 204, 0),color(0, 255, 0),color(102, 255, 153),color(153, 255, 204),color(204, 255, 255),color(204, 204, 255),color(204, 153, 255),color(204, 102, 255),color(204, 51, 255),color(204, 0, 255),color(153, 0, 204)];

    for (var i = 90; i < 320; i+=20) {

        if (hexagonbutton(i,201, 20, colpickCols[(i-90)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-90)/20];

            colOn = false;

            return;

        }

    }

    colpickCols = [color(0, 51, 0),color(0, 153, 51),color(51, 204, 51),color(102, 255, 102),color(153, 255, 153),color(204, 255, 204),color(235, 235, 235),color(255, 204, 255),color(255, 153, 255),color(255, 102, 255),color(255, 0, 255),color(204, 0, 204),color(102, 0, 102)];

    for (var i = 80; i < 330; i+=20) {

        if (hexagonbutton(i,219, 20, colpickCols[(i-80)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-80)/20];

            colOn = false;

            return;

        }

    }


    colpickCols = [color(51, 102, 0),color(0, 153, 0),color(102, 255, 51),color(153, 255, 102),color(204, 255, 153),color(255, 255, 204),color(255, 204, 204),color(255, 153, 204),color(255, 102, 204),color(255, 51, 204),color(204, 0, 153),color(153, 51, 153)];

    for (var i = 90; i < 320; i+=20) {

        if (hexagonbutton(i,237, 20, colpickCols[(i-90)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-90)/20];

            colOn = false;

            return;

        }

    }

    
colpickCols = [color(51, 51, 0),color(102, 153, 0),color(153, 255, 51),color(204, 255, 102),color(255, 255, 153),color(255, 204, 153),color(255, 153, 153),color(255, 102, 153),color(255, 51, 153),color(204, 51, 153),color(153, 0, 153)];
    for (var i = 100; i < 310; i+=20) {

        if (hexagonbutton(i,255, 20, colpickCols[(i-100)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-100)/20];

            colOn = false;

            return;

        }

    }

    colpickCols = [color(102, 102, 51),color(153, 204, 0),color(204, 255, 51),color(255, 255, 102),color(255, 204, 102),color(255, 153, 102),color(255, 102, 102),color(255, 0, 102),color(204, 102, 153),color(153, 51, 102)];

    for (var i = 110; i < 300; i+=20) {

        if (hexagonbutton(i,273, 20, colpickCols[(i-110)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-110)/20];

            colOn = false;

            return;

        }

    }


    colpickCols = [color(153, 153, 102), color(204, 204, 0), color(255, 255, 0), color(255, 204, 0), color(255, 153, 51), color(255, 102, 0), color(255, 80, 80), color(204, 0, 102), color(102, 0, 51)];
    for (var i = 120; i < 290; i+=20) {

        if (hexagonbutton(i,291, 20, colpickCols[(i-120)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-120)/20];

            colOn = false;

            return;

        }

    }

    colpickCols = [color(153, 102, 51), color(204, 153, 0), color(255, 153, 0), color(204, 102, 0), color(255, 51, 0), color(255, 0, 0), color(204, 0, 0), color(153, 0, 51)];

    for (var i = 130; i < 280; i+=20) {

        if (hexagonbutton(i,309, 20, colpickCols[(i-130)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-130)/20];

            colOn = false;

            return;

        }

    }

    colpickCols = [color(102, 51, 0), color(153, 102, 0), color(204, 51, 0), color(153, 51, 0), color(153, 0, 0), color(128, 0, 0), color(153, 51, 51)];

    for (var i = 140; i < 270; i+=20) {

        if (hexagonbutton(i,327, 20, colpickCols[(i-140)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-140)/20];

            colOn = false;

            return;

        }
    }


    
//black

    if (hexagonbutton(325, 315, 45, color(0, 0, 0), 15)) {

        funcs[funcname].color = color(0, 0, 0);

        colOn = false;

    }

};

var tSize = 40;

var menuUp = false;

var menuTranslate = 300;

var degRad = "rad";

var graphSetting = "carte";

var menuDown = false;


var optMenu = function() {

    //up and down

    if (menuDown === false) {

        if (menuTranslate >150) {

            menuTranslate -= 3;

        }

    }

    
if (menuDown === true) {

        if (menuTranslate <300) {

            menuTranslate += 3;
 
       }

        else {

            menuTranslate = 300;

            menuDown = false;

            menuUp = false;

        }

    }

    if (button(5, 75+(menuTranslate), 25, 30, 5, 175, 175, 175)) {

        menuDown = true;

    }

    pushMatrix();

    translate(0, menuTranslate);

    stroke(255, 255, 255);

    strokeWeight(3);

    line(17.5, 84, 11, 93);

    line(17.5, 84, 24, 93);

    popMatrix();

    noStroke();

    
//drawing menu

    pushMatrix();

    translate(0, menuTranslate);

    fill(175, 175, 175);

    rect(0, 100,300, 300);

    fill(0, 0, 0);

    textSize(25);

    textAlign(CENTER, CENTER);

    text("Options", 150, 118);

    stroke(0, 0, 0);

    strokeWeight(1);

    line(0, 135, 299, 135);

    textSize(14);

    text("Angle Measure:", 60, 155);

    textSize(15);

    text("Radians", 65, 180);

    text("Degrees", 65, 205);

    text("Graph Setting:", 210, 155);

    text("Cartesian", 220, 180);

    text("Parametric", 225, 205);
    text("Polar", 205, 230);

    popMatrix();

    fill(255, 255, 255);

    noStroke();

    if (optionSelect(167, 180+menuTranslate, 10)) {

        graphSetting = "carte";

    }

    if (optionSelect(167, 205+menuTranslate, 10)) {

        graphSetting = "para";

    }

    if (optionSelect(167, 230+menuTranslate, 10)) {

        graphSetting = "polar";

    }

    
if (optionSelect(20, 180+menuTranslate, 10)) {

        degRad = "rad";

    }

    if (optionSelect(20, 205+menuTranslate, 10)) {

        degRad = "deg";

    }

    
pushMatrix();

    translate(0, menuTranslate);

    fill(0, 0, 0);

    if (degRad === "rad") {

        ellipse(20, 180, 13, 13);

    }

    else {

        ellipse(20, 205, 13, 13);

    }

    
if (graphSetting === "carte") {

        ellipse(167, 180, 13, 13);

    }

    if (graphSetting === "para") {

        ellipse(167, 205, 13, 13);

    }

    if (graphSetting === "polar") {

        ellipse(167, 230, 13, 13);

    }

    popMatrix();

    textAlign(LEFT, BASELINE);

    }

};


var draw = function() {

    background(226, 227, 245);

    
//interface

    {

    //rename/edit function

    if (editOk !== false) {

        edit(funcs[editOk], editOk);

    }

    
//other stuff

    if (editOk === false && colOn === false && menuUp === false) {

        strokeWeight(1);

        sub1 = funcs[currFunc].func.substring(0, pos);

        sub2 = funcs[currFunc].func.substring(pos,funcs[currFunc].func.length);

        if (keyIsPresed && keyCode !== 16 && key.code !== 8 && keyCode !== UP && keyCode !== DOWN && keyCode !== LEFT && keyCode !== RIGHT && keyCode !== 18 && keyCode !== 17 && keyCode !== 20 && keyCode !== 157) {

            sub1 += key.toString();

            prevKey = key.toString();

            funcs[currFunc].func = sub1 + sub2;

            pos++;

        }

        if (keyIsPresed && key.code === 8 && pos >= 1) {

            sub1 = sub1.substring(0, sub1.length-1);

            funcs[currFunc].func = sub1 + sub2;

            pos --;

        }

        if (keyIsPresed && keyCode === LEFT && pos >= 1) {

            pos--;

        }

        if (keyIsPresed && keyCode === RIGHT && pos <= funcs[currFunc].func.length-1) {

            pos++;

        }

        if (keyIsPresed && keyCode === UP && currFunc >= 1) {

            currFunc --;

            pos = funcs[currFunc].func.length;

        }

        if (keyIsPresed && keyCode === DOWN && currFunc <= funcs.length-1) {

            currFunc++;

            pos = funcs[currFunc].func.length;

        }

        if (keyIsReleased) {

            prevKey = "";

        }

        if (mouseIsPresed && mouseY > currFunc*65+15 && mouseY < currFunc*65+60 && mouseX > 25 && mouseX < 375) {

            if (round((mouseX-30)/(tSize/1.818)) > funcs[currFunc].func.length) {

                pos = funcs[currFunc].func.length;

            }

            else {

                pos = round((mouseX-35)/(tSize/1.818));

            }

        }

    }

    
//drawing boxes and taking mouse input

    for (var i = 0; i < funcs.length; i++) {

        fill(0, 0, 0);

        textSize(15);

        stroke(0, 0, 0);

        fill(255, 255, 255);

        strokeWeight(1);

        if (i === currFunc) {

            strokeWeight(3);

        }

        rect(30, i*65 + 15, width-75, 50);

        if (funcs[i].func.length < 14) {

            tSize = 40;

            textSize(tSize);

        }

        else {

            tSize = 40/(funcs[i].func.length/14);

            textSize(tSize);

        }

        fill(0, 0, 0);

        text(funcs[i].func, 35, i*65-7 + 60);

        if (mouseIsPresed && mouseY > i*65+15&& mouseY < i*65+65&& mouseX > 25 && mouseX < 355 && i !== currFunc && dist(mouseX, mouseY, 360, 360) > 25 && dist(mouseX, mouseY, 360, 305) > 25) {

            currFunc = i;

        }

        noStroke();

        strokeWeight(1);

        if (editOk === false && colOn === false && menuUp === false) {

            if (button(2, i*65+20, 25, 20, 2, 226, 227, 245)) {

                editOk = i;

                renamePos = funcs[editOk].name.length;

            }

        }

        fill(0, 0, 0);

        textSize(15);

        fill(funcs[i].color);

        text(funcs[i].name,5, i*65+35);

        noStroke();

        strokeWeight(1);

        noFill();

    }


    //flashing line for function name

    stroke(0, 0, 0);

    if (frameCount % 60 < 30 && editOk === false || keyIsPressed && editOk === false) {

        if (tSize === 40) {

            line(35 + 0.55*tSize * (pos), currFunc*65+23, 35 + 0.55*tSize * pos, currFunc*65+59);

        }

        else {

            line(35 + 0.55*tSize * (pos), currFunc*65+23+0.1*tSize, 35 + 0.55*tSize * pos, currFunc*65+59-0.1*tSize);

        }

    }
    
//new or delete function

    if (colOn === false && menuUp === false && editOk === false) {

        //delete function

        if (circButton(360, 360, 50, 175, 175, 175) && funcs.length>1) {

            funcs.splice(currFunc, 1);

            if (currFunc === funcs.length) {

                currFunc--;

            }

            pos = funcs[currFunc].func.length;

        }
 
       //new function

        if (circButton(360, 305, 50, 175, 175, 175)) {

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

            for (var x = 0; x < funcLetts.length; x++) {

                for (var i = 1; i < 10; i++) {

                    if (funcLetts[x] in letts) {

                        if (letts[funcLetts[x]].indexOf(str(i)) === -1) {

                            funcs.push({"func":"","name":funcLetts[x] + str(i),"color":color(0, 0, 0)});

                            break;

                        }

                    }

                }

            }

            currFunc = funcs.length-1;

        }

    }

    else {

        fill(175, 175, 175);

        noStroke();

        ellipse(360, 360, 50, 50);

        ellipse(360, 305, 50, 50);

    }

    //lines drawn over function buttons to signify meaning

    stroke(255, 255, 255);

    strokeWeight(4);

    line(345, 361, 374, 361);

    line(360, 290, 360, 320);

    line(344, 306, 375, 306);

    
//Scrollbar

    if (funcs.length > 6) {

        fill(219, 219, 219);

        noStroke();

        rect(380, 0, 20, 400);

    }


    //Color Picker

    for (var i = 0; i < funcs.length; i++) {

        noStroke();

        if (button(2, i * 65 +45, 25, 15, 2, 226, 227, 245)) {

            colOn = i;

        }

        textSize(8);

        fill(0, 0, 0);

        text("Color", 4, i*65+56);

    }

    if (colOn !== false && editOk === false && menuUp === false) {

        colorpick(colOn);

    }

    //options menu

    if (menuUp === true) {

        optMenu();

    }

    else {

        if (button(5, 375, 25, 230, 5, 170, 170, 170)) {

            menuUp = true;

        }

        stroke(255, 255, 255);

        strokeWeight(3);

        line(17.5, 384, 11, 393);

        line(17.5, 384, 24, 393);

    }

    
//handling mouse/key on/off

    mouseIsPresed = false;

    keyIsPresed = false;

    keyIsReleased = false;

    mouseIsReleased = false;

};

var mousePressed = function() {

    if (prevMouse !== true) {

        mouseIsPresed = true;

    }

};

var mouseReleased = function() {

    mouseIsReleased = true;

};

var keyPressed = function() {

    if (key.toString() !== prevKey && key.toString() !== renprevKey) {

        keyIsPresed = true;

    }

};

var keyReleased = function() {

    keyIsReleased = true;

};



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
