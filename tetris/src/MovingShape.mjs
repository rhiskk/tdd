import { Grid } from "./Grid.mjs";

export class MovingShape extends Grid {
  #shape;
  #row;
  #column;

  constructor(shape, row, column) {
    super();
    this.#shape = shape;
    this.#row = row;
    this.#column = column;
  }

  rows() {
    return this.#shape.rows();
  }

  columns() {
    return this.#shape.columns();
  }

  cellAt(row, column) {
    return this.#shape.cellAt(row, column);
  }

  toString() {
    return this.#shape.toString();
  }

  moveLeft() {
    return new MovingShape(this.#shape, this.#row, this.#column - 1);
  }

  moveRight() {
    return new MovingShape(this.#shape, this.#row, this.#column + 1);
  }

  moveDown() {
    return new MovingShape(this.#shape, this.#row + 1, this.#column);
  }

  rotateLeft() {
    return new MovingShape(this.#shape.rotateLeft(), this.#row, this.#column);
  }

  rotateRight() {
    return new MovingShape(this.#shape.rotateRight(), this.#row, this.#column);
  }

  row() {
    return this.#row;
  }

  column() {
    return this.#column;
  }

}