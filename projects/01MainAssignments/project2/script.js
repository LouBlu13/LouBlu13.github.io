let scrollY = 0;
let targetScroll = 0; 
let barWidth = 20; 
let knobHeight = 60; 
let isDragging = false;

let products = [];
let cols = 2; // Zwei Spalten

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
  }
}

function draw() {
  background('#1D1B31'); 

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

    // Buy Button
    fill('#39FF14');
    rect(x, y + 60, 80, 30, 5);
    fill(255);
    text("Buy", x, y + 60);
	  
  }

  // Scroll-Balken über die ganze Seite
  fill(200);
  noStroke();
  rect(width - barWidth/2, height/2, barWidth, height); // Balken von oben bis unten

  // Knopf-Position basierend auf ScrollY
  let knobY = map(scrollY, 0, max(contentHeight - height, 1), 0, height - knobHeight);

  // Scroll-Knopf 
  fill('#39FF14'); 
  rect(width - barWidth/2, knobY + knobHeight / 2, barWidth, knobHeight, 10); // letzter Parameter = Abrundung
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
