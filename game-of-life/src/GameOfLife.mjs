export function countNeighbors(array, x, y) {
  const rows = array.length;
  const columns = array[0].length;
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const row = y + i;
      const column = x + j;
      if (row < 0 || column < 0 || row >= rows || column >= columns) continue;
      if (array[row][column]) count++;
    }
  }
  return count;
}

function extendArray(array) {
  const rows = array.length;
  const columns = array[0].length;
  const extendedArray = [];
  for (let i = 0; i < rows; i++) {
    const originalRow = array[i].slice();
    originalRow.push(false);
    originalRow.unshift(false);
    extendedArray.push(originalRow);
  }
  const deadRow = Array(Math.max(rows, columns) + 2).fill(false);
  extendedArray.push(deadRow);
  extendedArray.unshift(deadRow);
  return extendedArray;
}

function removeDeadRows(array) {
  const rowsWithTrue = array.filter(row => row.includes(true));
  return rowsWithTrue;
}

function removeDeadColumns(array) {
  const falseColumns = (array[0] || [])
    .map((c, i) => array.some(a => a[i] === true));
  const updated = array.map(a => a.filter((_, i) => falseColumns[i]));
  return updated;
}

export function update(array) {
  const extendedArray = extendArray(array);
  const x = extendedArray[0].length;
  const y = extendedArray.length;

  const extendedResult = [];
  for (let i = 0; i < extendedArray.length; i++) {
    extendedResult.push(extendedArray[i].slice());
  }

  for (let row = 0; row < y; row++) {
    for (let column = 0; column < x; column++) {
      const neighbors = countNeighbors(extendedArray, column, row);
      if (extendedArray[row][column]) {
        extendedResult[row][column] = neighbors === 2 || neighbors === 3;
      } else {
        extendedResult[row][column] = neighbors === 3;
      }
    }
  }
  const result = removeDeadColumns(removeDeadRows(extendedResult));
  return result;
}

export function play(array, iterations) {
  let result = array;
  for (let i = 0; i < iterations; i++) {
    result = update(result);
  }
  return result;
}