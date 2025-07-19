class Transform {
  constructor({ transform, position, rotation, scale }) {
    this.position = {
      x: 0,
      y: 0,
    }
    this.rotation = 0
    this.scale = {
      x: 1,
      y: 1,
    }

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
