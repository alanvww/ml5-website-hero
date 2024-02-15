let colors = [];
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.elt.style.zIndex = "-1";

  colors = [
    color(123, 97, 166),
    color(200, 98, 160),
    color(245, 229, 82),
    color(112, 184, 234),
    color(137, 197, 186),
  ];
  blendMode(HARD_LIGHT);
  drawShapes();
}

function draw() {
  noLoop();
}

function drawShapes() {
  for (let i = 0; i < 10; i++) {
    push();
    translate(
      random(width * 0.1, width * 0.9),
      random(height * 0.1, height * 0.9)
    );
    imageMode(CENTER);
    // tint(255, 180);
    let size = (width + height) / 2;
    if (width < 800) {
      let adj = map(width, 400, 800, 2.0, 1.0);
      size *= adj;
    }

    new ShapeImage(size * random(0.2, 1.0), colors[i]).show();
    pop();
  }
}

window.addEventListener("resize", () => {
  canvas = createCanvas(windowWidth, windowHeight);
  drawShapes();
});