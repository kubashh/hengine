function cleanInspector() {
  inspector.innerHTML = ``
}

function deepRefresh() {
  inInspector = true
  cleanInspector()

  if (!selectedObject) {
    return
  }

  const componentDiv = createElement({})

  const addComponentDiv = createElement({
    style: `margin: 2px;`,
    childs: [
      createElement({
        style: `tab`,
        text: `Add New Component`,
      }),
    ],
  })

  NAME.add(componentDiv)
  TRANSFORM.add(componentDiv)
  SPRITE.add(componentDiv, addComponentDiv)
  SCRIPT.add(componentDiv, addComponentDiv)
  TEXT.add(componentDiv, addComponentDiv)

  inspector.appendChild(componentDiv)
  inspector.appendChild(addComponentDiv)
}

function refreshInspector(object) {
  inInspector = true
  inWhat = 0
  updateValue()
  if (object) {
    selectedObject = object
    deepRefresh()
  }
  if (!selectedObject) {
    return
  }

  NAME.refresh()
  TRANSFORM.refresh()
  SPRITE.refresh()
  SCRIPT.refresh()
  TEXT.refresh()

  refreshHierarchy()
}

function updateValue() {
  if (!selectedObject) {
    return
  }

  NAME.update()
  TRANSFORM.update()
  SPRITE.update()
  SCRIPT.update()
  TEXT.update()
}

function deleteSelectedObject() {
  if (selectedObject) {
    objects.splice(objects.indexOf(selectedObject), 1)
    if (objects.length == 0) {
      selectedObject = new Obj({})
    } else {
      selectedObject = objects[0]
    }

    refreshHierarchy()
  } else {
    console.error(objects)
  }
}
