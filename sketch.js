//write a p5js sketch that draws a painting in the abstract and colorful style of Wassily Kandinsky. Add animation. Give the just the javascript.
//can you make it more pink and more calm
// Kandinsky-inspired soft pink animated p5.js painting
// Just the JavaScript
// Kandinsky-inspired soft pink & yellow detailed animated painting with pink bubbles
// Simplified Kandinsky-inspired soft pink & yellow with focused detailed shapes and bubbles
// Kandinsky-inspired soft pink & yellow abstract with focused detailed shapes and geometric forms
// Kandinsky-inspired soft pink & yellow fully abstract with many animated shapes
// Kandinsky-inspired soft pink & yellow with extra big centerpiece // Kandinsky-inspired soft pink & yellow with big top centerpiece shape added 
let t = 0;
let palette;
let bgNoise = [];
let seeds = [];
let bubbles = [];
let extras = [];

function setup() {
  createCanvas(1000, 700);
  angleMode(DEGREES);
  noCursor();

  palette = [
    '#F8C8DC', // soft pink
    '#FADADD', // very pale pink
    '#F7A1B0', // warm rose
    '#EEC9D2', // dusty rose
    '#FCE7EB', // almost white pink
    '#FFE6F0', // pale blush
    '#F7E071'  // soft warm yellow
  ];

  // Initialize noise grid for background wash
  for (let x = 0; x < width; x += 10) {
    bgNoise[x] = [];
    for (let y = 0; y < height; y += 10) {
      bgNoise[x][y] = random(10000);
    }
  }

  // Seeds for soft blobs and clusters
  seeds.push(createVector(width * 0.35, height * 0.55));
  seeds.push(createVector(width * 0.65, height * 0.45));

  // Additional floating form seeds from your second code, random positions
  for (let i = 0; i < 7; i++) {
    seeds.push(createVector(random(width), random(height)));
  }

  // Initialize bubbles
  for (let i = 0; i < 80; i++) bubbles.push(createBubble());

  // Extras for small shapes scattered around
  for (let i = 0; i < 80; i++) extras.push(createExtraShape());

  background('#FFF5F8');
}

function createBubble() {
  return {
    pos: createVector(random(width), random(height + 100)),
    size: random(6, 18),
    speed: random(0.2, 0.8),
    alpha: random(40, 100),
    oscillation: random(TWO_PI),
    colorIdx: floor(random(palette.length - 1)), // pink dominance in bubbles
  };
}

function createExtraShape() {
  const types = ['circle', 'triangle', 'rect', 'line', 'arc'];
  return {
    pos: createVector(random(width), random(height)),
    size: random(15, 40),
    type: random(types),
    colorIdx: floor(random(palette.length)),
    rotationSpeed: random(-0.8, 0.8),
    baseRotation: random(360),
    pulseSpeed: random(0.01, 0.04),
    pulsePhase: random(TWO_PI),
  };
}

function draw() {
  t += 0.15;

  drawBackgroundWash();
  drawFloatingForms();
  drawGeometricNetwork();
  drawOrbitsAndTargets();
  drawDynamicLines();

  // Big soft blobs - two main seeds
  drawLargeSoftBlob(seeds[0].x, seeds[0].y, 220, palette[6], t * 0.8, 30);
  drawLargeSoftBlob(seeds[1].x, seeds[1].y, 180, palette[2], t * 1.1, 45);

  // Clusters of shapes around main blobs
  drawShapeCluster(seeds[0].x, seeds[0].y, t, 1);
  drawShapeCluster(seeds[1].x, seeds[1].y, t + 100, -1);

  // Big centerpiece shapes
  drawStarShape(width * 0.45, height * 0.5, 130, t * 0.5);
  drawSegmentedRing(width * 0.7, height * 0.55, 110, 20, t * -0.7);
  drawTopConcentricEllipses(width * 0.5, height * 0.22, 200, 120, t * 0.3);

  // Additional floating soft blobs from other seeds
  drawAdditionalSoftBlobs();

  // Focused detailed elliptical rings on main blobs
  drawFocusedDetails(seeds[0].x, seeds[0].y, t);
  drawFocusedDetails(seeds[1].x, seeds[1].y, t + 100);

  drawExtras(t);
  drawBubbles();
  drawSignatureStrokes();
}

