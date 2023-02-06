import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { ArikaTetromino } from "../src/ArikaTetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("start from the middle", () => {
    board.drop(ArikaTetromino.T_SHAPE);

    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("stop when they hit the bottom", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });

  it("stop when they land on another block", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(ArikaTetromino.T_SHAPE);
    fallToBottom(board);
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
