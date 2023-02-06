import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { ArikaTetromino } from "../src/ArikaTetromino.mjs";

describe("A falling tetrominoe", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  function fallXTimes(times) {
    for (let i = 0; i < times; i++) {
      board.tick();
    }
  }

  function moveAgainstLeftWall() {
    for (let i = 0; i < 3; i++) {
      board.moveLeft();
    }
  }

  function moveAgainstRightWall() {
    for (let i = 0; i < 4; i++) {
      board.moveRight();
    }
  }


  it("can be moved left", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..TTT.....
       ...T......
       ..........
       ..........
       ..........`
    );
  });

  it("can be moved right", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `..........
       ....TTT...
       .....T....
       ..........
       ..........
       ..........`
    );
  });

  it("can be moved down", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...TTT....
       ....T.....
       ..........
       ..........`
    );
  });

  it("cannot be moved left beyond the board", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    moveAgainstLeftWall();
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..........
       TTT.......
       .T........
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved right beyond the board", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    moveAgainstRightWall();
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `..........
       .......TTT
       ........T.
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved down beyond the board", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    fallXTimes(4);
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });

  it("cannot be moved left if there is another in the way", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    moveAgainstLeftWall();
    fallXTimes(10);
    board.drop(ArikaTetromino.T_SHAPE);
    fallXTimes(4);
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       TTTTTT....
       .T..T.....`
    );
  });

  it("cannot be moved right if there is another in the way", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    moveAgainstRightWall();
    fallXTimes(10);
    board.drop(ArikaTetromino.T_SHAPE);
    fallXTimes(3);
    board.moveRight();
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....TTTTTT
       .....T..T.`
    );
  });

  it("cannot be moved down if there is another in the way", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    fallXTimes(10);
    board.drop(ArikaTetromino.T_SHAPE);
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  });

});
