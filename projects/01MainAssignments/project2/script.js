let scrollY = 0;
let targetScroll = 0;
let barWidth = 20;
let knobHeight = 60;
let isDragging = false;

let products = [];
let cols = 2;

function setup() {
  createCanvas(500, windowHeight);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  textSize(14);

  // Produkte + Button-Daten erzeugen
  for (let i = 0; i < 20; i++) {
    products.push({
      name: "Product " + (i + 1),
      price: "$" + Math.floor(random(10, 100)),
      color: color(random(200, 255), random(150, 255), random(150, 255)),

      // Button Eigenschaften
      btnX: 0,
      btnY: 0,
      btnW: 80,
      btnH: 30,
      btnVX: random(-2, 2),
      btnVY: random(-2, 2),
      startPositionSet: false
    });
  }
}

function draw() {
  background('#1D1B31');

  let productWidth = (width - barWidth - 60) / cols;
  let productHeight = 180;
  let spacingX = 20;
  let spacingY = 20;

  let contentHeight = Math.ceil(products.length / cols) * (productHeight + spacingY);

  // Scroll smooth bewegen – beim Drag sofort setzen
  if (isDragging) {
    scrollY = targetScroll;
  } else {
    scrollY = lerp(scrollY, targetScroll, 0.12);
  }

  // Produkte anzeigen
  for (let i = 0; i < products.length; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);

    let x = spacingX + col * (productWidth + spacingX) + productWidth / 2;
    let y = spacingY + row * (productHeight + spacingY) + productHeight / 2 - scrollY;

    // Karte zeichnen
    fill(products[i].color);
    rect(x, y, productWidth, productHeight, 10);

    fill(0);
    text(products[i].name, x, y - 30);
    text(products[i].price, x, y + 30);

    // Button-Bewegung
    let p = products[i];

    // Startposition einmalig setzen
    if (!p.startPositionSet) {
      p.btnX = x;
      p.btnY = y + 60;
      p.startPositionSet = true;
    }

    // Geschwindigkeit erhöhen (3× schneller)
    let speedBoost = 3;
    p.btnX += p.btnVX * speedBoost;
    p.btnY += p.btnVY * speedBoost;

    // Button Begrenzungen innerhalb Karte
    let left = x - productWidth / 2 + p.btnW / 2;
    let right = x + productWidth / 2 - p.btnW / 2;
    let top = y - productHeight / 2 + p.btnH / 2;
    let bottom = y + productHeight / 2 - p.btnH / 2;

    // Saubere Rand-Kollisionen + Korrektur
    if (p.btnX < left) { p.btnX = left; p.btnVX *= -1; }
    if (p.btnX > right) { p.btnX = right; p.btnVX *= -1; }
    if (p.btnY < top) { p.btnY = top; p.btnVY *= -1; }
    if (p.btnY > bottom) { p.btnY = bottom; p.btnVY *= -1; }

    // Buy Button zeichnen
    fill('#39FF14');
    rect(p.btnX, p.btnY, p.btnW, p.btnH, 5);
    fill(0);
    text("Buy", p.btnX, p.btnY);
  }

  // Scrollbar Hintergrund
  fill(200);
  rect(width - barWidth/2, height/2, barWidth, height);

  // Scroll-Knob
  let knobY = map(scrollY, 0, max(contentHeight - height, 1), 0, height - knobHeight);
  fill('#39FF14');
  rect(width - barWidth/2, knobY + knobHeight / 2, barWidth, knobHeight, 10);
}

function mousePressed() {
  let productHeight = 180;
  let spacingY = 20;
  let contentHeight = Math.ceil(products.length / cols) * (productHeight + spacingY);

  let knobY = map(scrollY, 0, max(contentHeight - height, 1), 0, height - knobHeight);

  if (mouseX > width - barWidth &&
      mouseX < width &&
      mouseY > knobY &&
      mouseY < knobY + knobHeight) {
    isDragging = true;
  }
}

function mouseDragged() {
  if (isDragging) {
    let productHeight = 180;
    let spacingY = 20;
    let contentHeight = Math.ceil(products.length / cols) * (productHeight + spacingY);

    targetScroll = map(mouseY - knobHeight / 2, 0, height - knobHeight, 0, max(contentHeight - height, 1));
    targetScroll = constrain(targetScroll, 0, max(contentHeight - height, 0));
  }
}

function mouseReleased() {
  isDragging = false;
}