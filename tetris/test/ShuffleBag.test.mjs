import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs";
import { ArikaTetromino } from "../src/ArikaTetromino.mjs";

describe('ShuffleBag', () => {

  let bag;
  let items = [];
  const createRandomTetromino = () => {
    const tetrominoes = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    const shape = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
    switch (shape) {
      case 'I':
        return ArikaTetromino.I_SHAPE;
      case 'J':
        return ArikaTetromino.J_SHAPE;
      case 'L':
        return ArikaTetromino.L_SHAPE;
      case 'O':
        return ArikaTetromino.O_SHAPE;
      case 'S':
        return ArikaTetromino.S_SHAPE;
      case 'T':
        return ArikaTetromino.T_SHAPE;
      case 'Z':
        return ArikaTetromino.Z_SHAPE;
      default:
        throw new Error('Unknown tetrominoe shape: ' + shape);
    }
  };
  beforeEach(() => {
    for (let i = 0; i < 100; i++) {
      items.push(createRandomTetromino());
    }
    bag = new ShuffleBag(items);
  });

  it('items are pulled in a different order that they were put in', () => {
    const pulledItems = [];
    for (let i = 0; i < 100; i++) {
      pulledItems.push(bag.pull());
    }
    expect(pulledItems).to.not.deep.equal(items);
  });

  it('items are pulled in a different order after they have been shuffled', () => {
    const pulledItems = [];
    for (let i = 0; i < 100; i++) {
      pulledItems.push(bag.pull());
    }
    const pulledItems2 = [];
    for (let i = 0; i < 100; i++) {
      pulledItems2.push(bag.pull());
    }
    expect(pulledItems).to.not.deep.equal(pulledItems2);
  });

});