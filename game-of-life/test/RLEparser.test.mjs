import { decode, encode, parseString } from "../src/rleParser.mjs";
import { expect } from "chai";
import { blockArray, blinkerArray, gliderArray } from "./testPatterns.mjs";

describe("RLE parser", () => {
  it("decodes block rle into an array", () => {
    const blockRLE = `#N Block
#C An extremely common 4-cell still life.
#C www.conwaylife.com/wiki/index.php?title=Block
x = 2, y = 2, rule = B3/S23
2o$2o!`;
    const resultArray = decode(blockRLE);
    expect(resultArray).to.deep.equal(blockArray);
  });

  it("parses x, y and pattern of block", () => {
    const blockRLE = `#N Block
#C An extremely common 4-cell still life.
#C www.conwaylife.com/wiki/index.php?title=Block
x = 2, y = 2, rule = B3/S23
2o$2o!`;
    const { x, y, pattern } = parseString(blockRLE);
    expect(x).to.equal(2);
    expect(y).to.equal(2);
    expect(pattern).to.equal('2o$2o!');
  });

  it("parses x, y and pattern of blinker", () => {
    const blinkerRLE = `#N Blinker
  #O John Conway
  #C A period 2 oscillator that is the smallest and most common oscillator.
  #C www.conwaylife.com/wiki/index.php?title=Blinker
  x = 3, y = 1, rule = B3/S23
  3o!`;
    const { x, y, pattern } = parseString(blinkerRLE);
    expect(x).to.equal(3);
    expect(y).to.equal(1);
    expect(pattern).to.equal('3o!');
  });

  it("decodes blinker rle into an array", () => {
    const blinkerRLE = `#N Blinker
  #O John Conway
  #C A period 2 oscillator that is the smallest and most common oscillator.
  #C www.conwaylife.com/wiki/index.php?title=Blinker
  x = 3, y = 1, rule = B3/S23
  3o!`;
    const resultArray = decode(blinkerRLE);
    expect(resultArray).to.deep.equal(blinkerArray);
  });

  it('decodes glider rle into an array', () => {
    const gliderRLE = `#N Glider
#O Richard K. Guy
#C The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.
#C www.conwaylife.com/wiki/index.php?title=Glider
x = 3, y = 3, rule = B3/S23
bob$2bo$3o!`;
    const resultArray = decode(gliderRLE);
    expect(resultArray).to.deep.equal(gliderArray);
  });

  it('encodes a block array into a block rle', () => {
    const expectedRLE = `x = 2, y = 2, rule = B3/S23
2o$2o!`;
    const resultRLE = encode(blockArray);
    expect(resultRLE).to.equal(expectedRLE);
  });

  it('encodes a blinker array into a block rle', () => {
    const expectedRLE = `x = 3, y = 1, rule = B3/S23
3o!`;
    const resultRLE = encode(blinkerArray);
    expect(resultRLE).to.equal(expectedRLE);
  });

  it('encodes a glider array into a glider rle', () => {
    const expectedRLE = `x = 3, y = 3, rule = B3/S23
bob$2bo$3o!`;
    const resultRLE = encode(gliderArray);
    expect(resultRLE).to.equal(expectedRLE);
  });
});