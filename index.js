// gridContainer.add
import { breadthFirstSearch } from "./bfs.js";
import { depthFirstSearch } from "./dfs.js";
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
    //   console.log(gridContainerr.offsetWidth, gridContainer.offsetHeight);
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
          if (e.target.getAttribute("wall") == "0") {
            e.target.setAttribute("wall", 1);
          } else {
            e.target.setAttribute("wall", 0);
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
          startIcon.setAttribute("draggable", "true");
          temp.setAttribute("id", "startBox");
          temp.appendChild(startIcon);
        }
        if (row === 10 && col == 30) {
          let endIcon = document.createElement("i");
          endIcon.setAttribute("class", "bi bi-geo-alt-fill Icon");
          endIcon.setAttribute("draggable", "true");
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

const Icons = document.querySelectorAll(".bi.Icon");
const boxes = document.querySelectorAll(".box");
Icons.forEach((Icon) => {
  Icon.addEventListener("dragstart", (e) => {
    Icon.classList.add("dragging");
    let parentBox = e.target.parentElement;
    parentBox.removeAttribute("id");
  });
  Icon.addEventListener("dragend", () => {
    Icon.classList.remove("dragging");
    // console.log("dragend", e.target);
  });
});
boxes.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
    mainGrid.ismousePressed = false;
  });
});
boxes.forEach((box) => {
  box.addEventListener("drop", (e) => {
    // e.preventDefault();
    // console.log(e.target);
    const currentlyDragging = document.querySelector(".dragging");
    box.appendChild(currentlyDragging);
    if (currentlyDragging.classList.contains("bi-nut-fill"))
      box.setAttribute("id", "startBox");
    else if (currentlyDragging.classList.contains("bi-geo-alt-fill"))
      box.setAttribute("id", "endBox");
    mainGrid.ismousePressed = false;
  });
});

const algoDropdown = document.querySelector(".algoDropdown");
const algoDropdown_menu = algoDropdown.querySelector(".algoDropdown-menu");
const listItems = algoDropdown_menu.querySelectorAll(".algoDropdown-menu li");

const startButton = document.querySelector("#start");
const reloadButton = document.querySelector("#reload");
const resetButton = document.querySelector("#reset");
function resetFunction() {
  const boxes1 = document.getElementsByClassName("pathSecondary");
  const boxes2 = document.getElementsByClassName("pathPrimary");
  while (boxes1[0]) {
    boxes1[0].classList.remove("pathSecondary");
  }
  while (boxes2[0]) {
    boxes2[0].innerHTML = "";
    boxes2[0].classList.remove("pathPrimary");
  }
}
resetButton.addEventListener("click", resetFunction);
reloadButton.addEventListener("click", () => {
  mainGrid.createEmptyBoard();
});
algoDropdown.addEventListener("click", function () {
  algoDropdown_menu.style.transition = "all 0.5s ease-in-out";
  if (algoDropdown_menu.style.height == "140px")
    algoDropdown_menu.style.height = "0px";
  else algoDropdown_menu.style.height = "140px";
  algoDropdown.classList.toggle("active");
});
listItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    let input = document.getElementById("algo");
    algoDropdown.querySelector("span").innerHTML = item.innerText;
    input.value = item.getAttribute("id");
  });
});
startButton.addEventListener("click", () => {
  let algoDropdown = document.getElementById("algo");
  resetFunction();
  switch (algoDropdown.value) {
    case "none":
      alert("Please select an algorithm");
      break;
    case "DFS":
      depthFirstSearch();
      break;
    case "BFS":
      breadthFirstSearch();
      break;
    case "Dikjstra":
      alert("Developer is too lazy to complete the algorithm");
      break;
    default:
      break;
  }
});

export const rows = mainGrid.rows;
export const cols = mainGrid.cols;