function drawBackgroundWash() {
  push();
  blendMode(BLEND);
  noStroke();
  for (let x = 0; x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      let n = noise((x + t * 0.15) * 0.003, (y - t * 0.2) * 0.003, bgNoise[x][y] * 0.0001);
      let idx = floor(map(n, 0, 1, 0, palette.length));
      idx = constrain(idx, 0, palette.length - 1);
      let col = color(palette[idx]);
      col.setAlpha(map(n, 0, 1, 20, 70));
      fill(col);
      rect(x, y, 12, 12);
    }
  }
  pop();
}

function drawFloatingForms() {
  push();
  translate(width * 0.05, height * 0.05);
  // use seeds 2 to 8 for floating blobs from second design
  for (let i = 2; i < 9; i++) {
    let s = seeds[i];
    let px = s.x + sin(t * (3 + i)) * (30 + i * 8);
    let py = s.y + cos(t * (2 + i * 0.8)) * (20 + i * 5);
    let size = 50 + (i * 12) + sin(t * (1 + i)) * 8;
    drawSoftBlob(px, py, size, palette[(i + 2) % palette.length], i * 7 + 40);
  }
  pop();
}

function drawAdditionalSoftBlobs() {
  // Slightly bigger soft blobs scattered around from seeds beyond 2
  for (let i = 2; i < 9; i++) {
    let s = seeds[i];
    drawLargeSoftBlob(
      s.x,
      s.y,
      70 + 15 * sin(t * 0.8 + i),
      palette[(i + 3) % palette.length],
      t * 1.5 + i * 20,
      10
    );
  }
}

function drawSoftBlob(x, y, r, colHex, seedOff) {
  push();
  translate(x, y);
  for (let i = 1; i <= 8; i++) {
    let s = r * (i / 8);
    let alpha = map(i, 1, 8, 10, 75);
    let c = color(colHex);
    c.setAlpha(alpha);
    fill(c);
    noStroke();
    ellipse(
      sin(t * (0.15 + i * 0.01) + seedOff) * 5,
      cos(t * (0.2 + i * 0.005) - seedOff) * 5,
      s * 1.5,
      s * 0.9
    );
  }
  pop();
}

function drawGeometricNetwork() {
  push();
  blendMode(MULTIPLY);
  for (let i = 0; i < 25; i++) {
    let gx = (i * 40 + t * 0.25) % width;
    let gy = (i * 75 - t * 0.15) % height;
    push();
    translate(gx, gy);
    rotate(sin(t * 0.2 + i) * 18);
    strokeWeight(1.3);
    let col = pickPalette(i);
    col.setAlpha(100);
    stroke(col);
    noFill();
    rectMode(CENTER);
    rect(0, 0, 22 + (i % 3) * 7, 8 + (i % 4) * 3);
    pop();

    fill(pickPalette((i + 3) % palette.length));
    noStroke();
    ellipse(gx + sin(t * 0.18 + i) * 6, gy + cos(t * 0.15 + i) * 5, 5 + (i % 3));
  }
  pop();
}

function drawOrbitsAndTargets() {
  push();
  translate(width * 0.7, height * 0.35);
  for (let i = 0; i < 6; i++) {
    push();
    let rr = 30 + i * 15;
    rotate(t * (0.8 + i * 0.5));
    strokeWeight(map(i, 0, 5, 1.8, 0.4));
    let col = color(palette[(i + 1) % palette.length]);
    col.setAlpha(140);
    stroke(col);
    noFill();
    ellipse(
      0,
      0,
      rr * 2 + sin(t * (0.12 + i * 0.08)) * 6,
      rr * 2 - cos(t * (0.15 + i * 0.05)) * 6
    );

    fill(palette[(i + 4) % palette.length]);
    noStroke();
    ellipse(rr * 0.6 * cos(t * 0.3 + i * 10), rr * 0.3 * sin(t * 0.2 - i * 6), 8 - i * 0.8);
    pop();
  }
  pop();
}

