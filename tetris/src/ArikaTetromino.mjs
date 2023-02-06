import { RotatingShape } from './RotatingShape.mjs';

export class ArikaTetromino extends RotatingShape {

  static get T_SHAPE() {
    return new ArikaTetromino([
      `....
       TTT.
       .T..
       ....`
    ], 0);
  }

  constructor(orientations, currentOrientation = 0) {
    super(orientations[currentOrientation]);
  }

}