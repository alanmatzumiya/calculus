/**
 * 
 * The p5.EasyCam library - Easy 3D CameraControl for p5.js and WEBGL.
 *
 *   Copyright 2018 by Thomas Diewald (https://www.thomasdiewald.com)
 *
 *   Source: https://github.com/diwi/p5.EasyCam
 *
 *   MIT License: https://opensource.org/licenses/MIT
 * 
 * 
 * explanatory notes:
 * 
 * p5.EasyCam is a derivative of the original PeasyCam Library by Jonathan Feinberg 
 * and combines new useful features with the great look and feel of its parent.
 * 
 * 
 */

/*
 Inspired by the Conding Challenge # 3??
 Link:
 Written by Juan Carlos Ponce Campuzano
 https://jcponce.github.io/
 21-Feb-2019
*/

let easycam;

// settings and presets
let parDef = {
View: 'Drag with mouse',
horn: false,
xyzAxes: axesSketch,
Rotating: true,
};

function setup() {
    
    // create gui (dat.gui)
    let gui = new dat.GUI();
    gui.closed = true;
    gui.add(parDef, 'View');
    gui.add(parDef, 'xyzAxes'  );
    gui.add(parDef, 'Rotating'  );
    gui.add(parDef, 'horn').name("Horn");
    gui.add(this, 'sourceCode').name("Source");
    gui.add(this, 'backHome').name("Go Back");
    
    colorMode(HSB,1);
    
    pixelDensity(1);
    
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    setAttributes('antialias', true);
    
    console.log(Dw.EasyCam.INFO);
    
    easycam = new Dw.EasyCam(this._renderer, {distance : 500});
    mic = new p5.AudioIn();
    mic.start();
}

function backHome() {
    window.location.href = "https://jcponce.github.io/3dcurves";
}

function sourceCode() {
    window.location.href = "https://github.com/jcponce/calculus/tree/gh-pages/3d-curves/rainbownoise";
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    easycam.setViewport([0,0,windowWidth, windowHeight]);
}

let gizmo = false;
function axesSketch(){
    if(gizmo == false){
        return gizmo = true;
    }else gizmo = false;
}

let phase = 0;
let zoff = 0;
let mic;

let rot=0;

function draw(){
    
    // projection
    perspective(60 * PI/180, width/height, 1, 5000);
    
    // BG
    background(0);
    
   
    
    rotateX(3)
    rotateY(rot/2);
    rotateZ(0.4);
    
    
    for(let i=1; i<=35; i++){
        if(parDef.horn==true){
           //size, posz, strSize, hu
           noiseCircle(1/i, (i*70-70)/5, (35-i)/13, (i-1)/35);
        } else noiseCircle(1, (i*70-70)/5, (35-i)/13, (i-1)/35);
    }

    phase+=0.001;
    zoff += 0.001;
    
    if(parDef.Rotating==true){
      rot += 0.006;
    } else rot += 0.0;
    
    if(gizmo==true){
    // gizmo
    strokeWeight(2);
    stroke(1, 1, 1); line(0,0,0,90,0,0);
    stroke(0.6, 1, 1); line(0,0,0,0,90,0);
    stroke(0.3, 1, 1); line(0,0,0,0,0,90);
    }
}


function noiseCircle(size, posz, strSize, hu){
    
    beginShape();
    strokeWeight(2.5);
    let noiseMax = mic.getLevel() * 60;
    for (let a = 0; a < TWO_PI; a += 0.03) {
        let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
        let yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
        let r = map(noise(xoff, yoff, zoff), 0, 1, 100, height / 2);
        stroke(hu, 1, 1);
        strokeWeight(strSize);
        noFill();
        let x = size * r * cos(a);
        let y = size * r * sin(a);
        
        vertex(x, y, posz);
    }
    endShape(CLOSE);
    
}