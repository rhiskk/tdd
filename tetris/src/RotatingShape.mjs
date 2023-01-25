import { Grid } from "./Grid.mjs";

export class RotatingShape extends Grid {
  blocks;

  constructor(shape) {
    super();
    if (typeof shape !== "string") {
      this.blocks = shape;
    } else {
      this.blocks = this.toBlocks(shape);
    }
  }

  toBlocks(shape) {
    shape = shape.replace(/^\s+/gm, '');
    const rows = shape.split("\n");
    const n = rows.length;
    const blocks = [];
    for (let i = 0; i < n; i++) {
      blocks[i] = [];
      for (let j = 0; j < n; j++) {
        blocks[i][j] = rows[i][j];
      }
    }

    return blocks;
  }

  toString() {
    return Grid.prototype.toString.call(this);
  }

  rotateRight() {
    const rotated = this.blocks.map((_, column) => {
      return this.blocks.map(row => row[column]).reverse();
    });

    return new RotatingShape(rotated);
  }

  rotateLeft() {
    const rotated = this.blocks.map((_, column) => {
      return this.blocks.map(row => row[column]);
    }).reverse();

    return new RotatingShape(rotated);
  }

  rows() {
    return this.blocks.length;
  };

  columns() {
    return this.blocks[0].length;
  };

  cellAt(row, column) {
    return this.blocks[row][column];
  };

}