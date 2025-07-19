class Sprite {
  constructor(color, width, height) {
    this.color = color
    this.width = width
    this.height = height
  }

  render(transform) {
    drawBoxMiddle(
      transform.position.x,
      transform.position.y,
      transform.scale.x * this.width,
      transform.scale.y * this.height,
      this.color
    )
  }
}
