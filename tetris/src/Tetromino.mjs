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

  static get J_SHAPE() {
    return new Tetromino(4,
      `J..
       JJJ
       ...`
    );
  }

  static get L_SHAPE() {
    return new Tetromino(4,
      `..L
       LLL
       ...`
    );
  }

  static get S_SHAPE() {
    return new Tetromino(2,
      `.SS
       SS.
       ...`
    );
  }

  static get Z_SHAPE() {
    return new Tetromino(2,
      `ZZ.
       .ZZ
       ...`
    );
  }

  static get O_SHAPE() {
    return new Tetromino(1,
      `.OO
       .OO
       ...`
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
    if (this.orientations === 1) {
      return this;
    }
    if (this.orientations === 2 && this.currentOrientation === 1) {
      return this.rotateLeft();
    };
    return new Tetromino(this.orientations, super.rotateRight().toString(), this.currentOrientation + 1);
  }

  rotateLeft() {
    if (this.orientations === 1) {
      return this;
    }
    if (this.orientations === 2 && this.currentOrientation === 0) {
      return this.rotateRight();
    };
    return new Tetromino(this.orientations, super.rotateLeft().toString(), this.currentOrientation - 1);
  }


}