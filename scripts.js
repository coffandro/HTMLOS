//Make the DIV element draggagle:
let windows = document.getElementsByClassName("window")
let topwindow = windows[0]

for (let i = 0; i < windows.length; i++) { 
  CreateWindowDecs(windows[i]);
  //windows[i].addEventListener("click", ChangeTopWindow);
  dragElement(windows[i]);
  
  TaskBar = document.getElementById("TaskBar");
  icon = windows[i].children[0].children[0];
  icon = icon.cloneNode(true)
  icon.className = icon.className.replace("BarIcon","TaskIcon");
  Button = document.createElement('button');
  Button.onclick =  function(){HideWindow(windows[i])};
  Button.appendChild(icon);
  TaskBar.appendChild(Button);
}

function HideWindow(Window) {
  Window.classList.toggle("hidden")
}

function CreateWindowDecs(elmnt) {
  Header = elmnt.children[0]

  BarDiv = document.createElement('div');
  BarDiv.className = "Bar"
  CloseButton = document.createElement('button');
  CloseIcon = document.createElement("i");
  CloseIcon.className = "fa-solid fa-minus";
  CloseButton.className = "CloseButton";
  CloseButton.appendChild(CloseIcon);
  CloseButton.onclick =  function(){HideWindow(elmnt)};
  BarDiv.appendChild(CloseButton);
  Header.appendChild(BarDiv);
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (elmnt.children[0]) {
    /* if present, the header is where you move the DIV from:*/
    elmnt.children[0].onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    topwindow = elmnt;
    ChangeTopWindow();
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function ChangeTopWindow() {
  for (let i = 0; i < windows.length; i++) { 
    windows[i].setAttribute("id", "");
  }

  topwindow.setAttribute("id", "TopWindow");
}