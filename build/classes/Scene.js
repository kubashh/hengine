const classScene = `
class Scene {
  constructor(objects) {
    this.objects = []
    for(let key in objects) {
      let object = objects[key]
      this[key] = object
      this.objects.push(object)
    }
  }

  load() {
    selectedScene.quit()
    selectedScene = this
    for(let o of this.objects) {
      objects.push(o)
    }

    allStart()
  }

  quit() {
    objects.length = 0
  }
}
`