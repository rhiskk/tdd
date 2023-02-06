import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("A falling tetrominoe", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  function moveDownXtimes(x) {
    for (let i = 0; i < x; i++) {
      board.tick();
    }
  }

  it("can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be rotated left if there is no room to rotate", () => {
    board.drop(Tetromino.T_SHAPE);
    moveDownXtimes(5);
    board.drop(Tetromino.T_SHAPE);
    moveDownXtimes(2);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  });

  it("cannot be rotated right if there is no room to rotate", () => {
    board.drop(Tetromino.T_SHAPE);
    moveDownXtimes(5);
    board.drop(Tetromino.T_SHAPE);
    moveDownXtimes(2);
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  });

});