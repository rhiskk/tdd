import { Grid } from "./Grid.mjs";

export class Board extends Grid {
  width;
  height;
  fallingBlock;
  fallingBlockRow;
  stationaryBlocks;

  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.fallingBlock = null;
    this.stationaryBlocks = Array(height).fill().map(() => Array(width).fill("."));
  }

  toString() {
    return Grid.prototype.toString.call(this);
  }

  hasFallingAt(row, column) {
    return this.hasFalling() && this.fallingBlockRow === row && 1 === column;
  }

  drop(block) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }
    this.fallingBlockRow = 0;
    this.fallingBlock = block;
  }

  blockHitsAnotherBlock() {
    return this.cellAt(this.fallingBlockRow + 1, 1) !== ".";
  }

  blockHitsFloor() {
    return this.fallingBlockRow === this.height - 1;
  }

  stopFalling() {
    this.stationaryBlocks[this.fallingBlockRow][1] = this.fallingBlock.color;
    this.fallingBlock = null;
  }

  tick() {
    if (this.blockHitsFloor() || this.blockHitsAnotherBlock()) {
      this.stopFalling();
    } else {
      this.fallingBlockRow += 1;
    }
  }

  hasFalling() {
    return this.fallingBlock !== null;
  }

  rows() {
    return this.height;
  };

  columns() {
    return this.width;
  };

  cellAt(row, column) {
    if (this.hasFallingAt(row, column)) {
      return this.fallingBlock.color;
    }
    return this.stationaryBlocks[row][column];
  }

}
