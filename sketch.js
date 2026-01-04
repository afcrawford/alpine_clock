// setup() is called once at page-load
function setup() {
    createCanvas(800,600); // make an HTML canvas element width x height pixels

}

// draw() is called 60 times per second
let printed = false;
function draw() {
    let moon = false;
    let hr = hour();
    let bgColor = "";
 
    // set bg depending on day or night
    if (hr > 19 || hr < 8) {
      bgColor = "#132374"
      moon = true
    } else {
      bgColor = "#78baed"
    }
   
    // change to 12 hour
    hr = hr % 12;
    if(hr == 0) {
      hr = 12
    }
    let min = minute();
    let sec = second();

   
    // draw the bg depending on night or day
    makeOmbre(color(bgColor), color("#CBE5FD"));
   
    // draw the moon if night
    push();
    if (moon ==true) {
      fill(color(255,255,255));
      circle(700, 100, 100);
    } else {
      // sun if day
      fill(color("#F7E230"))
      circle(700, 100, 100);
    }
    pop();
 
    // draw the grass
    push();
    fill(color(130, 171, 100));
    rect(0, 500, width, 100);
    pop();
 
    //find mountain border color between the ombre
    stroke(lerpColor(color(245, 245, 245), color(74, 74, 74), 0.5));
   
    // draw the mountains
    triangleOmbre(hr, min, sec, color(74, 74, 74), color(245, 245, 245));
   
    // draw the "clouds" used as tick mark references
    push();
    fill(color(255, 255,255));
    let h = 0;
    let heightFraction = height / 12;
    let widthFraction = width / 12;
   
    //span the whole width and height of the canvas
    for(let i = 0; i <= width; i += widthFraction) {
      ellipse(i+15, h+5, 30, 10);
      h += heightFraction;
    }
    pop();
 
 
    //fill(180);
    //text(hr, 10, 30);
    //fill(100);
    //text(min, 10, 60);
    //fill(0);
    //text(sec, 10, 90);
 
    // print the minute once every new min
    if (sec == 0 && printed == false) {
      console.log("minute: " + minute());
      printed = true;
    } else if (sec == 1) {
      printed = false;
    }

}

// function for full ombre background
function makeOmbre(c1, c2) {
    for (let y = 0; y < height; y++) {
        let inter = map(y, 0, height, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(0, y, width, y);
    }
}

// function to draw the 3 triangles ombre grey to white to represent mountains
function triangleOmbre(hr, min, sec, c1, c2) {
     
    // using just height for mapping doesnt work when hour is 1 or 13
    let heightStart;
    heightStart = height - (height / 12);
    let hrHeight = map(hr, 1, 12, heightStart, 0);
    let mountain1Gradient = drawingContext.createLinearGradient(0, height, 0, hrHeight);
    mountain1Gradient.addColorStop(1, c2);
    mountain1Gradient.addColorStop(0, c1);
    drawingContext.fillStyle = mountain1Gradient;
    triangle((width/4 - 80), height, (width/4 + 80), height, (width/4), hrHeight);
   
   
    let minHeight = map(min, 0, 60, height, 0);
    let mountain2Gradient = drawingContext.createLinearGradient(0, height, 0, minHeight);
    mountain2Gradient.addColorStop(1, c2);
    mountain2Gradient.addColorStop(0, c1);
    drawingContext.fillStyle = mountain2Gradient;
    triangle((width/2 -40), height, (width/2 + 40), height, (width/2), minHeight);
   
    let secHeight = map(sec, 0, 60, height, 0);
    let mountain3Gradient = drawingContext.createLinearGradient(0, height, 0, secHeight);
    mountain3Gradient.addColorStop(1, c2);
    mountain3Gradient.addColorStop(0, c1);
    drawingContext.fillStyle = mountain3Gradient;
    triangle(((0.75*width) - 20), height, ((0.75*width) + 20), height, ((0.75*width)), secHeight);
   
}


// unused function for triangles without ombre
function setTriangles(hr, min, sec) {
    let hourHeight = map(hr, 1, 12, height, 0);
    fill(179, 204, 255);
    triangle((width/4 - 80), height, (width/4 + 80), height, (width/4), hourHeight);
    let minHeight = map(min, 0, 60, height, 0);
    fill(179, 255, 255);
    triangle((width/2 - 50), height, (width/2 + 50), height, (width/2), minHeight);
    let secHeight = map(sec, 0, 60, height, 0);
    fill(179, 255, 217);
    triangle(((0.75*width) - 20), height, ((0.75*width) + 20), height, ((0.75*width)), secHeight);
   
}
