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
        if (this.block && i === 0 && j === 1) {
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
    this.block = block;
  }

}
