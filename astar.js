import { rows, cols } from "./index.js";
import { waitForSeconds } from "./bfs.js";
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

function heuristic(row, col, endRow, endCol) {
  return Math.abs(row - endRow) + Math.abs(col - endCol);
}
export const astar = async () => {
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
  const startKey = `${startRow}|${startCol}`;
  const targetKey = `${endRow}|${endCol}`;
  const cellDetails = {};
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let key = `${i}|${j}`;
      cellDetails[key] = {
        f: Number.MAX_VALUE,
        g: Number.MAX_VALUE,
        h: Number.MAX_VALUE,
        parent: undefined,
      };
    }
  }
  cellDetails[startKey].f = 0;
  cellDetails[startKey].g = 0;
  cellDetails[startKey].h = 0;
  cellDetails[startKey].parent = startKey;
  //   console.log(cellDetails[startKey]);

  const openSet = [];
  let node = {
    f: 0,
    row: startRow,
    col: startCol,
  };
  openSet.push(node);
  let foundDestn = false;
  const speedSlider = document.querySelector("#speed");
  let timeMultiplier = speedSlider.value;
  speedSlider.addEventListener("change", () => {
    timeMultiplier = speedSlider.value;
  });
  while (openSet.length !== 0) {
    // console.log("hello");
    var lowest = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowest].f) lowest = i;
    }
    const { row, col } = openSet[lowest];
    openSet.splice(lowest, 1);

    //   console.log(row,col);
    let mainkey = `${row}|${col}`;
    visited[row][col] = true;
    let nBox = document.querySelector(`[row="${row}"][col="${col}"]`);
    // managing visualization speed
    await waitForSeconds(0.2 / timeMultiplier);
    if (nBox && nBox !== startBox) nBox.classList += " intermediatePath";
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
      if (!check(nRow, nCol, visited)) continue;
      if (key == targetKey) {
        // console.log("found it");
        cellDetails[key].parent = mainkey;
        foundDestn = true;
        break;
      }
      let gnew = parseInt(cellDetails[mainkey].g) + 1;
      //   if(cellDetails[key].g <= gnew) continue;
      let hnew = heuristic(nRow, nCol, endRow, endCol);
      let fnew = gnew + hnew;
      let node = {
        f: fnew,
        row: nRow,
        col: nCol,
      };
      if (cellDetails[key].f == Number.MAX_VALUE || cellDetails[key].f > fnew) {
        openSet.push(node);
        cellDetails[key].f = fnew;
        cellDetails[key].g = gnew;
        cellDetails[key].h = hnew;
        cellDetails[key].parent = mainkey;
        // else
        // console.log("Already there");
      }
    }
    await waitForSeconds(0.2 / timeMultiplier);
    if (nBox && nBox !== startBox)
      nBox.classList.replace("intermediatePath", "pathSecondary");
    if (foundDestn) break;
  }
  if (!foundDestn) {
    alert("No path found");
    return;
  }
  const path = [];
  let current = targetKey;
  while (current !== startKey) {
    let [cRow, cCol] = current.split("|");
    let currBox = document.querySelector(`[row="${cRow}"][col="${cCol}"]`);
    path.push(currBox);
    current = cellDetails[current].parent;
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
