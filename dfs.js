import { rows, cols, waitForSeconds } from "./index.js";

// checks for validness of given row and col
function check(row, col, visited) {
  if (col == -1 || row == -1) return false;
  if (row < rows && col < cols) {
    // checking if there is wall at row, col position and if it's already visited
    let wall = parseInt(
      document
        .querySelector(`[row="${row}"][col="${col}"]`)
        .getAttribute("wall")
    );
    if (!wall && !visited[row][col]) return true;
  }
  return false;
}
export const depthFirstSearch = async () => {
  let startBox = document.getElementById("startBox");
  let endBox = document.getElementById("endBox");
  let startRow = parseInt(startBox.getAttribute("row"));
  let startCol = parseInt(startBox.getAttribute("col"));
  let endRow = parseInt(endBox.getAttribute("row"));
  let endCol = parseInt(endBox.getAttribute("col"));
  var visited = new Array(parseInt(rows)).fill(false);
  for (var j = 0; j < rows; j++) {
    visited[j] = new Array(parseInt(cols)).fill(false);
  }
  const stack = [];
  const parentForCell = {};
  const startKey = `${startRow}|${startCol}`;
  const targetKey = `${endRow}|${endCol}`;
  // No parent for startKey
  parentForCell[startKey] = { key: undefined };
  stack.push({
    row: startRow,
    col: startCol,
  });
  const speedSlider = document.querySelector("#speed");
  let timeMultiplier = speedSlider.value;
  speedSlider.addEventListener("change", () => {
    timeMultiplier = speedSlider.value;
  });
  while (stack.length !== 0) {
    const { row, col } = stack.pop();
    const currentKey = `${row}|${col}`;
    // All adjacent vertices of current vertex
    const neighbours = [
      { row: row, col: col - 1 },
      { row: row + 1, col: col },
      { row: row - 1, col: col },
      { row: row, col: col + 1 },
    ];
    // On finding destination exit from loop
    if (currentKey === targetKey) {
      break;
    }
    // Make current vetex as visited
    visited[row][col] = true;
    let nBox = document.querySelector(`[row="${row}"][col="${col}"]`);
    // managing visualization speed
    await waitForSeconds(0.2 / timeMultiplier);
    if (nBox && nBox !== startBox) nBox.classList += " pathSecondary";
    for (let i = 0; i < neighbours.length; i++) {
      let nRow = neighbours[i].row;
      let nCol = neighbours[i].col;
      let key = `${nRow}|${nCol}`;
      //
      if (!check(nRow, nCol, visited)) continue;
      // if key is not present then add it
      if (!(key in parentForCell)) {
        parentForCell[key] = {
          key: currentKey,
        };
      }
      stack.push(neighbours[i]);
    }
    
  }
  if (!(targetKey in parentForCell)) {
    alert("No path Found");
    return;
  }
  // Creating path array which stores path from source to destinatiom
  const path = [];
  let current = targetKey;
  while (current !== startKey) {
    let [cRow, cCol] = current.split("|");
    let currBox = document.querySelector(`[row="${cRow}"][col="${cCol}"]`);
    path.push(currBox);
    current = parentForCell[current].key;
  }
  let [sRow, sCol] = current.split("|");
  let sBox = document.querySelector(`[row="${sRow}"][col="${sCol}"]`);
  path.push(sBox);

  path.forEach(async (box, i) => {
    box.classList.replace("pathSecondary", "pathPrimary");
    let pathLength = path.length;
    if (i > 0 && i < pathLength - 1) box.innerHTML = pathLength - i - 1;
  });
};
