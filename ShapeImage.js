class ShapeImage {
  constructor(size, color) {
    this.number = floor(random(1, 5));
    this.radDist = size * 0.4;
    this.firstDist = 0;
    this.lastDist = 0;
    this.lerpAngle = 270;
    this.angleOffset = random(TWO_PI);
    this.noiseOffset = random(100);
    this.color = color;

    // this.points = this.generatePoints();
    this.graphics = this.generateGraphics(size, size);

    return this;
  }
  get() {
    return this.graphics;
  }
  show() {
    image(this.graphics, 0, 0);
  }
  generatePoints() {
    let points = [];
    for (let angle = 0; angle <= 360; angle += 2) {
      let rad = radians(angle) + this.angleOffset;
      let sineVal = map(
        sin(rad * this.number),
        -1,
        1,
        this.radDist * 0.75,
        this.radDist
      );
      let noiseVal = map(
        noise(rad * 0.2 + this.noiseOffset),
        0,
        1,
        -this.radDist * 0.5,
        this.radDist * 0.3
      );
      let distance = sineVal + noiseVal;
      if (angle > this.lerpAngle) {
        let pct = map(angle, this.lerpAngle, 360, 0.0, 1.0);
        distance = lerp(distance, this.firstDist, pct);
      }
      let x = cos(rad) * distance;
      let y = sin(rad) * distance;
      points.push(new p5.Vector(x, y));

      if (angle == 0) {
        points.push(new p5.Vector(x, y)); // first control point
        this.firstDist = distance;
      } else if (angle == this.lerpAngle) {
        this.lastDist = distance;
      } else if (angle == 360) {
        points.push(new p5.Vector(x, y)); // last control point
      }
    }

    return points;
  }
  generateGraphics(w, h) {
    let g = createGraphics(w, h);

    /*
    g.push();
    g.translate(w / 2, h / 2);
    //g.rotate(random(TWO_PI));
    g.noStroke();
    if (this.color) {
      g.fill(this.color);
    } else {
      g.fill(random(210), random(210), random(210), 120);
    }
 
    g.beginShape();
    for (const p of this.points) {
      g.vertex(p.x, p.y);
    }
    g.endShape(CLOSE);    

    g.pop();
    */

    // shapes
    function drawRandomShape(x, y, size) {
      let chance = random();
      if (chance < 0.5) {
        g.circle(x, y, size);
      } else if (chance < 0.8) {
        g.push();
        g.translate(x, y);
        let ch = random();
        if (ch < 0.15) {
          g.rotate(radians(30));
        } else if (ch < 0.3) {
          g.rotate(radians(-30));
        }
        g.rectMode(CENTER);
        g.rect(0, 0, size, size);
        g.pop();
      } else {
        g.push();
        g.translate(x, y);
        g.rotate(random(TWO_PI));
        g.triangle(
          0,
          -size * 0.45,
          -size / 2,
          size * 0.45,
          size / 2,
          size * 0.45
        );
        g.pop();
      }
    }
    function drawLinePattern(x, y, size) {
      g.push();
      g.translate(x, y);
      g.rotate(random(TWO_PI));
      for (let i = -size; i <= size; i += 3) {
        g.line(-size, i, size, i);
      }
      g.pop();
    }
    function drawCirclePattern(x, y, size) {
      g.push();
      g.translate(x, y);
      g.rotate(random(TWO_PI));
      let dia = random(2, 4);
      let gap = random(3, 10);
      for (let j = -size; j <= size; j += dia + gap) {
        for (let i = -size; i <= size; i += dia + gap) {
          g.circle(i, j, dia);
        }
      }
      g.pop();
    }
    g.push();
    g.blendMode(DIFFERENCE);
    g.fill(255);
    g.strokeWeight(1);
    let dst = 25;
    drawRandomShape(
      w / 2 + random(-dst, dst),
      h / 2 + random(-dst, dst) - 20,
      random(40, 100)
    );
    drawRandomShape(
      w / 2 + random(-dst, dst),
      h / 2 + random(-dst, dst) - 20,
      random(10, 60)
    );

    g.pop();
    //g.filter(INVERT);

    push();
    if (random() < 0.8) {
      g.stroke(255, 150);
      g.strokeWeight(1);
      drawLinePattern(
        w / 2 + random(-dst, dst),
        h / 2 + random(-dst, dst) - 20,
        random(20, 50)
      );
    } else {
      g.noStroke();
      g.fill(240);
      drawCirclePattern(
        w / 2 + random(-dst, dst),
        h / 2 + random(-dst, dst) - 20,
        random(20, 50)
      );
    }

    pop();

    // outer stroke
    g.stroke(210);
    g.noFill();
    g.rect(0, 0, w, h);

    g.stroke(140);
    let len = 0.07;
    g.line(0, 0, w * len, 0);
    g.line(0, 0, 0, h * len);
    g.line(w, 0, w - w * len, 0);
    g.line(w, 0, w, h * len);
    g.line(w, h, w - w * len, h);
    g.line(w, h, w, h - h * len);
    g.line(0, h, w * len, h);
    g.line(0, h, 0, h - h * len);

    return g;
  }
}