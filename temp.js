const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
ctx.fillStyle = "black"
ctx.fillRect(0, 0, canvas.width, canvas.height)

class myImage {
  constructor(image, x = 0, y = 0, rx = 0, ry = 0, rotation = 0) {
    this.image = image
    this.position = {
      x: x,
      y: y,
    }

    this.rotation = rotation

    this.rectTransform = {
      x: rx,
      y: ry,
    }

    images.push(this)
  }

  draw() {
    ctx.save()
    ctx.rotate(this.rotation)
    let x = this.position.x - (this.image.width / 2) * this.rectTransform.x
    let y = this.position.y - (this.image.height / 2) * this.rectTransform.y
    ctx.drawImage(this.image, x, y)
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

const jsImages = []
const images = []

function drawImages() {
  console.time()
  for (let i = 0; i < 10000; i++) {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let image of images) {
      image.draw()
    }
  }
  console.timeEnd()
}

function objectToImage(object) {
  let image = new Image()
  image.src = object.src
  image.width = object.width
  image.height = object.height
  return image
}

function addNewImage(image) {
  let obiektObrazu = {
    src: image.src,
    width: image.width,
    height: image.height,
  }
  jsImages.push(obiektObrazu)
  const myImageFile = new myImage(image)
  drawImages()
  console.log(myImage.toJson(myImageFile))
}

// Funkcja obsługująca wybór pliku
function handleFileSelect(event) {
  let file = event.target.files[0]
  let reader = new FileReader()
  reader.onload = function (e) {
    let obraz = new Image()
    obraz.onload = () => {
      addNewImage(obraz)
    }
    obraz.src = e.target.result
  }
  reader.readAsDataURL(file)
}

document
  .getElementById("wybierzObraz")
  .addEventListener("change", handleFileSelect, false)
