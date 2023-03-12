import { expect } from "chai";
import { blinkerArray, blockArray, gliderArray } from "./testPatterns.mjs";
import { countNeighbors, update } from "../src/GameOfLife.mjs";

describe("Game of Life", () => {
  describe("countNeighbors", () => {
    it("counts the number of live neighbors in a block", () => {
      const neighbors = countNeighbors(blockArray, 0, 0);
      expect(neighbors).to.equal(3);
    });

    it("counts the number of live neighbors in a square blinker", () => {
      const squareBlinker = [
        [false, false, false],
        [true, true, true],
        [false, false, false]
      ];
      const neighbors = countNeighbors(squareBlinker, 0, 1);
      expect(neighbors).to.equal(1);
    });

    it("counts the number of live neighors in a glider", () => {
      const neighbors = countNeighbors(gliderArray, 1, 1);
      expect(neighbors).to.equal(5);
    });
  });

  describe("update", () => {
    it("updates the state of a block shape", () => {
      const updated = update(blockArray);
      expect(updated).to.deep.equal(blockArray);
    });

    it("updates the state of a blinker shape", () => {
      const expected = [
        [true],
        [true],
        [true]
      ];
      const updated = update(blinkerArray);
      expect(updated).to.deep.equal(expected);
    });

    it("updates the state of a glider shape", () => {
      const expected = [
        [true, false, true],
        [false, true, true],
        [false, true, false]
      ];
      const updated = update(gliderArray);
      expect(updated).to.deep.equal(expected);
    });
  });
});