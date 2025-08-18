class Obj {
  constructor({ transform, sprite, script, start }) {
    this.transform = transform
    if (sprite) this.sprite = sprite

    if (script)
      for (const key in script) {
        if (script.hasOwnProperty(key)) this[key] = script[key]
      }

    if (start) start()
  }
}
