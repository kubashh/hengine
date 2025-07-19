class Scene {
  constructor(objects) {
    this.objects = []
    for (const key in objects) {
      const object = objects[key]
      this[key] = object
      this.objects.push(object)
    }
  }

  load() {
    selectedScene.quit()
    selectedScene = this
    for (const o of this.objects) {
      objects.push(o)
    }

    allStart()
  }

  quit() {
    objects.length = 0
  }
}
