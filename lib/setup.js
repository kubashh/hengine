// Shortcuts
document.addEventListener(`keydown`, (e) => {
  if (e.ctrlKey)
    switch (e.key) {
      case `s`:
        e.preventDefault()
        save()
        break
      case `d`:
        e.preventDefault()
        copyElement()
        refreshHierarchy()
        break
      case `q`:
        e.preventDefault()
        startTestGame()
        break
      case `y`:
        e.preventDefault()
        CONFIG.show()
        break
    }
})

function saveScene() {
  selectedScene.objects = deepCopy(objects)
}

saveScene()

document.addEventListener(`click`, saveScene)
