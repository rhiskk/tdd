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
    this.stationaryBlocks = Array(height).fill().map(() => Array(width).fill("."));
  }

  toString() {
    return Grid.prototype.toString.call(this);
  }

  drop(shape) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }
    this.fallingShape = shape;
    this.fallingShapeRow = 0;
    this.fallingShapeColumn = Math.floor(this.width / 2 - shape.columns() / 2);
  }

  shapeHitsAnotherShape() {
    return (this.hasFalling()
      && this.cellAt(this.fallingShapeRow + this.fallingShape.rows(), this.fallingShapeColumn)
      !== this.EMPTY);
  }

  shapeHitsFloor() {
    if (this.hasFalling()) {
      for (let row = 0; row < this.fallingShape.rows(); row++) {
        for (let column = 0; column < this.fallingShape.columns(); column++) {
          if (this.fallingShape.cellAt(row, column) !== this.EMPTY) {
            if (this.fallingShapeRow + row === this.height - 1) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  stopFalling() {
    for (let row = 0; row < this.fallingShape.rows(); row++) {
      for (let column = 0; column < this.fallingShape.columns(); column++) {
        if (this.fallingShape.cellAt(row, column) !== this.EMPTY) {
          this.stationaryBlocks[this.fallingShapeRow + row][this.fallingShapeColumn + column] = this.fallingShape.cellAt(row, column);
        }
      }
    }
    this.fallingShape = null;
  }

  tick() {
    if (this.shapeHitsFloor() || this.shapeHitsAnotherShape()) {
      this.stopFalling();
    } else {
      this.fallingShapeRow += 1;
    }
  }

  hasFalling() {
    return this.fallingShape !== null;
  }

  withinFallingShape(row, column) {
    return this.fallingShapeRow <= row
      && row < this.fallingShapeRow + this.fallingShape.rows()
      && this.fallingShapeColumn <= column
      && column < this.fallingShapeColumn + this.fallingShape.columns();
  }

  fallingCellAt(row, column) {
    if (this.hasFalling() && this.withinFallingShape(row, column)) {
      return this.fallingShape.cellAt(row - this.fallingShapeRow, column - this.fallingShapeColumn);
    }
    return null;
  }

  rows() {
    return this.height;
  };

  columns() {
    return this.width;
  };

  cellAt(row, column) {
    if (row < 0 || row >= this.height || column < 0 || column >= this.width) {
      return this.EMPTY;
    }
    const cell = this.fallingCellAt(row, column);
    return cell ? cell : this.stationaryBlocks[row][column];
  }

}
