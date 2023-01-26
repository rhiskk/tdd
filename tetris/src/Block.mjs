import { Grid } from './Grid.mjs';
export class Block extends Grid {
  color;

  constructor(color) {
    super();
    this.color = color;
  }

  rows() {
    return 1;
  }

  columns() {
    return 1;
  }

  cellAt(row, column) {
    return this.color;
  }

}
