const hierarchy = document.getElementById(`hierarchy`)

function refreshHierarchy() {
  hierarchy.innerHTML = ``

  for (const object of objects) {
    hierarchy.appendChild(createElement(object))
  }
}

function createNewObject() {
  new Obj({})
  refreshHierarchy()
}

function createElement(object) {
  const div = createHtmlElement({})

  div.appendChild(
    createHtmlElement({
      text: object.name,
      className: `tab`,
      onclick: () => {
        refreshInspector(object)
      },
    })
  )

  if (object == selectedObject) {
    div.style.color = `yellow`
  }

  if (object.children && object.children.length > 0) {
    for (const child of object.children) {
      div.appendChild(createElement(child))
    }
  }

  return div
}
