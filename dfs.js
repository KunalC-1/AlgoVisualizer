
let alldiv = gridContainer.getElementsByTagName("div");
let style = window.getComputedStyle(gridContainer);

let rows = parseInt(style.getPropertyValue("--rows"));
let cols = parseInt(style.getPropertyValue("--cols"));

function createGridMatrix(){
    let i, j, gridMatrix = [], k = 0;
    for(i = 0; i < rows; i++){
        gridMatrix[i] = [];
        for(j = 0; j < cols; j++){
            gridMatrix[i][j] = alldiv[k++];
        }
    }
    return gridMatrix;
}
let gridMatrix = createGridMatrix();
let flag = false;

function check(row, col, visited){
    if(col == -1 || row == -1)
        return false;
    if(row < rows && col < cols){
        let wall = parseInt(gridMatrix[row][col].getAttribute("wall"));
        if(!wall && !visited[row][col]) return true;
    }
    return false;
}

function DFS(startRow, startCol,endRow, endCol, visited, stack){
    if(flag || (startRow == endRow && startCol == endCol)){
        flag = true;
        return;
    }
    visited[startRow][startCol] = true;
    stack.push(gridMatrix[startRow][startCol]);

    if(check(startRow - 1, startCol, visited)){
        DFS(startRow - 1,startCol, endRow, endCol, visited, stack);
    }
    if(check(startRow, startCol + 1, visited)){
        DFS(startRow, startCol + 1, endRow, endCol, visited, stack);
    }
    if(check(startRow + 1, startCol, visited)){
        DFS(startRow + 1, startCol, endRow, endCol, visited, stack);
    }
    if(check(startRow ,startCol - 1, visited)){
        DFS(startRow, startCol - 1, endRow, endCol, visited, stack);
    }
    if(!flag)   stack.pop();
}

function DFSCall(){
    let startBox = document.getElementById("startBox");
    let endBox = document.getElementById("endBox");
    var visited = new Array(parseInt(rows)).fill(false);
    for(var j = 0; j < rows; j++){
        visited[j] = new Array(parseInt(cols)).fill(false);
    }
    let stack = [];
    flag = false;
    DFS(parseInt(startBox.getAttribute("row")), parseInt(startBox.getAttribute("col")), parseInt(endBox.getAttribute("row")), parseInt(endBox.getAttribute("col")), visited, stack);
    console.log(stack);
};

