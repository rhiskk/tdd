import { expect } from "chai";
import { diceHandValue } from "../src/diceHandValue.mjs";

describe("The value of a dice hand", () => {
  it("is 106 with a pair of sixes", () => {
    expect(diceHandValue(6, 6)).to.equal(106);
  });

  it("is 105 with a pair of fives", () => {
    expect(diceHandValue(5, 5)).to.equal(105);
  });

  it("is 6 with a high die 6", () => {
    expect(diceHandValue(6, 1)).to.equal(6);
  });

  it("is 2 with a high die 2", () => {
    expect(diceHandValue(2, 1)).to.equal(2);
  });
});
