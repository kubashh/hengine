const classSprite = `class Sprite {
  constructor(color, width, height) {
    this.color = color
    this.width = width
    this.height = height
  }

  render(transform) {
    drawBoxMiddle(transform.position.x, transform.position.y, transform.scale.x * this.width, transform.scale.y * this.height, this.color)
  }
}`

function getImageByPath(path) {
  return path
}

class myImage {
  constructor(object, imagePath, rx = 0, ry = 0) {
    this.image = getImageByPath(imagePath)

    this.rectTransform = {
      x: rx,
      y: ry
    }

    object.image = this
  }

  render(transform) {
    ctx.save()
    ctx.rotate(transform.rotation)
    let x = transform.position.x - (this.image.width / 2) * this.rectTransform.x
    let y = transform.position.y - (this.image.height / 2) * this.rectTransform.y
    let width = this.image.width * transform.scale.x
    let height = this.image.height * transform.scale.y
    ctx.drawImage(this.image, x, y, width, height)
    ctx.restore()
  }

  static toJson(imageJS) {
    return JSON.stringify({
      image: {
        src: imageJS.image.src,
        width: imageJS.image.width,
        height: imageJS.image.height
      },
      position: imageJS.position,
      rotation: imageJS.rotation,
      rectTransform: imageJS.rectTransform
    })
  }

  static toJs(imageJson) {
    new myImage({
      image: objectToImage(imageJson.image),
      position: imageJson.position,
      rotation: imageJson.rotation,
      rectTransform: imageJson.rectTransform
    })
  }
}

function imagesToJs(file = files) {
  for(let key in file) {
    if(file[key].type == `image`) {
      file[key] = myImage.toJs(file[key].image)
    } else if(file[key].type == `folder`) {
      imagesToJs(file[key])
    }
  }
}
