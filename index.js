// gridContainer.add
function createNode() {
  var node = document.createElement("div");
  node.setAttribute("class", "box");
  return node;
}

function createEmptyBoard() {
  gridContainer = document.querySelector(".grid-container");
  //   console.log(gridContainer.offsetWidth, gridContainer.offsetHeight);
  //   divided by 30 since each sqaure is 30px*30px
  var rows = Math.round(gridContainer.offsetHeight / 30) - 5;
  var cols = Math.round(gridContainer.offsetWidth / 30) - 7;
  console.log(rows, cols);
  var rowsize = rows;
  var colsize = cols;
  gridContainer.style.setProperty("--rows", rows);
  gridContainer.style.setProperty("--cols", cols);
  gridContainer.innerHTML = "";
  for (var row = 0; row < rowsize; row++) {
    for (var col = 0; col < colsize; col++) {
      let temp = createNode(row, col);
      gridContainer.appendChild(temp);
    }
  }
}
createEmptyBoard();
