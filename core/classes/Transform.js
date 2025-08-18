class Transform {
  position = {
    x: 0,
    y: 0,
  }
  rotation = 0
  scale = {
    x: 1,
    y: 1,
  }

  constructor({ transform, position, rotation, scale }) {
    if (transform) {
      this.position = deepCopy(transform.position)
      this.rotation = transform.rotation
      this.scale = deepCopy(transform.scale)
    }
    if (position) {
      this.position = {
        x: position.x,
        y: position.y,
      }
    }
    if (rotation) {
      this.rotation = rotation
    }
    if (scale) {
      this.scale = {
        x: scale.x,
        y: scale.y,
      }
    }
  }
}
