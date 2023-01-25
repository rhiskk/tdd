import { Grid } from "./Grid.mjs";

export class Board extends Grid {
  width;
  height;
  fallingBlock;
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
    return this.hasFalling() && this.fallingBlock.row === row && this.fallingBlock.column === column;
  }

  drop(block) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }
    this.fallingBlock = block;
  }

  blockHitsAnotherBlock() {
    return this.cellAt(this.fallingBlock.row + 1, this.fallingBlock.column) !== ".";
  }

  blockHitsFloor() {
    return this.fallingBlock.row === this.height - 1;
  }

  stopFalling() {
    this.stationaryBlocks[this.fallingBlock.row][this.fallingBlock.column] = this.fallingBlock.color;
    this.fallingBlock = null;
  }

  tick() {
    if (this.blockHitsFloor() || this.blockHitsAnotherBlock()) {
      this.stopFalling();
    } else {
      this.fallingBlock.tick();
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
