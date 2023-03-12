import fs from 'fs';
import { decode, encode } from './RLEparser.mjs';
import { play } from './GameOfLife.mjs';
const args = process.argv.slice(2);
const path = args[0];
const iterations = parseInt(args[1]);
const fileString = fs.readFileSync(path, 'utf8');
const array = decode(fileString);
const result = play(array, iterations);
const output = encode(result);

console.log(output);