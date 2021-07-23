const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

export default class Particle {
  x: number;
  y: number;
  size: number;
  velY: number;
  velX: number;

  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velY = -(Math.random() * 1.5 + 1.5);
    this.velX = Math.random() * 2
  }

  update() {
    this.y += this.velY;
    this.x += this.velX;

    if (this.size >= 0.3) this.size -= 0.3;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "orange";
    ctx.fill();
  }
}