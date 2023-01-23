export class Board {
  width;
  height;
  fallingBlock;
  stationaryBlocks;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.fallingBlock = null
    this.stationaryBlocks = Array(height).fill().map(() => Array(width).fill("."));
  }

  toString() {
    let board = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        board += this.blockAt(i, j);
      }
      board += "\n";
    }
    return board;
  }

  blockAt(row, column) {
    if (this.hasFallingAt(row, column)) {
      return this.fallingBlock.color;
    }
    return this.stationaryBlocks[row][column];
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

  blockUnderIsEmpty(block) {
    return this.blockAt(block.row + 1, block.column) === ".";
  }

  tick() {
    if (this.fallingBlock.row === this.height - 1 || !this.blockUnderIsEmpty(this.fallingBlock)) {
      this.stationaryBlocks[this.fallingBlock.row][this.fallingBlock.column] = this.fallingBlock.color;
      this.fallingBlock = null;
    } else {
      this.fallingBlock.tick();
    }
  }

  hasFalling() {
    return this.fallingBlock !== null;
  }

}
