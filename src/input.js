function copyElement() {
  const object = new Obj({})
  object.transform = deepCopy(selectedObject.transform)
  if(selectedObject.sprite) {
    new Sprite({
      object: object,
      color: selectedObject.sprite.color,
      width: selectedObject.sprite.width,
      height: selectedObject.sprite.height
    })
  }
  /*if(selectedObject.collider) {
    object.collider = deepCopy(selectedObject.collider)
  }
  if(selectedObject.gravity) {
    object.gravity = deepCopy(selectedObject.gravity)
  }*/
  if(selectedObject.script) {
    object.script = selectedObject.script
  }
}


// Przypisanie funkcji do zdarzenia keydown
document.addEventListener(`keydown`, (event) => {
  if(event.ctrlKey) {
    switch(event.key) {
      case `s`:
        event.preventDefault()
        save()
        break
      case `d`:
        event.preventDefault()
        copyElement()
        refreshHierarchy()
        break
      case `q`:
        event.preventDefault()
        startTestGame()
        break
      case `y`:
        event.preventDefault()
        CONFIG.show()
        break
    }
  }
})
