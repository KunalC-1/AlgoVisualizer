import { rows, cols, waitForSeconds } from "./index.js";

// checks for validness of given row and col
function checkn(row, col) {
  if (col == -1 || row == -1) return false;
  if (row < rows && col < cols) {
    // checking if there is wall at row, col position
    let wall = parseInt(
      document
        .querySelector(`[row="${row}"][col="${col}"]`)
        .getAttribute("wall")
    );
    if (!wall) return true;
  }
  return false;
}

// g : cost to move from the starting position to the current position

export const dijkstra = async () => {
  let startBox = document.getElementById("startBox");
  let endBox = document.getElementById("endBox");
  let startRow = parseInt(startBox.getAttribute("row"));
  let startCol = parseInt(startBox.getAttribute("col"));
  let endRow = parseInt(endBox.getAttribute("row"));
  let endCol = parseInt(endBox.getAttribute("col"));

  const startKey = `${startRow}|${startCol}`;
  const targetKey = `${endRow}|${endCol}`;
  const closeSet = {};

  const openSet = {};
  openSet[startKey] = {
    g: 0,
  };
  closeSet[startKey] = {
    g: 0,
    parent: undefined,
  };

  let foundDestn = false;
  const speedSlider = document.querySelector("#speed");
  let timeMultiplier = speedSlider.value;
  speedSlider.addEventListener("change", () => {
    timeMultiplier = speedSlider.value;
  });
  // console.log(Object.keys(openSet).length === 0);
  while (Object.keys(openSet).length !== 0) {
    var lowest = Object.keys(openSet)[0];
    for (var key in openSet) {
      if (openSet[key].g < openSet[lowest].g) lowest = key;
    }
    if (lowest === targetKey) {
      foundDestn = true;
      break;
    }
    let [row, col] = lowest.split("|");
    row = parseInt(row);
    col = parseInt(col);
    delete openSet[lowest];
    let mainkey = lowest;
    let nBox = document.querySelector(`[row="${row}"][col="${col}"]`);
    // managing visualization speed
    await waitForSeconds(0.2 / timeMultiplier);
    if (nBox && nBox !== startBox) nBox.classList += " pathSecondary";
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

      if (!checkn(nRow, nCol)) continue;
      let gnew = parseInt(closeSet[mainkey].g) + 1;
      if (closeSet[key] == undefined || gnew < closeSet[key].g) {
        closeSet[key] = {
          parent: mainkey,
          g: gnew,
        };
        if (!(key in openSet)) {
          openSet[key] = {
            g: gnew,
          };
        }
      }
    }
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
    current = closeSet[current].parent;
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
