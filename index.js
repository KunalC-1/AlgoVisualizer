// gridContainer.add
class Grid {
  createNode(row, col) {
    let node = document.createElement("div");
    node.setAttribute("class", "box");
    node.setAttribute("row", row);
    node.setAttribute("col", col);
    node.setAttribute("wall", 0);

    node.addEventListener("click", () => {
      if (
        node.classList.contains("box") &&
        node.id !== "startBox" &&
        node.id !== "endBox"
      )
        node.classList.toggle("isWall");
      if (node.getAttribute("wall") == "0") {
        node.setAttribute("wall", 1);
      } else {
        node.setAttribute("wall", 0);
      }
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
      if (this.ismousePressed) {
        // console.log(e.target);

        if (
          e.target.classList.contains("box") &&
          e.target.id !== "startBox" &&
          e.target.id !== "endBox"
        ) {
          e.target.classList.toggle("isWall");
          if (node.getAttribute("wall") == "0") {
            node.setAttribute("wall", 1);
          } else {
            node.setAttribute("wall", 0);
          }
        }
      }
    });
    this.rows = Math.round(gridContainer.offsetHeight / 30) - 3;
    this.cols = Math.round(gridContainer.offsetWidth / 30) - 5;
    // console.log(rows, cols);
    // setting css variables
    gridContainer.style.setProperty("--rows", this.rows);
    gridContainer.style.setProperty("--cols", this.cols);
    gridContainer.innerHTML = "";
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let temp = this.createNode(row, col);
        if (row === 10 && col == 10) {
          let startIcon = document.createElement("i");
          startIcon.setAttribute("class", "bi bi-nut-fill Icon");
          temp.setAttribute("id", "startBox");
          temp.appendChild(startIcon);
        }
        if (row === 10 && col == 30) {
          let endIcon = document.createElement("i");
          endIcon.setAttribute("class", "bi bi-geo-alt-fill Icon");
          temp.setAttribute("id", "endBox");
          temp.appendChild(endIcon);
        }
        gridContainer.appendChild(temp);
      }
    }
  }
}
const mainGrid = new Grid();
mainGrid.createEmptyBoard();
console.log(mainGrid.rows, mainGrid.cols);