function drawDynamicLines() {
  push();
  blendMode(ADD);
  for (let i = 0; i < 6; i++) {
    let y = map(i, 0, 5, height * 0.15, height * 0.85);
    let col = pickPalette((i + 2) % palette.length);
    col.setAlpha(110);
    stroke(col);
    strokeWeight(1 + i * 0.8);
    noFill();
    beginShape();
    for (let x = -50; x <= width + 50; x += 16) {
      let nx = noise(x * 0.0008, y * 0.0008, t * 0.004 + i) * 60 - 30;
      let yy = y + sin((x + t * (1 + i)) * 0.4 + i * 25) * (10 + i * 2) + nx;
      curveVertex(x, yy);
    }
    endShape();
  }
  pop();
}

function drawLargeSoftBlob(x, y, maxRadius, baseColor, phase, offset) {
  push();
  translate(x, y);
  for (let i = 8; i > 0; i--) {
    let alpha = map(i, 1, 8, 12, 70);
    let radiusX = maxRadius * (i / 8) * (1 + 0.05 * sin(phase + i * offset));
    let radiusY = maxRadius * 0.7 * (i / 8) * (1 + 0.04 * cos(phase + i * offset));
    let c = color(baseColor);
    c.setAlpha(alpha);
    fill(c);
    noStroke();
    ellipse(sin(phase + i * 15) * 8, cos(phase + i * 20) * 6, radiusX, radiusY);
  }
  pop();
}

function drawFocusedDetails(x, y, phase) {
  push();
  translate(x, y);
  strokeWeight(2);
  noFill();

  for (let i = 0; i < 4; i++) {
    let radius = 60 + i * 22;
    let alpha = map(i, 0, 3, 90, 20);
    let col = color(palette[(i + 3) % palette.length]);
    col.setAlpha(alpha);
    stroke(col);
    rotate(phase * (0.5 + i * 0.3));
    ellipse(0, 0, radius * 2, radius * 1.8);
  }

  noStroke();
  for (let i = 0; i < 3; i++) {
    let size = 16 - i * 4 + 3 * sin(phase * 2 + i * 40);
    let c = color(palette[(i + 1) % palette.length]);
    c.setAlpha(180);
    fill(c);
    ellipse(0, 0, size);
  }

  pop();
}

function drawShapeCluster(x, y, phase, dir) {
  push();
  translate(x, y);

  for (let i = 0; i < 5; i++) {
    let angle = phase * 3 * dir + i * 72;
    let radius = 80 + i * 15;
    let cx = cos(angle) * radius;
    let cy = sin(angle) * radius * 0.6;
    fill(palette[(i + 1) % palette.length]);
    noStroke();
    ellipse(cx, cy, 24 - i * 3, 24 - i * 3);
  }

  stroke(palette[6]);
  strokeWeight(1.5);
  noFill();
  for (let i = 0; i < 4; i++) {
    push();
    rotate(phase * 1.5 * dir + i * 45);
    drawTriangle(0, 0, 60 + i * 15);
    pop();
  }

  stroke(palette[2]);
  for (let i = 0; i < 3; i++) {
    strokeWeight(1 + sin(phase * 2 + i * 60) * 0.8);
    noFill();
    arc(0, 0, 120 + i * 40, 100 + i * 35, i * 45, i * 45 + 120);
  }

  stroke(palette[4]);
  strokeWeight(0.8);
  for (let i = 0; i < 10; i++) {
    let angle = phase * 4 * dir + i * 36;
    let len = 90 + 20 * sin(phase * 3 + i * 20);
    let x1 = cos(angle) * 10;
    let y1 = sin(angle) * 10 * 0.7;
    let x2 = cos(angle) * len;
    let y2 = sin(angle) * len * 0.7;
    line(x1, y1, x2, y2);
  }

  pop();
}

function drawTriangle(x, y, size) {
  beginShape();
  vertex(x, y - size / 1.5);
  vertex(x - size / 1.3, y + size / 2);
  vertex(x + size / 1.3, y + size / 2);
  endShape(CLOSE);
}

