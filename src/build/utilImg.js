class myImage {
  constructor(object, imagePath, rx = 0, ry = 0) {
    this.image = imagePath
    this.rectTransform = { x: rx, y: ry }
    object.image = this
  }

  render(transform) {
    ctx.save()
    ctx.rotate(transform.rotation)
    ctx.drawImage(
      this.image,
      transform.position.x - (this.image.width / 2) * this.rectTransform.x,
      transform.position.y - (this.image.height / 2) * this.rectTransform.y,
      this.image.width * transform.scale.x,
      this.image.height * transform.scale.y
    )
    ctx.restore()
  }

  static toJson(imageJS) {
    return JSON.stringify({
      image: {
        src: imageJS.image.src,
        width: imageJS.image.width,
        height: imageJS.image.height,
      },
      position: imageJS.position,
      rotation: imageJS.rotation,
      rectTransform: imageJS.rectTransform,
    })
  }

  static toJs(imageJson) {
    new myImage({
      image: objectToImage(imageJson.image),
      position: imageJson.position,
      rotation: imageJson.rotation,
      rectTransform: imageJson.rectTransform,
    })
  }
}

function imagesToJs(file = files) {
  for (const key in file) {
    if (file[key].type == `image`) {
      file[key] = myImage.toJs(file[key].image)
    } else if (file[key].type == `folder`) {
      imagesToJs(file[key])
    }
  }
}
