// gridContainer.add
class Grid {
  createNode(row, col) {
    let node = document.createElement("div");
    node.setAttribute("class", "box");
    node.setAttribute("row", row);
    node.setAttribute("col", col);
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
    // console.log(rows, cols);
    // setting css variables
    gridContainer.style.setProperty("--rows", rows);
    gridContainer.style.setProperty("--cols", cols);
    gridContainer.innerHTML = "";
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let temp = this.createNode(row, col);
        if (row === 10 && col == 10) {
          let startIcon = document.createElement("i");
          startIcon.setAttribute("class", "bi bi-nut-fill Icon");
          temp.appendChild(startIcon);
        }
        if (row === 30 && col == 30) {
          let endIcon = document.createElement("i");
          endIcon.setAttribute("class", "bi bi-geo-alt-fill Icon");
          temp.appendChild(endIcon);
        }
        gridContainer.appendChild(temp);
      }
    }
  }
}
const mainGrid = new Grid();
mainGrid.createEmptyBoard();
