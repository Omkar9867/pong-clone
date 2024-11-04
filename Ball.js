const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00001;

export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem;
    this.reset();
  }

  //Helper Functions
  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
  }
  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
  }

  set x(val) {
    this.ballElem.style.setProperty("--x", val);
  }
  set y(val) {
    this.ballElem.style.setProperty("--y", val);
  }

  rect() {
    return this.ballElem.getBoundingClientRect();
  }

  reset() {
    this.x = 50;
    this.y = 50;
    // console.log("Initial position:", this.x, this.y);
    this.direction = { x: 0 };
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
      //Which means completely moving upsideDown or Sideways
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
      //   console.log(this.direction);
    }
    this.velocity = INITIAL_VELOCITY;
  }

  update(delta, paddleRects) {
    const newX = this.x + this.direction.x * this.velocity * delta;
    const newY = this.y + this.direction.y * this.velocity * delta;
    if (!isNaN(newX) || !isNaN(newY)) {
      //Check if the calculation results NAN then proceed further
      this.x = newX;
      this.y = newY;
      this.velocity += VELOCITY_INCREASE * delta;
    }
    // console.log(this.x, this.y);
    const rect = this.rect();
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }
    if (paddleRects.some((p) => isCollision(p, rect))) {
      this.direction.x *= -1;
    }
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min; //Adding min states min will be the lowest we get
}

function isCollision(rect1, rect2) {
  //rect1 is paddle and rect2 is ball, so either left paddle should collide right side of ball vice versa
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}
