let lines = [];                                                       //no of lines drawn
let currentLine = null;                                               //line being drawn currently
const tableContainer = document.querySelector('.table-container');    //boundary conditions as global var

const drawLines = () => {
    const canvas = document.getElementById("canvas");                   //pull canvas tag
    const tableContainer = document.querySelector('.table-container');   //within function def
    canvas.width = tableContainer.offsetWidth;                           //setting width/height
    canvas.height = tableContainer.offsetHeight;
    const ctx = canvas.getContext("2d");                                  //2d graph
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);                     //setting canvas
    lines.forEach(line => {                                               //draw properties
      if (line.start && line.end) {
        ctx.beginPath();
        ctx.moveTo(line.start.x - tableContainer.offsetLeft, line.start.y - tableContainer.offsetTop);
        ctx.lineTo(line.end.x - tableContainer.offsetLeft, line.end.y - tableContainer.offsetTop);
        ctx.stroke();
      }
    });
}

export default drawLines;
export { lines, currentLine, tableContainer };