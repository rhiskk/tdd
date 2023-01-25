import { RotatingShape } from './RotatingShape.mjs';

export class Tetromino extends RotatingShape {
  static get T_SHAPE() {
    return new Tetromino(
      `.T.
       TTT
       ...`
    );
  }

  constructor(shape) {
    super(shape);
  }

}