
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
        text("Done", width/2, min(width,height)/2+160);
        textAlign(LEFT, BASELINE);
    }
};

var circButton = function(x, y, d, r, g, b) {
    resetMatrix();
    noStroke();

    fill(r,g,b);

    if (dist(mouseX, mouseY, x, y) < d/2) {

        fill(r-20, g-20, b-20);

        if(mouseIsPressed) {

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

    
    if (frameCount % 60 < 30 || keyIsPressed) {

        line(4+9 * renamePos, (i-currFuncs[0])*65+24, 4+9 * renamePos, (i-currFuncs[0])*65+35);

    }

    strokeWeight(1);

    rensub1 = func.name.substring(0, renamePos);

    rensub2 = func.name.substring(renamePos,func.name.length);

    if (keyIsPresed && keyCode !== 16 && key.code !== 8 && keyCode !== UP && keyCode !== DOWN && keyCode !== LEFT && keyCode !== RIGHT && keyCode !== 18 && keyCode !== 17 && keyCode !== 20 && keyCode !== 157 && func.name.length <2) {

        rensub1 += key.toString();

        renprevKey = key.toString();

        renamePos++;

    }

    if (keyIsPresed && KeyboardEvent.key.code === 8 && renamePos >= 1) {

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

        if (mouseIsPressed) {

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

    
colpickCols = [color(102, 153, 153),color(0, 153, 153),color(51, 204, 204),color(0, 204, 255),color(0, 153, 255),color(0, 102, 255),color(51, 102, 255),color(51, 51, 204),color(102, 102, 153)];

    for (var i = 120; i < 290; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,147*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-120)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-120)/20];

            colOn = false;

            return;

        }

    }

    
colpickCols = [color(51, 153, 102),color(0, 204, 153),color(0, 255, 204),color(0, 255, 255),color(51, 204, 255),color(51, 153, 255),color(102, 153, 255),color(102, 102, 255),color(102, 0, 255), color(102, 0, 204)];

    for (var i = 110; i < 300; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,165*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-110)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-110)/20];

            colOn = false;

            return;

        }

    }

    colpickCols = [color(51, 153, 51),color(0, 204, 102),color(0, 255, 153),color(102, 255, 204),color(102, 255, 255),color(102, 204, 255),color(153, 204, 255),color(153, 153, 255),color(153, 102, 255),color(153, 51, 255),color(153, 0, 255)];

    for (var i = 100; i < 310; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,183*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-100)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-100)/20];

            colOn = false;

            return;

        }

    }

    
colpickCols = [color(0, 102, 0),color(0, 204, 0),color(0, 255, 0),color(102, 255, 153),color(153, 255, 204),color(204, 255, 255),color(204, 204, 255),color(204, 153, 255),color(204, 102, 255),color(204, 51, 255),color(204, 0, 255),color(153, 0, 204)];

    for (var i = 90; i < 320; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,201*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-90)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-90)/20];

            colOn = false;

            return;

        }

    }

    colpickCols = [color(0, 51, 0),color(0, 153, 51),color(51, 204, 51),color(102, 255, 102),color(153, 255, 153),color(204, 255, 204),color(235, 235, 235),color(255, 204, 255),color(255, 153, 255),color(255, 102, 255),color(255, 0, 255),color(204, 0, 204),color(102, 0, 102)];

    for (var i = 80; i < 330; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,219*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-80)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-80)/20];

            colOn = false;

            return;

        }

    }


    colpickCols = [color(51, 102, 0),color(0, 153, 0),color(102, 255, 51),color(153, 255, 102),color(204, 255, 153),color(255, 255, 204),color(255, 204, 204),color(255, 153, 204),color(255, 102, 204),color(255, 51, 204),color(204, 0, 153),color(153, 51, 153)];

    for (var i = 90; i < 320; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,237*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-90)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-90)/20];

            colOn = false;

            return;

        }

    }

    
