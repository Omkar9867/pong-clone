const SPEED = 0.02;

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
    this.reset();
  }

  //Helper Function
  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--position")
    );
  }

  set position(val) {
    this.paddleElem.style.setProperty("--position", val);
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  reset() {
    this.position = 50;
  }

  update(delta, ball) {
    if (!isNaN(delta)) {
      this.position += SPEED * delta * (ball - this.position);
    }
  }
}
