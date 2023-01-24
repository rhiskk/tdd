export class RotatingShape {
  shape;

  constructor(shape) {
    this.shape = shape.replace(/^\s+/gm, '') + "\n";
  }

  toString() {
    return this.shape;
  }

}