import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { ArikaTetromino } from "../src/ArikaTetromino.mjs";

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

  function moveLeftXtimes(x) {
    for (let i = 0; i < x; i++) {
      board.moveLeft();
    }
  }

  function moveRightXtimes(x) {
    for (let i = 0; i < x; i++) {
      board.moveRight();
    }
  }

  it("can be rotated left", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("can be rotated right", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be rotated left if there is no room to rotate", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    moveDownXtimes(5);
    board.drop(ArikaTetromino.I_SHAPE);
    moveDownXtimes(2);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ...IIII...
       ...TTT....
       ....T.....`
    );
  });

  it("cannot be rotated right if there is no room to rotate", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    moveDownXtimes(5);
    board.drop(ArikaTetromino.I_SHAPE);
    moveDownXtimes(2);
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ...IIII...
       ...TTT....
       ....T.....`
    );
  });

  it("I shape can wall kick left wall", () => {
    board.drop(ArikaTetromino.I_SHAPE);
    board.rotateLeft();
    moveLeftXtimes(5);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
       IIII......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("I shape can wall kick right wall", () => {
    board.drop(ArikaTetromino.I_SHAPE);
    board.rotateRight();
    moveRightXtimes(10);
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
       ......IIII
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("L shape can wall kick left wall", () => {
    board.drop(ArikaTetromino.L_SHAPE);
    board.rotateRight();
    moveLeftXtimes(5);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
       LLL.......
       L.........
       ..........
       ..........
       ..........`
    );
  });

  it("J shape can wall kick right wall", () => {
    board.drop(ArikaTetromino.J_SHAPE);
    board.rotateLeft();
    moveRightXtimes(5);
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
       .......JJJ
       .........J
       ..........
       ..........
       ..........`
    );
  });

});