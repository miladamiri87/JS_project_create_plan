var canvas = new fabric.Canvas("canvas", {
  width: window.innerWidth,
  height: window.innerHeight,
});

//define button
let adding_line_btn = document.getElementById("adding_line_btn");
let adding_VH_line_btn = document.getElementById("adding_VH_line_btn");
let stop_btn = document.getElementById("stop");
let clear_btn = document.getElementById("clear");
//end of define button

//define function for each btn
adding_line_btn.addEventListener("click", activateAddingLine);
stop_btn.addEventListener("click", stopAddingLine);
clear_btn.addEventListener("click", clear_canvas);
adding_VH_line_btn.addEventListener("click", activateAddingLine_VH); //switch canvas on for create line VH

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
  originX: "right",
  originY: "top",
});

//add polyline to canvas
canvas.add(polyLine);
setPolyCoords();
canvas.selection = false;
canvas.renderAll();

function activateAddingLine_VH() {
  canvas.on("mouse:down", startAddingLine_VH); //function for create VH line
}
function activateAddingLine() {
  canvas.on("mouse:down", startAddingLine); //function for create free line
}

var count = 0;
var perv_Point_y = 0;
var perv_Point_x = 0;
var x_horizontal;
var y_horizontal;
var x_vertical;
var y_vertical;
var isHorizontal;

