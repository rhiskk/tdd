import { RotatingShape } from './RotatingShape.mjs';

export class Tetromino extends RotatingShape {
  static get T_SHAPE() {
    return new Tetromino(4,
      `.T.
       TTT
       ...`
    );
  }

  static get I_SHAPE() {
    return new Tetromino(2,
      `.....
       .....
       IIII.
       .....
       .....`
    );
  }

  orientations;
  currentOrientation;

  constructor(orientations, shape, currentOrientation = 0) {
    super(shape);
    this.orientations = orientations;
    this.currentOrientation = currentOrientation;
  }

  rotateRight() {
    if (this.orientations === 2 && this.currentOrientation === 1) {
      return this.rotateLeft();
    };
    return new Tetromino(this.orientations, super.rotateRight().toString(), this.currentOrientation + 1);
  }

  rotateLeft() {
    if (this.orientations === 2 && this.currentOrientation === 0) {
      return this.rotateRight();
    };
    return new Tetromino(this.orientations, super.rotateLeft().toString(), this.currentOrientation - 1);
  }


}