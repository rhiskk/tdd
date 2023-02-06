import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("A falling tetrominoe", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  function fallToBottom(board) {
    for (let i = 0; i < 4; i++) {
      board.tick();
    }
  }

  function fallToBottomAndStop(board) {
    fallToBottom(board);
    board.tick();
  }

  function moveAgainstLeftWall(board) {
    for (let i = 0; i < 3; i++) {
      board.moveLeft();
    }
  }

  function moveAgainstRightWall(board) {
    for (let i = 0; i < 4; i++) {
      board.moveRight();
    }
  }


  it("can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    moveAgainstLeftWall(board);
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    moveAgainstRightWall(board);
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved down beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  it("cannot be moved left if there is another in the way", () => {
    board.drop(Tetromino.T_SHAPE);
    moveAgainstLeftWall(board);
    fallToBottomAndStop(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .T..T.....
       TTTTTT....`
    );
  });

  it("cannot be moved right if there is another in the way", () => {
    board.drop(Tetromino.T_SHAPE);
    moveAgainstRightWall(board);
    fallToBottomAndStop(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.moveRight();
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .....T..T.
       ....TTTTTT`
    );
  });

  it("cannot be moved down if there is another in the way", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottomAndStop(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.moveDown();
    board.moveDown();
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
