let img;
let rs = []
let time;
let speed = 3

function preload() {
  img = loadImage("artwork.jpg"); // Load the image
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Set the canvas size to the window size
  img.resize(windowWidth, windowHeight); // Resize the image to fill the canvas
  noStroke();
  img.loadPixels();

  let gridSize = 10; // Size of each square in the grid

  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      let index = (x + y * img.width) * 4;

      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      // Draw a rectangle with a random width and height
      let w = random(gridSize / 2, gridSize * 1.5);
      let h = random(gridSize / 2, gridSize * 1.5);

      rs.push({
        x: x,
        y: y,
        w: w,
        h: h,
        r: r,
        g: g,
        b: b,
        a: random(50, 255),
        d: 1
      })
    }
  }

  time = millis()
}

function draw() {
  background(200)

  noStroke();
  for (let i = 0; i < rs.length; i++) {
    fill(rs[i].r, rs[i].g, rs[i].b, rs[i].a);
    rect(rs[i].x, rs[i].y, rs[i].w, rs[i].h);
    rs[i].a = rs[i].a + (rs[i].d * speed);


    if (rs[i].a >= 255) {
      rs[i].d = -1
    }
    if (rs[i].a <= 50) {
      rs[i].d = 1
    }
  }

  if (millis() - time >= 5000) {
    speed = int(random(5, 10))
  }

}