function drawStarShape(x, y, radius, phase) {
  push();
  translate(x, y);
  rotate(phase);
  noStroke();

  for (let i = 8; i > 0; i--) {
    let r = radius * (i / 8);
    let alpha = map(i, 1, 8, 10, 70);
    fill(colorWithAlpha(palette[3], alpha));
    beginShape();
    for (let a = 0; a < 360; a += 45) {
      let rMod = r * (a % 90 === 0 ? 1 : 0.5);
      let sx = cos(a) * rMod * (1 + 0.04 * sin(phase * 5 + i * 20));
      let sy = sin(a) * rMod * (1 + 0.04 * cos(phase * 5 + i * 20));
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
  pop();
}

function drawSegmentedRing(x, y, outerRadius, thickness, phase) {
  push();
  translate(x, y);
  rotate(phase);

  noFill();
  strokeWeight(4);
  stroke(palette[5]);

  let segments = 8;
  let angleStep = 360 / segments;
  for (let i = 0; i < segments; i++) {
    if (i % 2 === 0) {
      arc(0, 0, outerRadius * 2, outerRadius * 2, i * angleStep, (i + 1) * angleStep);
    }
  }

  strokeWeight(2);
  stroke(palette[0]);
  ellipse(0, 0, (outerRadius - thickness) * 2);

  pop();
}

function drawTopConcentricEllipses(x, y, widthEllipse, heightEllipse, phase) {
  push();
  translate(x, y);
  rotate(phase);

  for (let i = 10; i > 0; i--) {
    let w = widthEllipse * (i / 10);
    let h = heightEllipse * (i / 10);
    let alpha = map(i, 1, 10, 15, 80);
    fill(colorWithAlpha(palette[1], alpha));
    noStroke();
    ellipse(0, 0, w * (1 + 0.05 * sin(phase * 3 + i * 12)), h * (1 + 0.05 * cos(phase * 3 + i * 12)));
  }

  pop();
}

function colorWithAlpha(hex, alpha) {
  let c = color(hex);
  c.setAlpha(alpha);
  return c;
}

function drawExtras(time) {
  for (let s of extras) {
    push();
    translate(s.pos.x, s.pos.y);
    rotate(s.baseRotation + time * s.rotationSpeed);
    let pulse = 1 + 0.3 * sin(time * 5 * s.pulseSpeed + s.pulsePhase);
    scale(pulse);

    let c = color(palette[s.colorIdx]);
    c.setAlpha(180);
    fill(c);
    stroke(c);
    strokeWeight(1.2);

    switch (s.type) {
      case 'circle':
        ellipse(0, 0, s.size);
        break;
      case 'triangle':
        noFill();
        drawTriangle(0, 0, s.size);
        break;
      case 'rect':
        rectMode(CENTER);
        noFill();
        rect(0, 0, s.size * 1.2, s.size * 0.7);
        break;
      case 'line':
        strokeWeight(2);
        line(-s.size / 2, 0, s.size / 2, 0);
        break;
      case 'arc':
        noFill();
        strokeWeight(2);
        arc(0, 0, s.size, s.size * 0.7, 0, 135);
        break;
    }
    pop();
  }
}

function drawBubbles() {
  push();
  noStroke();
  for (let b of bubbles) {
    let ox = sin(t * 0.7 + b.oscillation) * 8;
    let oy = -b.speed * t * 30 % (height + 150);
    let x = b.pos.x + ox;
    let y = (b.pos.y + oy);
    if (y < -30) {
      b.pos.x = random(width);
      b.pos.y = height + random(60, 150);
      b.size = random(6, 18);
      b.speed = random(0.2, 0.8);
      b.alpha = random(40, 100);
      b.colorIdx = floor(random(palette.length - 1));
    }
    let c = color(palette[b.colorIdx]);
    c.setAlpha(b.alpha);
    fill(c);
    ellipse(x, y, b.size);
  }
  pop();
}

function drawSignatureStrokes() {
  push();
  blendMode(BLEND);
  stroke('#F7E071');
  strokeWeight(1);
  for (let i = 0; i < 30; i++) {
    let x = (noise(i * 7 + t * 0.1) * width) % width;
    let y = (noise(i * 13 - t * 0.12) * height) % height;
    let L = 5 + (i % 4);
    push();
    translate(x, y);
    rotate(noise(i * 3 + t * 0.05) * 360);
    line(0, 0, L, L * 0.15);
    pop();
  }

  for (let i = 0; i < 12; i++) {
    fill('#FFF8C2');
    noStroke();
    let x = width * 0.15 + (i * 60 + sin(t * 0.4 + i) * 20) % (width * 0.7);
    let y = height * 0.2 + cos(t * 0.45 + i * 0.6) * 50;
    ellipse(x, y, 5 + (i % 3));
  }
  pop();
}

function pickPalette(i) {
  let c = color(palette[i % palette.length]);
  return c;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



