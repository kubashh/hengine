const classes = `
class Obj {
  constructor({transform, sprite, script}) {
    this.transform = transform
    if(sprite) {
      this.sprite = sprite
    }
    if(script) {
      for(const key in script) {
        if(script.hasOwnProperty(key)) {
          this[key] = script[key]
        }
      }
    }

    objects.push(this)
  }
}



class Transform {
  constructor({transform, position, rotation, scale}) {
    this.position = {
      x: 0,
      y: 0
    }
    this.rotation = 0
    this.scale = {
      x: 1,
      y: 1
    }

    if(transform) {
      this.position = deepCopy(transform.position)
      this.rotation = transform.rotation
      this.scale = deepCopy(transform.scale)
    }
    if(position) {
      this.position = {
        x: position.x,
        y: position.y
      }
    }
    if(rotation) {
      this.rotation = rotation
    }
    if(scale) {
      this.scale = {
        x: scale.x,
        y: scale.y
      }
    }
  }
}



class Sprite {
  constructor(color, width, height) {
    this.color = color
    this.width = width
    this.height = height
  }

  render(transform) {
    drawBoxMiddle(transform.position.x, transform.position.y, transform.scale.x * this.width, transform.scale.y * this.height, this.color)
  }
}
`
