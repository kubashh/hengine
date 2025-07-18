function refreshHierarchy() {
  hierarchy.innerHTML = ``

  for (const object of objects) {
    hierarchy.appendChild(createHierarchyElement(object))
  }
}

function createNewObject() {
  new Obj({})
  refreshHierarchy()
}

function createHierarchyElement(object) {
  const div = createElement({})

  div.appendChild(
    createElement({
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
      div.appendChild(createHierarchyElement(child))
    }
  }

  return div
}
