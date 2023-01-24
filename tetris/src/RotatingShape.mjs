export class RotatingShape {
  shape;

  constructor(shape) {
    this.shape = shape.replace(/^\s+/gm, '');
  }

  toString() {
    return this.shape + "\n";
  }

  rotateRight() {
    const rows = this.shape.split("\n");
    const columns = rows[0];
    const rotated = columns.split("").map((_, column) => {
      return rows.map(row => row[column]).reverse().join("");
    }).join("\n");

    return new RotatingShape(rotated);
  }

}