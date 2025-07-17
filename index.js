const objects = []

const scenes = [{ objects: [] }]

let selectedScene = scenes[0]

function findElementByName(name) {
  return objects.find((o) => o.name === name)
}

function saveScene() {
  selectedScene.objects = deepCopy(objects)
}

/*const Camera = {
  id: setId(),
  name: `Camera`,
  transform: {
    position: {
      x: 0,
      y: 0
    },
    rotation: 0,
    scale: {
      x: 1,
      y: 1
    }
  }
}

objects.push(Camera)*/

updateTitle()

refreshHierarchy()

refreshFiles()

new Obj({
  script: `start() {
  for(let i = 0; i < 20000; i++) {
    clone(selectedScene.NewObject0)
  }
}`,
})

refreshInspector(new Obj({ script: defaultScript }))

saveScene()

document.addEventListener(`click`, saveScene)
