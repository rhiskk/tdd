import { Grid } from "./Grid.mjs";

export class Board extends Grid {
  width;
  height;
  fallingShape;
  fallingShapeRow;
  fallingShapeColumn;
  stationaryShapes;

  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.fallingShape = null;
    this.stationaryShapes = Array(height).fill().map(() => Array(width).fill("."));
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
    return this.cellAt(this.fallingShapeRow + 1, this.fallingShapeColumn) !== ".";
  }

  shapeHitsFloor() {
    return this.fallingShapeRow === this.height - 1;
  }

  stopFalling() {
    this.stationaryShapes[this.fallingShapeRow][1] = this.fallingShape.cellAt(0, 0);
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
    const cell = this.fallingCellAt(row, column);
    return cell ? cell : this.stationaryShapes[row][column];
  }

}
