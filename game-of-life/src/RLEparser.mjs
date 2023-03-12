export function decode(rle) {
  const { x, y, pattern } = parseString(rle);
  const array = new Array(y)
    .fill()
    .map(() => new Array(x).fill(true));

  let row = 0;
  let column = 0;
  let count = 1;

  for (let patternIndex = 0; patternIndex < pattern.length; patternIndex++) {
    const char = pattern[patternIndex];
    if (char === '!') break;
    if (char === '$') {
      row++;
      column = 0;
      continue;
    }
    if (!isNaN(char)) {
      count = parseInt(char);
      continue;
    }
    for (let i = 0; i < count; i++) {
      array[row][column] = char === 'o';
      column++;
    }
    count = 1;
  }

  return array;
}

export function encode(array) {
  const x = array[0].length;
  const y = array.length;
  let rlePattern = "";
  for (let i = 0; i < y; i++) {
    let count = 0;
    let previous = "";
    for (let j = 0; j < x; j++) {
      const current = array[i][j];
      if (previous === "") {
        previous = current;
      }
      if (current === previous) count++;
      else {
        rlePattern += (count > 1 ? count : "") + (previous ? 'o' : 'b');
        count = 1;
        previous = current;
      }
    }
    rlePattern += (count > 1 ? count : "")
      + (previous ? 'o' : 'b')
      + (i === y - 1 ? "!" : "$");
  }
  const rle = `x = ${x}, y = ${y}, rule = B3/S23
${rlePattern}`;
  return rle;
}

export function parseString(string) {
  const lines = string.trim().split('\n');
  let x = 0;
  let y = 0;
  let pattern = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line[0] === '#') {
      continue;
    }
    if (line[0] === 'x') {
      const parts = line.split(',');
      x = parseInt(parts[0].split('=')[1].trim());
      y = parseInt(parts[1].split('=')[1].trim());
      continue;
    }
    pattern = line.trim();
  }
  return { x, y, pattern };
}