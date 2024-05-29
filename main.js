var canvas = new fabric.Canvas("canvas", {
  width: window.innerWidth,
  height: window.innerHeight,
});


//define button
let adding_line_btn = document.getElementById("adding_line_btn");
let adding_VH_line_btn = document.getElementById("adding_VH_line_btn")
let stop_btn = document.getElementById("stop");
let clear_btn = document.getElementById("clear");
//end of define button



//define function for each btn
adding_line_btn.addEventListener("click", activateAddingLine);
stop_btn.addEventListener("click", stopAddingLine);
clear_btn.addEventListener("click", clear_canvas);
adding_VH_line_btn.addEventListener('click', activateAddingLine_VH)//switch canvas on for create line VH


var mouseDown = true; //key for stop drawing
var line;
var points = [];

//create a var for polyline and set attribute
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

//add polyline to canvas
canvas.add(polyLine);
setPolyCoords();
canvas.selection = false;
canvas.renderAll();




function activateAddingLine_VH() {
  canvas.on("mouse:down", startAddingLine_VH);//function for create VH line
}
function activateAddingLine() {
  canvas.on("mouse:down", startAddingLine);//function for create free line
}


var count = 0
var perv_Point_y = 0;
var perv_Point_x = 0;
var x_horizontal;
var y_horizontal;
var x_vertical;
var y_vertical;
var isHorizontal;

function startAddingLine_VH(o) {


  let pointer = canvas.getPointer(o.e);
  var newPoint_x = pointer.x
  var newPoint_y = pointer.y
  if(count>0){
    console.log(perv_Point_x, newPoint_x)

  }


  polyLine.points.push(new fabric.Point(pointer.x, pointer.y));
  setPolyCoordsVH();
  document.getElementById('lenght').innerText = Math.round(Math.abs((pointer.x - pointer.y) * 0.0264583333)) + 'cm'
  // polyLine.dirty = true;
  canvas.add(polyLine);
  canvas.renderAll();
  perv_Point_x = canvas.getPointer(o.e).x;
  perv_Point_y = canvas.getPointer(o.e).y;
  count += 1
  // console.log(perv_Point_x)
  // console.log(perv_Point_y)

}

function setPolyCoordsVH() {
  polyLine._calcDimensions();
  polyLine.set({
    top: polyLine.minY,
    left: polyLine.minX,
    pathOffset: {
      x: polyLine.minX + polyLine.width / 2,
      y: polyLine.minY + polyLine.height / 2,
    },
  });
  // console.log(polyLine.minX + polyLine.width / 2, polyLine.minY + polyLine.height / 2)
  polyLine.dirty = true;
  polyLine.setCoords();
  canvas.renderAll();
}


// --------------------------------------------------------------------------------------------------------------

function startAddingLine(o) {
  let pointer = canvas.getPointer(o.e);
  polyLine.points.push(new fabric.Point(pointer.x, pointer.y));
  console.log(polyLine)
  setPolyCoords();
  document.getElementById('lenght').innerText = Math.round(Math.abs((pointer.x - pointer.y) * 0.0264583333)) + 'cm'
  polyLine.dirty = true;
  canvas.add(polyLine);
  canvas.renderAll();
}

function setPolyCoords() {
  polyLine._calcDimensions();
  polyLine.set({
    top: polyLine.minY,
    left: polyLine.minX,
    pathOffset: {
      x: polyLine.minX + polyLine.width / 2,
      y: polyLine.minY + polyLine.height / 2,
    },
  });
  console.log(polyLine.minX + polyLine.width / 2, polyLine.minY + polyLine.height / 2)
  polyLine.dirty = true;
  polyLine.setCoords();
  canvas.renderAll();
}


// --------------------------------------------------------------------------------------------------------------


//stop creat line process
function stopAddingLine() {
  mouseDown = false;
  canvas.off("mouse:down", startAddingLine);
  canvas.off("mouse:down", startAddingLine_VH);
  canvas.selection = false;
  polyLine.selection = false;
  count = 0
  perv_Point_x = 0
  perv_Point_y = 0
}

//clear canvas
function clear_canvas() {
  console.log('s')
  points = [];
  count = 0
  perv_Point_x = 0
  perv_Point_y = 0
  canvas.dispose();
  polyLine = new fabric.Polyline(points, {
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
  canvas = new fabric.Canvas("canvas", {
    width: window.innerWidth,
    height: window.innerHeight,
  });
}


