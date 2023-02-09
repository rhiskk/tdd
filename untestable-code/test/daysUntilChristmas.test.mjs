import { expect } from "chai";
import { daysUntilChristmas } from "../src/DaysUntilChristmas.mjs";

describe("Days until Christmas", () => {
  it("one day until christmas day in 24.12.2022", () => {
    const christmasEve = new Date(2022, 12 - 1, 24);
    expect(daysUntilChristmas(christmasEve)).to.equal(1);
  });

  it("0 days until christmas day in 25.12.2022", () => {
    const christmasDay = new Date(2022, 12 - 1, 25);
    expect(daysUntilChristmas(christmasDay)).to.equal(0);
  });

  it("364 days until christmas day in 26.12.2022", () => {
    const boxingDay = new Date(2022, 12 - 1, 26);
    expect(daysUntilChristmas(boxingDay)).to.equal(364);
  });

  it("184 days until christmas day in 24.06.2023", () => {
    const midSummer = new Date(2023, 6 - 1, 24);
    expect(daysUntilChristmas(midSummer)).to.equal(184);
  });

  it("319 days until christmas day in 9.02.2023", () => {
    const today = new Date(2023, 2 - 1, 9);
    expect(daysUntilChristmas(today)).to.equal(319);
  });

});
