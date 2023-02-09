import { expect } from "chai";
import { parsePeopleCsv } from "../src/parsePeopleCsv.mjs";
import fs from "fs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("When people are parsed from a csv file", () => {

  const folder = "testData";
  const file = "testData/people.csv";
  const pathToFile = "./" + file;
  const people = [
    { firstName: 'Loyd', lastName: 'Forger', gender: 'm' },
    { firstName: 'Anya', lastName: 'Forger', gender: 'f', age: 6 },
    { firstName: 'Yor', lastName: 'Forger', gender: 'f', age: 27 }
  ];
  beforeEach(() => {
    fs.mkdirSync(folder);
    const people = [
      ['Loyd', 'Forger', '', 'Male'],
      ['Anya', 'Forger', '6', 'Female'],
      ['Yor', 'Forger', '27', 'Female'],
    ];
    const csv = people.map(row => row.join(',')).join('\n');
    fs.writeFileSync(file, csv);
  });

  afterEach(() => {
    fs.unlinkSync(pathToFile);
    fs.rmdirSync(folder);
  });

  it("when a valid csv is given people are parsed accordingly", async () => {
    expect(await parsePeopleCsv(pathToFile)).to.deep.equal(people);
  });

});
