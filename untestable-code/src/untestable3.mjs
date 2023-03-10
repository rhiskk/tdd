import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

/*
The function parsePeopleCsv() depends on a file which makes it hard to test.
Tests have to create a file on the filesystem and then delete it after the test.
*/

export async function parsePeopleCsv(filePath) {
  const csvData = await readFile(filePath, { encoding: "utf8" });
  const records = parse(csvData, {
    skip_empty_lines: true,
    trim: true,
  });
  return records.map(([firstName, lastName, age, gender]) => {
    const person = {
      firstName,
      lastName,
      gender: gender.charAt(0).toLowerCase(),
    };
    if (age !== "") {
      person.age = parseInt(age);
    }
    return person;
  });
}
