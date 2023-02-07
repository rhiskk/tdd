import { expect } from "chai";
import { Scoring } from "../src/Scoring.mjs";

describe('Score', () => {

  class Observable {
    constructor() {
      this.observers = [];
    }
    subscribe(observer) {
      this.observers.push(observer);
    }
    notify(data) {
      this.observers.forEach((observer) => observer(data));
    }
  }

  let scoring;
  let board;
  beforeEach(() => {
    board = new Observable();
    scoring = new Scoring(board);
  });

  function setLevel(level) {
    for (let i = 0; i < level; i++) {
      scoring.nextLevel();
    }
  }

  it('is 0 at start', () => {
    expect(scoring.score()).to.equal(0);
  });

  it('is 40 after 1 line has been cleared at level 0', () => {
    board.notify(1);
    expect(scoring.score()).to.equal(40);
  });

  it('is 100 after 2 lines have been cleared at level 0', () => {
    board.notify(2);
    expect(scoring.score()).to.equal(100);
  });

  it('is 900 after 3 lines have been cleared at level 1', () => {
    setLevel(1);
    board.notify(3);
    expect(scoring.score()).to.equal(600);
  });

  it('is 3600 after 4 lines have been cleared at level 2', () => {
    setLevel(2);
    board.notify(4);
    expect(scoring.score()).to.equal(3600);
  });

  it('is 12000 after 4 lines have been cleared at level 1', () => {
    setLevel(9);
    board.notify(4);
    expect(scoring.score()).to.equal(12000);
  });
});