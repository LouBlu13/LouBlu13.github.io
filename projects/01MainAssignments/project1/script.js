let font;

function preload(){ font=loadFont("RobotoMono-Bold.otf"); }

function setup(){
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(40);
  textAlign(CENTER,CENTER);
}

function draw(){
  background(0);
  translate(width/2, height/2);
  for(let i=-10;i<10;i++){
    for(let j=-10;j<10;j++){
      let n = noise(i*0.3, j*0.3, frameCount*0.01)*50;
      fill(map(i+j,0,20,0,255), map(j,0,20,0,255), 255);
      text("ZHdK", i*50+n, j*50+n);
    }
  }
}
