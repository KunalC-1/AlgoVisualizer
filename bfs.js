import { rows, cols, waitForSeconds } from "./index.js";
export const breadthFirstSearch = async () => {
  const queue = [];
  const parentForCell = {};
  const startBox = document.getElementById("startBox");
  const endBox = document.getElementById("endBox");
  const startRow = startBox.getAttribute("row");
  const startCol = startBox.getAttribute("col");
  const endRow = endBox.getAttribute("row");
  const endCol = endBox.getAttribute("col");
  const targetKey = `${endRow}|${endCol}`;
  let foundDestn = false;
  queue.push({
    row: parseInt(startRow),
    col: parseInt(startCol),
  });
  const startKey = `${startRow}|${startCol}`;
  // start key doesnt have an parent
  parentForCell[startKey] = { key: undefined };
  const speedSlider = document.querySelector("#speed");
  let timeMultiplier = speedSlider.value;
  speedSlider.addEventListener("change", () => {
    // console.log(speedSlider.value);
    timeMultiplier = speedSlider.value;
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
    if (currentKey === targetKey) {
      foundDestn = true;
      break;
    }
    for (let i = 0; i < neighbours.length; i++) {
      let nRow = neighbours[i].row;
      let nCol = neighbours[i].col;
      let key = `${nRow}|${nCol}`;
      // check if out of bound
      if (nRow < 0 || nRow >= rows) {
        continue;
      }
      if (nCol < 0 || nCol >= cols) {
        continue;
      }

      let nBox = document.querySelector(`[row="${nRow}"][col="${nCol}"]`);
      // console.log(`[row="${nRow}"][col="${nCol}"]`);
      if (nBox && nBox.getAttribute("wall") === "1") {
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
      if (key === targetKey) {
        break;
      }
      await waitForSeconds(0.2 / timeMultiplier);

      if (nBox) nBox.classList += " pathSecondary";
    }
  }
  // console.dir(parentForCell);
  if (!foundDestn) {
    alert("No path found");
    return;
  }
  const path = [];
  let current = targetKey;
  while (current !== startKey) {
    let [cRow, cCol] = current.split("|");
    let currBox = document.querySelector(`[row="${cRow}"][col="${cCol}"]`);
    // console.log(cRow, cCol, currBox);
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
