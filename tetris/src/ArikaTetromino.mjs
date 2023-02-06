import { RotatingShape } from './RotatingShape.mjs';

export class ArikaTetromino extends RotatingShape {

  static get T_SHAPE() {
    return new ArikaTetromino([
      `....
       TTT.
       .T..
       ....`,
      `.T..
       TT..
       .T..
       ....`,
      `....
       .T..
       TTT.
       ....`
      ,
      `.T..
       .TT.
       .T..
       ....`,
    ]);
  }

  static get I_SHAPE() {
    return new ArikaTetromino([
      `....
       IIII
       ....
       ....`,
      `..I.
       ..I.
       ..I.
       ..I.`,
    ]);
  }

  #orientations;
  #currentOrientation;

  constructor(orientations, currentOrientation = 0) {
    super(orientations[currentOrientation]);
    this.#orientations = orientations;
    this.#currentOrientation = currentOrientation;
  }

  rotateRight() {
    const nextOrientation = this.#currentOrientation === this.#orientations.length - 1 ? 0 : this.#currentOrientation + 1;
    return new ArikaTetromino(this.#orientations, nextOrientation);
  }

  rotateLeft() {
    const nextOrientation = this.#currentOrientation === 0 ? this.#orientations.length - 1 : this.#currentOrientation - 1;
    return new ArikaTetromino(this.#orientations, nextOrientation);
  }

}