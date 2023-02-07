import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { RotatingShape } from "../src/RotatingShape.mjs";

describe("Board", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 10);
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

  it("sends out a notification when a line is cleared", () => {
    let calls = 0;
    const callback = () => {
      calls++;
    };
    board.subscribe(callback);
    board.drop(shapeI);
    moveLeftXtimes(5);
    fallXTimes(10);
    board.drop(shapeI);
    moveRightXtimes(5);
    fallXTimes(10);
    expect(calls).to.equal(1);
  });

  it("sends out the number of lines cleared in the notification", () => {
    let linesCleared = 0;
    const callback = (lines) => {
      linesCleared = lines;
    };
    board.subscribe(callback);
    board.drop(shapeI);
    moveLeftXtimes(5);
    fallXTimes(10);
    board.drop(shapeI);
    moveRightXtimes(5);
    fallXTimes(10);
    expect(linesCleared).to.equal(1);
  });

  it("sends out the number of lines cleared in the notification with multiple lines", () => {
    let linesCleared = 0;
    const callback = (lines) => {
      linesCleared = lines;
    };
    board.subscribe(callback);

    board.drop(shapeI9);
    moveLeftXtimes(10);
    fallXTimes(10);

    board.drop(shapeI9);
    moveLeftXtimes(10);
    fallXTimes(10);

    board.drop(shapeI9);
    moveLeftXtimes(10);
    fallXTimes(10);

    board.drop(shapeI);
    board.rotateLeft();
    moveRightXtimes(10);
    fallXTimes(10);

    expect(linesCleared).to.equal(3);
  });
});