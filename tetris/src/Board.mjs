import { Grid } from "./Grid.mjs";
import { MovingShape } from "./MovingShape.mjs";

export class Board extends Grid {
  #width;
  #height;
  #fallingShape;
  #stationaryBlocks;
  #observers;

  constructor(width, height) {
    super();
    this.#observers = [];
    this.#width = width;
    this.#height = height;
    this.#fallingShape = null;
    this.#stationaryBlocks = Array(height).fill().map(() => Array(width).fill(this.EMPTY));
  }

  subscribe(observer) {
    this.#observers.push(observer);
  }

  #notify(linesCleared) {
    for (let observer of this.#observers) {
      observer(linesCleared);
    }
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
    let rotatedShape = this.#fallingShape.rotateLeft();
    this.#tryToRotate(rotatedShape);
  }

  rotateRight() {
    if (!this.hasFalling()) {
      return;
    }
    let rotatedShape = this.#fallingShape.rotateRight();
    this.#tryToRotate(rotatedShape);
  }

  #tryToRotate(rotatedShape) {
    if (this.#isAllowed(rotatedShape)) {
      this.#fallingShape = rotatedShape;
    } else {
      this.#wallKick(rotatedShape);
    }
  }

  #wallKick(rotatedShape) {
    if (rotatedShape.column() < 0) {
      rotatedShape = rotatedShape.moveRight();
      this.#tryToRotate(rotatedShape);
    }
    if (rotatedShape.column() + rotatedShape.columns() >= this.#width) {
      rotatedShape = rotatedShape.moveLeft();
      this.#tryToRotate(rotatedShape);
    }
  }

  moveLeft() {
    if (!this.hasFalling()) {
      return;
    }
    const movedShape = this.#fallingShape.moveLeft();
    if (this.#isAllowed(movedShape)) {
      this.#fallingShape = movedShape;
    }
  }

  moveRight() {
    if (!this.hasFalling()) {
      return;
    }
    const movedShape = this.#fallingShape.moveRight();
    if (this.#isAllowed(movedShape)) {
      this.#fallingShape = movedShape;
    }
  }

  moveDown() {
    if (!this.hasFalling()) {
      return;
    }
    const movedShape = this.#fallingShape.moveDown();
    if (this.#isAllowed(movedShape)) {
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
    this.#lineClear();
    this.#fallingShape = null;
  }

  #lineClear() {
    let linesCleared = 0;
    for (let row = 0; row < this.#height; row++) {
      let fullRow = true;
      for (let column = 0; column < this.#width; column++) {
        if (this.#stationaryBlocks[row][column] === this.EMPTY) {
          fullRow = false;
        }
      }
      if (fullRow) {
        linesCleared++;
        this.#stationaryBlocks.splice(row, 1);
        this.#stationaryBlocks.unshift(Array(this.#width).fill(this.EMPTY));
      }
    }
    if (linesCleared > 0) {
      this.#notify(linesCleared);
    }
  }

  #isAllowed(movedShape) {
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
