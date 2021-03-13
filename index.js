// gridContainer.add
class Grid {
  createNode() {
    let node = document.createElement("div");
    node.setAttribute("class", "box");
    node.addEventListener("click", () => {
      node.classList.toggle("isWall");
    });
    return node;
  }
  ismousePressed = false;
  createEmptyBoard() {
    const gridContainer = document.querySelector(".grid-container");
    //   console.log(gridContainer.offsetWidth, gridContainer.offsetHeight);
    //   divided by 30 since each sqaure is 30px*30px
    gridContainer.addEventListener("mousedown", () => {
      this.ismousePressed = true;
    });
    gridContainer.addEventListener("mouseup", () => {
      this.ismousePressed = false;
    });
    gridContainer.addEventListener("mouseover", (e) => {
      // console.log(e.target);
      if (this.ismousePressed) {
        if (e.target.classList.contains("box")) {
          e.target.classList.toggle("isWall");
        }
      }
    });
    let rows = Math.round(gridContainer.offsetHeight / 30) - 3;
    let cols = Math.round(gridContainer.offsetWidth / 30) - 5;
    console.log(rows, cols);
    let rowsize = rows;
    let colsize = cols;
    // setting css variables
    gridContainer.style.setProperty("--rows", rows);
    gridContainer.style.setProperty("--cols", cols);
    gridContainer.innerHTML = "";
    for (let row = 0; row < rowsize; row++) {
      for (let col = 0; col < colsize; col++) {
        let temp = this.createNode(row, col);
        gridContainer.appendChild(temp);
      }
    }
  }
}
const mainGrid = new Grid();
mainGrid.createEmptyBoard();
