import { rows, cols } from "./index.js";

class Algorithm {
  createPath(parentForCell, startKey, targetKey) {
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
  }

  waitForSeconds = (secs) => {
    return new Promise((resolve) => {
      setTimeout(resolve, secs * 1000);
    });
  };

  // checks for validness of given row and col

  check(row, col) {
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
  checkWithVisited(row, col, visited) {
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
}

class depthFirstSearch extends Algorithm {
  depthFirstSearchAlgo = async () => {
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
      await this.waitForSeconds(0.2 / timeMultiplier);
      if (nBox && nBox !== startBox) nBox.classList += " pathSecondary";
      for (let i = 0; i < neighbours.length; i++) {
        let nRow = neighbours[i].row;
        let nCol = neighbours[i].col;
        let key = `${nRow}|${nCol}`;

        if (!this.checkWithVisited(nRow, nCol, visited)) continue;
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

    this.createPath(parentForCell, startKey, targetKey);
  };
}

class breadthFirstSearch extends Algorithm {
  breadthFirstSearchAlgo = async () => {
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
        if (!this.check(nRow, nCol)) {
          continue;
        }
        let nBox = document.querySelector(`[row="${nRow}"][col="${nCol}"]`);
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
        await this.waitForSeconds(0.2 / timeMultiplier);

        if (nBox) nBox.classList += " pathSecondary";
      }
    }
    // console.dir(parentForCell);
    if (!foundDestn) {
      alert("No path found");
      return;
    }

    this.createPath(parentForCell, startKey, targetKey);
  };
}

class astar extends Algorithm {
  // Give heuristic value for current row and col (Manhattan Heuristic)
  heuristic(row, col, endRow, endCol) {
    return Math.abs(row - endRow) + Math.abs(col - endCol);
  }

  // g : cost to move from the starting position to the current position
  // h : estimated cost to move from current positon to final destination
  // f : total cost to move from start to end via current ( g + h)
  astarAlgo = async () => {
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
      f: this.heuristic(startRow, startCol, endRow, endCol),
      g: 0,
    };
    closeSet[startKey] = {
      f: this.heuristic(startRow, startCol, endRow, endCol),
      g: 0,
      key: undefined,
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
        if (openSet[key].f < openSet[lowest].f) lowest = key;
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
      await this.waitForSeconds(0.2 / timeMultiplier);
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

        if (!this.check(nRow, nCol)) continue;
        let gnew = parseInt(closeSet[mainkey].g) + 1;
        if (closeSet[key] == undefined || gnew < closeSet[key].g) {
          closeSet[key] = {
            key: mainkey,
            g: gnew,
            f: gnew + this.heuristic(nRow, nCol, endRow, endCol),
          };
          if (!(key in openSet)) {
            openSet[key] = {
              f: gnew + this.heuristic(nRow, nCol, endRow, endCol),
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
    this.createPath(closeSet, startKey, targetKey);
  };
}

class dijkstra extends Algorithm {
  dijkstraAlgo = async () => {
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
      key: undefined,
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
      await this.waitForSeconds(0.2 / timeMultiplier);
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

        if (!this.check(nRow, nCol)) continue;
        let gnew = parseInt(closeSet[mainkey].g) + 1;
        if (closeSet[key] == undefined || gnew < closeSet[key].g) {
          closeSet[key] = {
            key: mainkey,
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

    this.createPath(closeSet, startKey, targetKey);
  };
}

export const dfsobj = new depthFirstSearch();
export const bfsobj = new breadthFirstSearch();
export const dijkstraobj = new dijkstra();
export const astarobj = new astar();
