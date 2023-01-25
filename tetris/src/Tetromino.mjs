export class Tetromino {

  shape;

  static get T_SHAPE() {
    return new Tetromino(
      `.T.
       TTT
       ...`
    );
  }

  constructor(shape) {
    this.shape = shape.replace(/^\s+/gm, '');
  }

  toString() {
    return this.shape + "\n";
  }

}