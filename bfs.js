import { rows, cols } from "./index.js";

function breadthFirstSearch() {
  const queue = [];
  const parentForCell = {};
  const startBox = document.getElementById("startBox");
  const endBox = document.getElementById("endBox");
  const startRow = startBox.getAttribute("row");
  const startCol = startBox.getAttribute("col");
  const endRow = endBox.getAttribute("row");
  const endCol = endBox.getAttribute("col");
  queue.push({
    row: parseInt(startRow),
    col: parseInt(startCol),
  });
  while (queue.length > 0) {
    //   dequeue from queue
    const { row, col } = queue.shift();
    const currentKey = `${row}|${col}`;
    const neighbours = [
      { row: row - 1, col },
      { row: row, col: col - 1 },
      { row: row + 1, col },
      { row, col: col + 1 },
    ];
    for (let i = 0; i < neighbours.length; i++) {
      let nRow = neighbours[i].row;
      let nCol = neighbours[i].col;
      let key = `${nRow}|${nCol}`;
      // check if out of bound
      if (nRow < 0 || nRow > rows) {
        continue;
      }
      if (nCol < 0 || nCol > cols) {
        continue;
      }
      if (key in parentForCell) {
        //   check if it is visited
        continue;
      }
      //   if it is not already visited
      // const current=document
      parentForCell[key] = {
        key: currentKey,
      };
      queue.push(neighbours[i]);
    }
  }
  // console.dir(parentForCell);
  const path = [];
  const targetKey = `${endRow}|${endCol}`;
  const startKey = `${startRow}|${startCol}`;
  let currentKey = targetKey;
  while (currentKey !== startKey) {
    let [cRow, cCol] = currentKey.split("|");
    let currBox = document.querySelector(`[row="${cRow}"][col="${cCol}"]`);
    // console.log(parentForCell[currentKey].key);
    path.push(currBox);
    currentKey = parentForCell[currentKey].key;
  }
  path.forEach((box) => {
    // box.style.background = "purple";
  });
}
breadthFirstSearch();
