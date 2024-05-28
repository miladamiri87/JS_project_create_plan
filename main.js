let canvas = new fabric.Canvas("canvas", {
  width: window.innerWidth,
  height: window.innerHeight,
});

let adding_line_btn = document.getElementById("adding_line_btn");
let stop_btn = document.getElementById("stop");

adding_line_btn.addEventListener("click", activateAddingLine);
stop_btn.addEventListener("click", stopAddingLine);

function activateAddingLine() {
  canvas.on("mouse:down", startAddingLine);
}

let line;
let mouseDown = true; //key for stop drawing
var points = [];

function startAddingLine(o) {
  if (mouseDown) {
    let pointer = canvas.getPointer(o.e);
    polyLine.points.push(new fabric.Point(pointer.x, pointer.y));
    setPolyCoords();
    document.getElementById('lenght').innerText = Math.round(Math.abs((pointer.x - pointer.y)*0.0264583333)) + 'cm'

    polyLine.dirty = true;
    canvas.renderAll();
  }
}

var polyLine = new fabric.Polyline(points, {
  stroke: "green",
  strokeWidth: 10,
  fill: "",
  strokeLineJoin: "round",
  lockMovementX: true,
  lockMovementY: true,
  selectable: true,
  hasControls: false,
  hasBorders: false,
  evented: true,
  targetFindTolerance: true,
  
});

canvas.add(polyLine);
setPolyCoords();
canvas.selection = false;

canvas.renderAll();

function setPolyCoords() {
  if (mouseDown === true) {
    polyLine._calcDimensions();
    polyLine.set({
      top: polyLine.minY,
      left: polyLine.minX,
      pathOffset: {
        x: polyLine.minX + polyLine.width / 2,
        y: polyLine.minY + polyLine.height / 2,
      },
    });
    console.log(polyLine.minX + polyLine.width / 2 , polyLine.minY + polyLine.height / 2 )
    polyLine.dirty = true;
    polyLine.setCoords();
    canvas.renderAll();
  }
}

function stopAddingLine() {
  mouseDown = false;
  canvas.off("mouse:down", startAddingLine);
  canvas.selection = false;
  polyLine.selection = false;
}




// var Calculate = {
//   lineLength: function (x1, y1, x2, y2) {
//       return normalizedSize * (Math.sqrt(Math.pow(x2 * 1 - x1 * 1, 2) + Math.pow(y2 * 1 - y1 * 1, 2)));
//   }
// }
