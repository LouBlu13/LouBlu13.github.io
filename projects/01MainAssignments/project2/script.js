let scrollY = 0;
let targetScroll = 0; 
let barWidth = 20; 
let knobHeight = 60; 
let isDragging = false;

let products = [];
let cols = 2; // Zwei Spalten
let buttonOffsets = []; // Bewegung der Buy Buttons

function setup() {
  createCanvas(500, windowHeight);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  textSize(14);

  // Beispielprodukte generieren
  for (let i = 0; i < 20; i++) {
    products.push({
      name: "Product " + (i + 1),
      price: "$" + (Math.floor(random(10, 100))),
      color: color(random(200, 255), random(150, 255), random(150, 255))
    });

    // Startposition + random Richtung
    buttonOffsets.push({
      x: random(-40, 40),
      y: random(20, 60),
      dx: random(-2, 2),
      dy: random(-2, 2)
    });
  }
}

function draw() {
  background('#1D1B31'); // dunkler Hintergrund

  let productWidth = (width - barWidth - 60) / cols; 
  let productHeight = 180;
  let spacingX = 20;
  let spacingY = 20;

  let contentHeight = Math.ceil(products.length / cols) * (productHeight + spacingY);

  scrollY = lerp(scrollY, targetScroll, 0.1); // sanftes Scrollen

  // Produkte anzeigen
  for (let i = 0; i < products.length; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);

    let x = spacingX + col * (productWidth + spacingX) + productWidth / 2;
    let y = spacingY + row * (productHeight + spacingY) + productHeight / 2 - scrollY;

    // Produktkarte
    fill(products[i].color);
    rect(x, y, productWidth, productHeight, 10);

    // Produktname
    fill(0);
    text(products[i].name, x, y - 30);

    // Preis
    text(products[i].price, x, y + 30);

    // ===========================
    //      Schneller Buy Button
    //      mit voller Box-Bewegung
    // ===========================
    let b = buttonOffsets[i];

    // Geschwindigkeit hochdrehen
    b.x += b.dx * 3;
    b.y += b.dy * 3;

    // Grenzen der Box definieren
    let minX = -productWidth / 2 + 40;
    let maxX = productWidth / 2 - 40;
    let minY = -productHeight / 2 + 80;
    let maxY = productHeight / 2 - 20;

    // An Kanten abprallen
    if (b.x < minX || b.x > maxX) b.dx *= -1;
    if (b.y < minY || b.y > maxY) b.dy *= -1;

    // Button zeichnen (Bewegung addieren)
    fill('#39FF14');
    rect(x + b.x, y + b.y, 80, 30, 5);

    fill(255);
    text("Buy", x + b.x, y + b.y);
  }

  // Scroll-Balken über die Seite
  fill(200);
  noStroke();
  rect(width - barWidth/2, height/2, barWidth, height);

  // Scroll-Knopf
  let knobY = map(scrollY, 0, max(contentHeight - height, 1), 0, height - knobHeight);

  fill('#39FF14');
  rect(width - barWidth/2, knobY + knobHeight / 2, barWidth, knobHeight, 10);
}

function mousePressed() {
  let productHeight = 180;
  let spacingY = 20;
  let contentHeight = Math.ceil(products.length / cols) * (productHeight + spacingY);

  let knobY = map(scrollY, 0, max(contentHeight - height, 1), 0, height - knobHeight);
  if (mouseX > width - barWidth && mouseX < width && mouseY > knobY && mouseY < knobY + knobHeight) {
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
  targetScroll = 0; // Seite fällt wieder nach oben
}
