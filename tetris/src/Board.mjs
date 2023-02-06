import { Grid } from "./Grid.mjs";
import { MovingShape } from "./MovingShape.mjs";

export class Board extends Grid {
  #width;
  #height;
  #fallingShape;
  #stationaryBlocks;

  constructor(width, height) {
    super();
    this.#width = width;
    this.#height = height;
    this.#fallingShape = null;
    this.#stationaryBlocks = Array(height).fill().map(() => Array(width).fill(this.EMPTY));
  }

  drop(shape) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }
    const row = 0;
    const column = Math.floor(this.#width / 2 - shape.columns() / 2);
    this.#fallingShape = new MovingShape(shape, row, column);
  }

  tick() {
    this.moveDown();
  }

  rotateLeft() {
    if (!this.hasFalling()) {
      return;
    }
    const rotatedShape = this.#fallingShape.rotateLeft();
    if (this.#canMove(rotatedShape)) {
      this.#fallingShape = rotatedShape;
    }
  }

  rotateRight() {
    if (!this.hasFalling()) {
      return;
    }
    const rotatedShape = this.#fallingShape.rotateRight();
    if (this.#canMove(rotatedShape)) {
      this.#fallingShape = rotatedShape;
    }
  }

  moveLeft() {
    if (!this.hasFalling()) {
      return;
    }
    const movedShape = this.#fallingShape.moveLeft();
    if (this.#canMove(movedShape)) {
      this.#fallingShape = movedShape;
    }
  }

  moveRight() {
    if (!this.hasFalling()) {
      return;
    }
    const movedShape = this.#fallingShape.moveRight();
    if (this.#canMove(movedShape)) {
      this.#fallingShape = movedShape;
    }
  }

  moveDown() {
    if (!this.hasFalling()) {
      return;
    }
    const movedShape = this.#fallingShape.moveDown();
    if (this.#canMove(movedShape)) {
      this.#fallingShape = movedShape;
    } else {
      this.#stopFalling();
    }
  }

  hasFalling() {
    return this.#fallingShape !== null;
  }

  cellAt(row, column) {
    const cell = this.#fallingCellAt(row, column);
    return cell !== this.EMPTY ? cell : this.#stationaryCellAt(row, column);
  }

  rows() {
    return this.#height;
  };

  columns() {
    return this.#width;
  };

  #stopFalling() {
    for (let row = 0; row < this.#fallingShape.rows(); row++) {
      for (let column = 0; column < this.#fallingShape.columns(); column++) {
        if (this.#fallingShape.cellAt(row, column) !== this.EMPTY) {
          this.#stationaryBlocks[this.#fallingShape.row() + row][this.#fallingShape.column() + column]
            = this.#fallingShape.cellAt(row, column);
        }
      }
    }
    this.#fallingShape = null;
  }

  #canMove(movedShape) {
    if (!(movedShape instanceof MovingShape)) {
      throw new Error("not a moving shape");
    }
    for (let row = 0; row < movedShape.rows(); row++) {
      for (let column = 0; column < movedShape.columns(); column++) {
        if (movedShape.cellAt(row, column) === this.EMPTY) {
          continue;
        }
        if (movedShape.row() + row >= this.#height
          || movedShape.column() + column < 0
          || movedShape.column() + column >= this.#width
          || this.#stationaryCellAt(movedShape.row() + row, movedShape.column() + column) !== this.EMPTY
        ) {
          return false;
        }
      }
    }
    return true;
  }

  #fallingCellAt(row, column) {
    if (this.hasFalling()) {
      const fallingRow = this.#fallingShape.row();
      const fallingColumn = this.#fallingShape.column();
      if (row >= fallingRow
        && row < fallingRow + this.#fallingShape.rows()
        && column >= fallingColumn
        && column < fallingColumn + this.#fallingShape.columns()
      ) {
        return this.#fallingShape.cellAt(row - fallingRow, column - fallingColumn);
      }
    }
    return this.EMPTY;
  }

  #stationaryCellAt(row, column) {
    if (row < 0 || row >= this.#height || column < 0 || column >= this.#width) {
      return this.EMPTY;
    }
    return this.#stationaryBlocks[row][column];
  }

}