colpickCols = [color(51, 51, 0),color(102, 153, 0),color(153, 255, 51),color(204, 255, 102),color(255, 255, 153),color(255, 204, 153),color(255, 153, 153),color(255, 102, 153),color(255, 51, 153),color(204, 51, 153),color(153, 0, 153)];
    for (var i = 100; i < 310; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,255*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-100)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-100)/20];

            colOn = false;

            return;

        }

    }

    colpickCols = [color(102, 102, 51),color(153, 204, 0),color(204, 255, 51),color(255, 255, 102),color(255, 204, 102),color(255, 153, 102),color(255, 102, 102),color(255, 0, 102),color(204, 102, 153),color(153, 51, 102)];

    for (var i = 110; i < 300; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,273*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-110)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-110)/20];

            colOn = false;

            return;

        }

    }


    colpickCols = [color(153, 153, 102), color(204, 204, 0), color(255, 255, 0), color(255, 204, 0), color(255, 153, 51), color(255, 102, 0), color(255, 80, 80), color(204, 0, 102), color(102, 0, 51)];
    for (var i = 120; i < 290; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,291*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-120)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-120)/20];

            colOn = false;

            return;

        }

    }

    colpickCols = [color(153, 102, 51), color(204, 153, 0), color(255, 153, 0), color(204, 102, 0), color(255, 51, 0), color(255, 0, 0), color(204, 0, 0), color(153, 0, 51)];

    for (var i = 130; i < 280; i+=20) {

        if (hexagonbutton(i*min(width, height)/400+(width-min(width, height))/2,309*min(width, height)/400, 20*min(width, height)/400, colpickCols[(i-130)/20], 10)) {

            funcs[funcname].color = colpickCols[(i-130)/20];

            colOn = false;

            return;

        }

    }

    colpickCols = [color(102, 51, 0), color(153, 102, 0), color(204, 51, 0), color(153, 51, 0), color(153, 0, 0), color(128, 0, 0), color(153, 51, 51)];

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
    textSize(50*wh);
    fill(93, 148, 141);
    text("Logo goes here", 200*wh, 50*ht);
    fill(77, 77, 77, 150);
    textSize(15*wh);
    text("Click to proceed", 200*wh, 150*ht);
    textSize(10*wh);
    text("Andrew and Hazel Prasetya", 325*wh, 290*ht);
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
    
            if (keyIsPresed && keyCode !== 16 && key.code !== 8 && keyCode !== UP && keyCode !== DOWN && keyCode !== LEFT && keyCode !== RIGHT && keyCode !== 18 && keyCode !== 17 && keyCode !== 20 && keyCode !== 157) {
    
                sub1 += key.toString();
    
                prevKey = key.toString();
    
                funcs[currFunc-currFuncs[0]].func = sub1 + sub2;
    
                pos++;
    
            }
    
            if (keyIsPresed && KeyboardEvent.key.code === 8 && pos >= 1) {
    
                sub1 = sub1.substring(0, sub1.length-1);
    
                funcs[currFunc-currFuncs[0]].func = sub1 + sub2;
   
                pos --;
    
            }
    
            if (keyIsPresed && keyCode === LEFT && pos >= 1) {
    
                pos--;
    
            }
    
            if (keyIsPresed && keyCode === RIGHT && pos <= funcs[currFunc-currFuncs[0]].func.length-1) {
    
                pos++;
    
            }
    
            if (keyIsPresed && keyCode === UP && currFunc >= 1) {
    
                currFunc --;
    
                pos = funcs[currFunc-currFuncs[0]].func.length;
    
            }
    
            if (keyIsPresed && keyCode === DOWN && currFunc-currFuncs[0] <= funcs.length-1) {
                
                currFunc++;
    
                pos = funcs[currFunc-currFuncs[0]].func.length;
    
            }
    
            if (keyIsReleased) {
    
                prevKey = "";
    
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
        if (frameCount % 60 < 30 && editOk === false || keyIsPressed && editOk === false) {
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
    
    noStroke();
    fill(205, 206, 225);
    rect(width-130, 0, 130, ceil(funcs.length/3)*30+85);
    noStroke();
    if (button(width-120, floor((funcs.length-1)/3)*30+80, 60, 25, 5, 205, 206, 225)) {
        graphopen = false;
        selected = {func: [], name: [], color: [], constraints:[[-10, 10], [-10, 10]], vars: []};
    }
    if (button(width-50, floor((funcs.length-1)/3)*30+80, 40, 25, 5, 205, 206, 225)) {
        if (selected.func !== []) {
            grapphs.push(selected);
        }
        selected = {func: [], name: [], color: [], constraints:[[-10, 10], [-10, 10]], vars: []};
        graphopen = false;
    }
    resetMatrix();
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
            if (button(width-120, floor(i/3)*30 +40, 30, 20, 3, 205, 206, 225)) {
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
            if (button(width-80, floor(i/3)*30+40, 30, 20, 3, 205, 206, 225)) {
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
            if (button(width-40, floor(i/3)*30+40, 30, 20, 3, 205, 206, 225)) {
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
            text('Once you open up the functions\neditor, there are several functions\nyou can use.\n\nYou can create or delete functions\nusing the buttons in the bottom-left.\nWith 6 or more functions, two arrow\nbuttons will appear, allowing you to\nscroll through the buttons.\n\nYou can rename and change the color\nof the graphs of specific functions by\nclicking either the name or the "color"\nbutton of the function, respectively.', width-150, height-155);
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
            text('Now that you know how\nto use CubicCalculator,\nstart graphing!', width-150, height-155);
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
        textFont(createFont('times new roman'));
        textAlign(CENTER, CENTER);
        fill(255, 255, 255);
        textSize(28);
        text("i", width-20, height-60);
        textAlign(LEFT, BASELINE);
        textFont(createFont('monospace'));
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
            text(grapphs[i].name+"("+grapphs[i].vars+") = "  + grapphs[i].func, (i%floor(width/200))*200 + 100, 230*(floor(i/floor(width/200)))+40);
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
            text(string, (i%floor(width/200))*200 + 100, 230*(floor(i/floor(width/200)))+40);
        }
        noStroke();
        if (button((i%floor(width/200))*200 + 35, 230*(floor(i/floor(width/200)))+457+funcTranslate, 100, 20, 2, 226, 227, 245)&&editCon === false&&colOn === false && graphopen === false && helpopen === false) {
            prevGraph = {'constraints': [], 'index': i};
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
        if (button((i%floor(width/200))*200 + 147, 230*(floor(i/floor(width/200)))+457+funcTranslate, 20, 20, 2, 226, 227, 245)&&editCon === false&&helpopen === false) {
            grapphs.splice(i, 1);
            break;
        }
        stroke(255, 0, 0);
        strokeWeight(3);
        line(i%floor(width/200)*200 + 152, 230*(floor(i/floor(width/200)))+462,i%floor(width/200)*200 + 162, 230*(floor(i/floor(width/200)))+472);
        line(i%floor(width/200)*200 + 152, 230*(floor(i/floor(width/200)))+472,i%floor(width/200)*200 + 162, 230*(floor(i/floor(width/200)))+462);
        fill(0, 0, 0);
        textSize(10);
        text("Edit Constraints", 200*(i%floor(width/200)) + 85, 230*(floor(i/floor(width/200)))+467);
        textAlign(LEFT, BASELINE);
        textSize(13);
        resetMatrix();
        graph(grapphs[i].func, grapphs[i].color, grapphs[i].vars, grapphs[i].constraints, (i%floor(width/200))*200 + 25, 230*(floor(i/floor(width/200)))+495 + funcTranslate, 150, 150);
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
        textFont(createFont('arial'));
        textAlign(CENTER, CENTER);
        fill(255, 255, 255);
        textSize(23);
        text("?", width-20, height-20);
        textAlign(LEFT, BASELINE);
        textFont(createFont('monospace'));
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
            textFont(createFont('times new roman'));
            textAlign(CENTER, CENTER);
            fill(255, 255, 255);
            textSize(28);
            text("i", width-20, height-60);
            textAlign(LEFT, BASELINE);
            textFont(createFont('monospace'));
        }
    }
    
    //handling mouse/key on/off

    mouseIsPresed = false;
    keyIsPresed = false;
    keyIsReleased = false;
    keyIsPressed = false;
    mouseIsReleased = false;
    mouseIsPressed = false;
};

//mouse and key functions
void mousePressed() {
    if (prevMouse !== true) {
        mouseIsPresed = true;
    }
    mouseIsPressed = true;
};
void mouseReleased() {
    mouseIsReleased = true;
};

void keyPressed() {
    if (key.toString() !== prevKey && key.toString() !== renprevKey && key.toString() !== consprevKey) {
        keyIsPresed = true;
    }
    keyIsPressed = true;
};
void keyReleased() {
    keyIsReleased = true;
    consprevKey = false;
};
