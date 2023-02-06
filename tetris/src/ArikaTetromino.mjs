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

  static get O_SHAPE() {
    return new ArikaTetromino([
      `....
       .OO.
       .OO.
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

  static get J_SHAPE() {
    return new ArikaTetromino([
      `....
       JJJ.
       ..J.
       ....`,
      `.J..
       .J..
       JJ..
       ....`,
      `....
       J...
       JJJ.
       ....`,
      `.JJ.
       .J..
       .J..
       ....`,
    ]);
  }

  static get L_SHAPE() {
    return new ArikaTetromino([
      `....
       LLL.
       L...
       ....`,
      `LL..
       .L..
       .L..
       ....`,
      `....
       ..L.
       LLL.
       ....`,
      `.L..
       .L..
       .LL.
       ....`,
    ]);
  }

  static get S_SHAPE() {
    return new ArikaTetromino([
      `....
       .SS.
       SS..
       ....`,
      `S...
       SS..
       .S..
       ....`,
    ]);
  }

  static get Z_SHAPE() {
    return new ArikaTetromino([
      `....
       ZZ..
       .ZZ.
       ....`,
      `..Z.
       .ZZ.
       .Z..
       ....`,
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