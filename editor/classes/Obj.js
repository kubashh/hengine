function findName(name) {
  if(!findElementByName(name)) {
    return name
  }

  let help = 0
  while(findElementByName(name + help.toString())) {
    help++
  }

  return name + help.toString()
}


class Obj {
  constructor({name, transform, script, sprite}) {
    if(name) {
      this.name = findName(name)
    } else {
      this.name = findName("NewObject")
    }

    if(transform) {
      this.transform = transform
    } else {
      this.transform = {
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

    if(sprite) {
      this.sprite = sprite
    }

    if(script) {
      this.script = script
    }

    this.children = []

    objects.push(this)
  }

  toJson() {
    let object = {
      name: this.name,
      transform: this.transform
    }

    if(this.sprite) {
      object.sprite = this.sprite
    }

    if(this.script) {
      object.script = this.script
    }

    return object
  }

  static toJs(object) {
    let jsObject = {
      name: object.name,
      transform: object.transform
    }

    if(object.sprite) {
      jsObject.sprite = object.sprite
    }

    if(object.script) {
      jsObject.script = object.script
    }

    return new Obj(jsObject)
  }
}
