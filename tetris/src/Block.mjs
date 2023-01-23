export class Block {
  color;

  constructor(color) {
    this.color = color;
    this.row = 0;
    this.column = 1;
  }

  tick() {
    this.row += 1;
  }
}
