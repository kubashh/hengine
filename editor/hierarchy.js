const hierarchy = document.getElementById("hierarchy")


function refreshHierarchy() {
  while(hierarchy.firstChild) {
    hierarchy.removeChild(hierarchy.firstChild)
  }

  for(let object of objects) {
    hierarchy.appendChild(createElement(object))
  }

  hierarchy.appendChild(createHtmlElement({
    text: "+ Add New Object",
    style: "curcor: pointer;",
    onclick: () => {
      new Obj({})
      refreshHierarchy()
    }
  }))
}


function createElement(object) {
  let div = createHtmlElement({
  })
  div.appendChild(createHtmlElement({
    text: object.name,
    className: "tab",
    onclick: () => {
      refreshInspector(object)
    }
  }))

  if(object == selectedObject) {
    div.style.color = "yellow"
  }

  if(object.children && object.children.length > 0) {
    for(let child of object.children) {
      div.appendChild(createElement(child))
    }
  }

  return div
}
