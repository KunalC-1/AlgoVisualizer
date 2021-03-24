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
          startIcon.setAttribute("draggable",'true');
          startIcon.setAttribute("ondragstart","event.dataTransfer.setData('text/plain',null)");
          temp.setAttribute("id", "startBox");
          temp.appendChild(startIcon);
        }
        if (row === 10 && col == 30) {
          let endIcon = document.createElement("i");
          endIcon.setAttribute("class", "bi bi-geo-alt-fill Icon");
          endIcon.setAttribute("draggable",'true');
          endIcon.setAttribute("ondragstart","event.dataTransfer.setData('text/plain',null)");
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

var dragged;
const gridContainer = document.querySelector(".grid-container");
  /* events fired on the draggable target */
  gridContainer.addEventListener("drag", function( event ) {
      
  }, false);

  gridContainer.addEventListener("dragstart", function( event ) {
      // store a ref. on the dragged elem
      dragged = event.target;
      if(dragged.getAttribute("id")==="startBox"){
        let startBox=document.getElementById("startBox");
        if(startBox.hasAttribute("id"))
          startBox.removeAttribute("id");
      }
      
      else if(dragged.getAttribute("id")==="endBox"){
        let endBox=document.getElementById("endBox");
        if(endBox.hasAttribute("id"))
          endBox.removeAttribute("id");
      }
      //console.log(dragged);
      // make it half transparent
      event.target.style.opacity = .5;
  }, false);

  gridContainer.addEventListener("dragend", function( event ) {
      // reset the transparency
      event.target.style.opacity = "";
  }, false);

  /* events fired on the drop targets */
  gridContainer.addEventListener("dragover", function( event ) {
      // prevent default to allow drop
      event.preventDefault();
  }, false);

  gridContainer.addEventListener("dragenter", function( event ) {
      // highlight potential drop target when the draggable element enters it
      if ( event.target.className == "box" ) {
          event.target.style.background = "purple";
      }

  }, false);

  gridContainer.addEventListener("dragleave", function( event ) {
      // reset background of potential drop target when the draggable element leaves it
      if ( event.target.className == "box" ) {
          event.target.style.background = "";
      }

  }, false);

  gridContainer.addEventListener("drop", function( event ) {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged elem to the selected drop target
      if ( event.target.className == "box" ) {
          event.target.style.background = "";
          dragged.parentNode.removeChild( dragged );
          event.target.appendChild( dragged );
          if(dragged.classList.contains("bi-nut-fill"))
            event.target.setAttribute("id","startBox");
          else if(dragged.classList.contains("bi-geo-alt-fill"))
            event.target.setAttribute("id","endBox");
      }
      mainGrid.ismousePressed=false;
  }, false);
export const rows = mainGrid.rows;
export const cols = mainGrid.cols;
