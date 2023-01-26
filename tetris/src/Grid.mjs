export class Grid {
  EMPTY = ".";
  rows() { };
  columns() { };
  cellAt(row, column) { };

  toString() {
    let gridString = "";
    for (let row = 0; row < this.rows(); row++) {
      for (let column = 0; column < this.columns(); column++) {
        gridString += this.cellAt(row, column);
      }
      gridString += "\n";
    }
    return gridString;
  }
}