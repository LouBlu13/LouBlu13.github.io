let font;
let textString = "Creative Typography ";
let spiralActive = false;
let spirals = [];
let numSpirals = 12;
let maxPerSpiral = 8; // maximale sichtbare "ZHdK" pro Spirale
let spiralOriginX = 0;
let spiralOriginY = 0;
let bgColor;
let textAlpha = 180;

// Array für große Klick-Texte
let clickTexts = [];

function preload() {
  font = loadFont("RobotoMono-Bold.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textAlign(LEFT, CENTER); 
  textSize(40);

  bgColor = color(0, 0, 0);

  // Initialisiere Spiralen
  for (let i = 0; i < numSpirals; i++) {
    spirals.push({
      angleOffset: random(360),
      speed: random(0.01, 0.05),
      growth: random(1, 3),
      wobble: random(0.5, 2),
      direction: random([1, -1]),
      curveFactor: random(1, 3),
      history: [] // speichert Buchstaben jeder Spirale
    });
  }
}

function draw() {
  background(bgColor);

  // Hintergrundtext
  let lineHeight = 50;
  let textSizeVal = 40;
  textSize(textSizeVal);

  let textWidthVal = textWidth(textString);

  if (spiralActive) {
    textAlpha = lerp(textAlpha, 50, 0.05);
  } else {
    textAlpha = lerp(textAlpha, 180, 0.05);
  }

  // Verstärkte Bewegung
  let movementStrength = map(mouseY, 0, height, 50, 200);

  for (let y = 0; y < height; y += lineHeight) {
    let xOffset = sin(frameCount * 0.08 + y * 0.2) * movementStrength;
    fill(0, 255, 70, textAlpha);
    for (let x = 0; x < width; x += textWidthVal) {
      text(textString, x + xOffset, y);
    }
  }

  // Spiralen
  if (spiralActive) {
    push();
    translate(spiralOriginX, spiralOriginY);

    for (let s = 0; s < numSpirals; s++) {
      let spiral = spirals[s];
      let i = spiral.history.length > 0 ? spiral.history[spiral.history.length - 1].i + 10 : 0;

      let r = i * 2;
      let dir = spiral.direction;
      let wobbleX = sin(frameCount * 0.01 + i * 0.05 + s) * spiral.wobble * 10;
      let wobbleY = cos(frameCount * 0.01 + i * 0.05 + s) * spiral.wobble * 10;

      let x = cos(radians(i * spiral.curveFactor + spiral.angleOffset)) * r * dir + wobbleX;
      let y = sin(radians(i * spiral.curveFactor + spiral.angleOffset)) * r * dir + wobbleY;

      spiral.history.push({x: x, y: y, i: i});

      if (spiral.history.length > maxPerSpiral) {
        spiral.history.shift();
      }

      fill(0, 255, 70);
      for (let b of spiral.history) {
        text("BOOM", b.x, b.y);
      }
    }

    for (let s = 0; s < numSpirals; s++) {
      spirals[s].angleOffset += spirals[s].speed;
    }

    pop();
  }

  // Große Klick-Texte zeichnen
  textAlign(CENTER, CENTER);
  for (let ct of clickTexts) {
    fill(0, 255, 70);
    textSize(100);
    text("ZHdK", ct.x, ct.y);
  }
}

function mousePressed() {
  spiralActive = true;
  spiralOriginX = mouseX;
  spiralOriginY = mouseY;

  for (let s = 0; s < numSpirals; s++) {
    spirals[s].history = [];
  }

  // Füge neuen großen Text an Klickposition hinzu
  clickTexts.push({x: mouseX, y: mouseY});
}
