const functions = `
const randNum = (min, max) => {
  return Math.random() * (max - min) + min
}

const randInt = (min, max) => {
  return Math.floor(randNum(min, max))
}


const deepCopy = (object) => {
  if(typeof object !== "object" || object === null) {
    return object
  }

  const newObject = Array.isArray(object) ? [] : {}

  for(const key in object) {
    newObject[key] = deepCopy(object[key])
  }

  return newObject
}


const clone = (object) => {
  const newObject = new Obj({
    transform: new Transform({
      transform: deepCopy(object.transform)
    }),
    ...(object.sprite ? {
      sprite: new Sprite(object.sprite.color, object.sprite.width, object.sprite.height)
    } : {})
  })
  for(const key in object) {
    if(object.hasOwnProperty(key) && !newObject.hasOwnProperty(key)) {
      if (typeof object[key] === "function") { // Sprawdzenie, czy wartość jest funkcją
        newObject[key] = object[key].bind(newObject)
      } else {
        newObject[key] = object[key]
      }
    }
  }

  objects.push(newObject)
  newObject.start?.()
}


const createObject = ({object, transform, sprite}) => {
  const newObject = deepCopy(object)
  newObject.awake?.()
  newObject.start?.()
}


const del = (object, timeout = 0) => {
  setTimeout(() => {
    if(objects.includes(object)) {
      for(const key in object) {
        delete object[key]
      }

      objects.splice(objects.indexOf(object), 1)
    }
  }, timeout)
}



const now = () => window.performance.now()




const clear = () => {
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

    
const drawBox = (x, y, w, h, color) => {
  if(color) {
    ctx.fillStyle = color
  }

  ctx.fillRect(x, y, w, h)
}

const drawBoxMiddle = (x, y, w, h, color) => {
  if(color) {
    ctx.fillStyle = color
  }

  ctx.fillRect(x, y, w, h)
}

const drawText = (text, x, y, color, h, textAlign, textBaseline) => {
  if(color) {
    ctx.fillStyle = color
  }

  if(h) {
    ctx.font = h + "px Arial"
  }

  if(textBaseline) {
    ctx.textBaseline = textBaseline
  }
  if(textAlign) {
    ctx.textAlign = textAlign
  }

  ctx.fillText(text, x, y)
}


const wait = async (time) => {
  await new Promise(resolve => setTimeout(resolve, time))
}
`
