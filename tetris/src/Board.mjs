import { Grid } from "./Grid.mjs";

export class Board extends Grid {
  width;
  height;
  fallingShape;
  fallingShapeRow;
  fallingShapeColumn;
  stationaryBlocks;

  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.fallingShape = null;
    this.stationaryBlocks = Array(height).fill().map(() => Array(width).fill(this.EMPTY));
  }

  drop(shape) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }
    this.fallingShape = shape;
    this.fallingShapeRow = 0;
    this.fallingShapeColumn = Math.floor(this.width / 2 - shape.columns() / 2);
  }

  tick() {
    if (this.shapeHitsFloor() || this.shapeHitsAnotherShape()) {
      this.stopFalling();
    } else {
      this.fallingShapeRow += 1;
    }
  }

  moveLeft() {
    if (this.hasFalling()) {
      this.fallingShapeColumn -= 1;
    }
  }

  moveRight() {
    if (this.hasFalling()) {
      this.fallingShapeColumn += 1;
    }
  }

  shapeHitsFloor() {
    if (this.hasFalling()) {
      for (let row = 0; row < this.fallingShape.rows(); row++) {
        for (let column = 0; column < this.fallingShape.columns(); column++) {
          if (
            this.fallingShape.cellAt(row, column) !== this.EMPTY
            && this.toBoardRow(row) === this.height - 1
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  shapeHitsAnotherShape() {
    return (
      this.hasFalling()
      && this.cellAt(this.toBoardRow(this.fallingShape.rows()), this.fallingShapeColumn)
      !== this.EMPTY
    );
  }

  stopFalling() {
    for (let row = 0; row < this.fallingShape.rows(); row++) {
      for (let column = 0; column < this.fallingShape.columns(); column++) {
        if (this.fallingShape.cellAt(row, column) !== this.EMPTY) {
          this.stationaryBlocks[this.toBoardRow(row)][this.toBoardColumn(column)]
            = this.fallingShape.cellAt(row, column);
        }
      }
    }
    this.fallingShape = null;
  }

  hasFalling() {
    return this.fallingShape !== null;
  }

  withinFallingShape(row, column) {
    return (
      this.fallingShapeRow <= row
      && row < this.fallingShapeRow + this.fallingShape.rows()
      && this.fallingShapeColumn <= column
      && column < this.fallingShapeColumn + this.fallingShape.columns()
    );
  }

  fallingCellAt(row, column) {
    if (this.hasFalling() && this.withinFallingShape(row, column)) {
      return this.fallingShape.cellAt(row - this.fallingShapeRow, column - this.fallingShapeColumn);
    }
    return null;
  }

  cellAt(row, column) {
    if (row < 0 || row >= this.height || column < 0 || column >= this.width) {
      return this.EMPTY;
    }
    const cell = this.fallingCellAt(row, column);
    return cell ? cell : this.stationaryBlocks[row][column];
  }

  toBoardRow(row) {
    return this.fallingShapeRow + row;
  }

  toBoardColumn(column) {
    return this.fallingShapeColumn + column;
  }

  rows() {
    return this.height;
  };

  columns() {
    return this.width;
  };

}
