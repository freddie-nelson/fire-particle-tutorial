import Particle from "./js/Particle";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight
})

const buttons = Array.from(document.getElementsByClassName("button"));
let buttonMeasurements: DOMRect[] = [];
let activeButton = -1;

buttons.forEach((button, i) => {
  button.addEventListener("mouseenter", () => {
    activeButton = i;
  })

  button.addEventListener("mouseleave", () => {
    activeButton = -1;
  })
})

const measureButtons = () => {
  buttonMeasurements = [];

  buttons.forEach(button => {
    buttonMeasurements.push(button.getBoundingClientRect())
  });
}

measureButtons();
window.addEventListener("resize", measureButtons);

let particles: Particle[] = [];

const handleParticles = () => {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    
    p.update();
    p.draw();

    if (p.size <= 1) {
      particles.splice(i, 1);
    }
  }
}

const createParticle = () => {
  if (activeButton === -1) return;

  const active = buttonMeasurements[activeButton];

  const x = Math.random() * active.width + active.left;
  const y = active.y + 30;
  const size = Math.random() * 40 + 10;

  particles.push(new Particle(x, y, size))
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  createParticle();
  handleParticles();
  requestAnimationFrame(animate);
}

animate();