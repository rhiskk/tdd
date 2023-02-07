import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { RotatingShape } from "../src/RotatingShape.mjs";

describe("Board", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  function fallXTimes(x) {
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

  const shapeI = new RotatingShape(
    `.....
     IIIII
     .....
     .....
     .....`
  );

  const shapeI9 = new RotatingShape(
    `.........
     IIIIIIIII
     .........
     .........
     .........
     .........
     .........
     .........
     .........`
  );

  const block = new RotatingShape(`x`);

  it("clears the bottom line when it is filled", () => {
    board.drop(shapeI);
    moveLeftXtimes(5);
    fallXTimes(5);
    board.drop(shapeI);
    moveRightXtimes(5);
    fallXTimes(5);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("drops the lines above the cleared line down", () => {
    board.drop(shapeI);
    moveLeftXtimes(10);
    fallXTimes(5);
    board.drop(shapeI);
    moveLeftXtimes(10);
    fallXTimes(5);
    board.drop(shapeI);
    console.log(board.toString());
    moveRightXtimes(10);
    fallXTimes(5);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       IIIII.....`
    );
  });

  it("clears a non bottom line when it is filled", () => {
    board.drop(shapeI9);
    fallXTimes(5);
    board.drop(shapeI);
    moveRightXtimes(5);
    fallXTimes(5);
    board.drop(shapeI);
    moveLeftXtimes(5);
    fallXTimes(5);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       IIIIIIIII.`
    );
  });

  it("drops the lines above the cleared non bottom line down", () => {
    board.drop(shapeI9);
    fallXTimes(5);
    board.drop(shapeI9);
    moveRightXtimes(1);
    fallXTimes(5);
    board.drop(shapeI);
    moveRightXtimes(5);
    fallXTimes(5);
    board.drop(block);
    moveLeftXtimes(5);
    fallXTimes(5);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .....IIIII
       IIIIIIIII.`
    );
  });

});