function startAddingLine_VH(o) {
  let pointer = canvas.getPointer(o.e);
  var newPoint_x = pointer.x;
  var newPoint_y = pointer.y;
  if (count > 0) {
    //dovomin click

    console.log(perv_Point_x, newPoint_x);

    /////----------test is Horizontal-----------------------------------------------------------------------------------

    if (newPoint_y > perv_Point_y) {
      var angle = Math.abs(
        Math.atan2(newPoint_y - perv_Point_y, newPoint_x - perv_Point_x)
      );
      if (angle < Math.PI / 4 || angle > (3 * Math.PI) / 4) {
        console.log(angle);
        isHorizontal = true;
      } else if (angle > Math.PI / 4 || angle < (3 * Math.PI) / 4) {
        isHorizontal = false;
        console.log(angle);
      }
    } else {
      var angle = Math.abs(
        Math.atan2(newPoint_x - perv_Point_x, newPoint_y - perv_Point_y)
      );
      if (angle < Math.PI / 4 || angle > (3 * Math.PI) / 4) {
        console.log(angle);
        isHorizontal = false;
      } else if (angle > Math.PI / 4 || angle < (3 * Math.PI) / 4) {
        isHorizontal = true;
        console.log(angle);
      }
    }
    console.log(isHorizontal);

    /////----------End test is Horizontal-----------------------------------------------------------------------------------

    /////----------create a line Horizontal-----------------------------------------------------------------------------------

    if (isHorizontal) {
      polyLine.points.push(new fabric.Point(pointer.x, perv_Point_y));
      setPolyCoordsVH();
      document.getElementById("lenght").innerText =
        Math.round(Math.abs((newPoint_x - perv_Point_x) * 0.0264583333)) + "cm";
      polyLine.dirty = true;
      canvas.add(polyLine);
      canvas.renderAll();
      /////----------create dimention for  Horizontal line-----------------------------------------------------------------------------------

      var center_point_x;
      var center_point_y;
      if (newPoint_x > perv_Point_x) {
        center_point_x =
          Math.abs((newPoint_x - perv_Point_x) / 2) + perv_Point_x;
        center_point_y = newPoint_y;
        let p_lenght = document.createElement("p");
        p_lenght.setAttribute(
          "style",
          "position:absolute; left:" +
            center_point_x +
            "px; top:" +
            center_point_y +
            "px"
        );
        document.body.appendChild(p_lenght);
        p_lenght.textContent = document.getElementById("lenght").innerText =
          Math.round(Math.abs((newPoint_x - perv_Point_x) * 0.0264583333)) +
          "cm";
        console.log(p_lenght);
      } else {
        center_point_x = Math.abs((newPoint_x - perv_Point_x) / 2) + newPoint_x;
        center_point_y = newPoint_y;
        let p_lenght = document.createElement("p");
        p_lenght.setAttribute(
          "style",
          "position:absolute; left:" +
            center_point_x +
            "px; top:" +
            center_point_y +
            "px"
        );
        document.body.appendChild(p_lenght);
        p_lenght.textContent = document.getElementById("lenght").innerText =
          Math.round(Math.abs((newPoint_x - perv_Point_x) * 0.0264583333)) +
          "cm";
        console.log(p_lenght);
      }
      /////----------End create dimention for  Horizontal line-----------------------------------------------------------------------------------
    }

    /////----------create a line vertical-----------------------------------------------------------------------------------
    else {
      polyLine.points.push(new fabric.Point(perv_Point_x, newPoint_y));
      setPolyCoordsVH();
      document.getElementById("lenght").innerText =
        Math.round(Math.abs((newPoint_y - perv_Point_y) * 0.0264583333)) + "cm";
      polyLine.dirty = true;
      canvas.add(polyLine);
      canvas.renderAll();

      /////----------create dimention for  Vertical line-----------------------------------------------------------------------------------

      var center_point_x;
      var center_point_y;
      if (newPoint_y > perv_Point_y) {
        center_point_y =
          Math.abs((newPoint_y - perv_Point_y) / 2) + perv_Point_y;
        center_point_x = newPoint_x;
        let p_lenght = document.createElement("p");
        p_lenght.setAttribute(
          "style",
          "position:absolute; left:" +
            center_point_x +
            "px; top:" +
            center_point_y +
            "px"
        );
        document.body.appendChild(p_lenght);
        p_lenght.textContent = document.getElementById("lenght").innerText =
          Math.round(Math.abs((newPoint_y - perv_Point_y) * 0.0264583333)) +
          "cm";
        console.log(p_lenght);
      } else {
        center_point_y = Math.abs((newPoint_y - perv_Point_y) / 2) + newPoint_y;
        center_point_x = newPoint_x;
        let p_lenght = document.createElement("p");
        p_lenght.setAttribute(
          "style",
          "position:absolute; left:" +
            center_point_x +
            "px; top:" +
            center_point_y +
            "px"
        );
        document.body.appendChild(p_lenght);
        p_lenght.textContent = document.getElementById("lenght").innerText =
          Math.round(Math.abs((newPoint_y - perv_Point_y) * 0.0264583333)) +
          "cm";
        console.log(p_lenght);
      }
      /////----------End create dimention for  Horizontal line-----------------------------------------------------------------------------------
    }
    perv_Point_x = canvas.getPointer(o.e).x;
    perv_Point_y = canvas.getPointer(o.e).y;
    count += 1;
  }
  /////----------End vertical/horizontal line-----------------------------------------------------------------------------------
  else {
    //avalin click

    polyLine.points.push(new fabric.Point(pointer.x, pointer.y));
    setPolyCoordsVH();
    document.getElementById("lenght").innerText =
      Math.round(Math.abs((pointer.x - pointer.y) * 0.0264583333)) + "cm";
    polyLine.dirty = true;
    canvas.add(polyLine);
    canvas.renderAll();
    perv_Point_x = pointer.x;
    perv_Point_y = pointer.y;
    count += 1;
  }
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
  console.log(polyLine);
  setPolyCoords();
  document.getElementById("lenght").innerText =
    Math.round(Math.abs((pointer.x - pointer.y) * 0.0264583333)) + "cm";
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
  console.log(
    polyLine.minX + polyLine.width / 2,
    polyLine.minY + polyLine.height / 2
  );
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
  count = 0;
  perv_Point_x = 0;
  perv_Point_y = 0;
}

//clear canvas
function clear_canvas() {
  console.log("s");
  points = [];
  count = 0;
  perv_Point_x = 0;
  perv_Point_y = 0;
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
