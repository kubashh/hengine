document
  .querySelector(`.hierarchyBox`)
  .addEventListener(`click`, () => (selectedField = selectedOptions.HIERARCHY))
document
  .querySelector(`.filesBox`)
  .addEventListener(`click`, () => (selectedField = selectedOptions.FILES))
document
  .querySelector(`.inspectorBox`)
  .addEventListener(`click`, () => (selectedField = selectedOptions.INSPECTOR))

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

document.addEventListener(`click`, saveScene)
document.addEventListener(`click`, () => {
  if (inInspector) {
    refreshInspector()
  }
})
window.addEventListener(`load`, () => (editorLoad = true))

FILES.refreshSelectedFile()
refreshFiles()

saveScene()

updateTitle()
refreshHierarchy()
refreshFiles()
deepRefresh()

new Obj({
  script: `start() {
  for(let i = 0; i < 20000; i++) {
    clone(selectedScene.NewObject0)
  }
}`,
})

refreshInspector(new Obj({ script: defaultScript }))
