export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let board = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.block && i === this.block.row && j === this.block.column) {
          board += this.block.color;
        } else {
        board += ".";
        }
      }
      board += "\n";
    }
    return board;
  }

  drop(block) {
    if (this.block) {
      throw new Error("already falling");
    }
    this.block = block;
  }

  tick() {
    this.block.tick();
  }

}
