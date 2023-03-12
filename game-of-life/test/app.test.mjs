import { spawnSync } from 'child_process';
import { expect } from 'chai';
describe("app", () => {
  it("outputs the correct result for blinker and 1 iteration", () => {
    const path = 'test/files/blinker.rle';
    const expected = `x = 1, y = 3, rule = B3/S23
o$o$o!`;
    const result = spawnSync('node', ['src/app.mjs', path, 1]);
    expect(result.status).to.equal(0);
    expect(result.stdout.toString().trim()).to.equal(expected);
  });

  it('outputs the correct result fot glider and 2 iterations', () => {
    const path = 'test/files/glider.rle';
    const expected = `x = 3, y = 3, rule = B3/S23
2bo$obo$b2o!`;
    const result = spawnSync('node', ['src/app.mjs', path, 2]);
    expect(result.status).to.equal(0);
    expect(result.stdout.toString().trim()).to.equal(expected);
  });
});