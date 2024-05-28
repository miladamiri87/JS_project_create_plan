var canvas = new fabric.Canvas('c');
var currentColor;
var defaultIcon = {
  width: 40,
  height: 30,
  originX: 'center',
  originY: 'center',
  hasControls: false,
};
var iconTriangle = new fabric.Triangle(defaultIcon);
setColor('green');
canvas.add(iconTriangle);
//disable icon & hide when hovering over existing icon
canvas.on('mouse:over', function(obj) {
  iconTriangle.set('opacity', 0);
  canvas.renderAll();
});
//restor icon & unhide
canvas.on('mouse:out', function(e) {
  if (document.getElementById("on").checked == true) {
    // if 'target' is null, means mouse is out of canvas
    if (e.target) {
      iconTriangle.set('opacity', 1);
    } else {
      iconTriangle.left = -100;
      iconTriangle.top = -100;
    }
    canvas.renderAll();
  };
});
//move pointer icon
canvas.on('mouse:move', function(obj) {
  iconTriangle.top = obj.e.y - 100;
  iconTriangle.left = obj.e.x - 10;
  canvas.renderAll();
});

//count each by type and place new icon
canvas.on('mouse:up', function(e) {
  if (e.target) {
    return
  }
  var red = getObjectsBy((obj) => obj.fill === 'red').length;
  var green = getObjectsBy((obj) => obj.fill === 'green').length;
  var yellow = getObjectsBy((obj) => obj.fill === 'yellow').length;
  document.getElementById("greentally").value = green;
  document.getElementById("yellowtally").value = yellow;
  document.getElementById("redtally").value = red;
  addIcon(e.e.x - 10, e.e.y - 100, currentColor);
});

function setColor(color) {
  currentColor = color;
  iconTriangle.setColor(currentColor);
  canvas.renderAll();
}

function getObjectsBy(fn) {
  return canvas.getObjects().filter(fn)
}

function addIcon(x, y, color) {
  var icon = new fabric.Triangle(defaultIcon);
  if (document.getElementById("on").checked == true) {
    icon.setColor(color);
    icon.left = x;
    icon.top = y;
    canvas.add(icon);
  } else if (document.getElementById("off").checked == true) {
    iconTriangle.set('opacity', 0);
    icon = null;
  };
  canvas.renderAll();
}

//set icon type
$(".switch").click(function() {
  if (document.getElementById("green").checked == true) {
    setColor('green');
  } else if (document.getElementById("yellow").checked == true) {
    setColor('yellow');
  } else if (document.getElementById("red").checked == true) {
    setColor('red');
  }
});

document.getElementById("on").checked = true;

//link icons with line
$("input").change(function() {
  mode = "draw";

  canvas.on('mouse:up', function(o) {
    isDown = true;

    if (document.getElementById("off").checked == true) {
      if (canvas.getActiveObjects().length == 1) {
        mode = "draw";

        var pointer = canvas.getActiveObject();
        var points = [pointer.left, pointer.top, pointer.left, pointer.top];

        if (mode == "draw") {
          line = new fabric.Line(points, {
            strokeWidth: 5,
            fill: 'blue',
            stroke: 'blue',
            originX: 'center',
            originY: 'center',
            selectable: false,
            hasControls: false,
            hasBorders: false,
            evented: false,
            targetFindTolerance: true,
            name: 'line',
          });
          canvas.add(line);
          line.sendToBack();
          //            };
        };
        canvas.renderAll();
      } else {
        canvas.remove(line);
        canvas.discardActiveObject();
      };
    };

    if (document.getElementById("on").checked == true) {
      canvas.remove(line);
      canvas.discardActiveObject();
      canvas.renderAll();
    };

  });

  canvas.on('mouse:move', function(o) {
    if (!isDown) return;
    line.set('opacity', 0.4);
    if (o.target !== null) {
      var x2 = o.target.left;
      var y2 = o.target.top;
      if (mode == "draw") {
        line.set({
          x2: x2,
          y2: y2
        });
        canvas.renderAll();
      }
    } else {
      var pointer = canvas.getPointer(o.e);

      if (mode == "draw") {
        line.set({
          x2: pointer.x,
          y2: pointer.y
        });
        canvas.renderAll();
      }
    }
    line.set('opacity', 1);
  });

  canvas.renderAll();
});
