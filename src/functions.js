function createHtmlElement({name = `div`, text = ``, className, style, onclick, id, child, childs, type, onchange, oninput, change, input}) {
  const element = document.createElement(name)

  if(!type) {
    switch(name) {
      case `input`:
      case `textarea`:
        element.type = `text`
        element.value = text
        break
      
      case ``:
        break
      
      default:
        element.textContent = text
        break
    }
  } else {
    element.type = type
  }

  if(id) {
    element.id = id
  }

  if(className) {
    element.className = className
  }

  if(style) {
    element.style = style
  }

  if(onclick) {
    element.onclick = onclick
    element.style.cursor = `pointer`
  }

  if(child) {
    element.appendChild(child)
  } else if(childs) {
    for(const child of childs) {
      element.appendChild(child)
    }
  }

  if(onchange) {
    element.onchange = onchange
  }

  if(oninput) {
    element.oninput = oninput
  }

  if(change) {
    element.change = change
  }

  if(input) {
    element.input = input
  }

  return element
}


// create section like sprite or transform
function createSection(text, properties, removeButtonFunction) {
  const div = createHtmlElement({
    className: `section`
  })

  div.appendChild(createHtmlElement({
    className: `headerOfSection`,
    childs: [
      createHtmlElement({
        text: text,
        style: `
          margin-bottom: 5px;
          font-weight: bold;
          border-left: 2px black solid;
          padding: 2px;
        `
      }),
      createHtmlElement(removeButtonFunction ? {
        text: `Remove`,
        onclick: removeButtonFunction
      } : {})
    ]
  }))

  for(const property of properties) {
    div.appendChild(property)
  }

  return div
}


// return div
function createValueInput(textElement, inputElement) {
  const div = createHtmlElement({
    className: `valueInput`
  })

  textElement.style.margin = `2px`
  textElement.style.fontSize = `16px`

  inputElement.style.border = `2px solid black`
  inputElement.style.padding = `0 0 0 1px`
  inputElement.style.fontSize = `16px`

  div.appendChild(textElement)

  div.appendChild(inputElement)

  return div
}



// Math

function randNum(min, max) {
  return Math.random() * (max - min) + min
}

function randInt(min, max) {
  return Math.floor(randNum(min, max))
}


function deepCopy(object) {
  if(typeof object !== `object` || object === null) {
    return object
  }

  const newObject = Array.isArray(object) ? [] : {}

  for(const key in object) {
    newObject[key] = deepCopy(object[key])
  }

  return newObject
}


function updateTitle() {
  document.title = `${config.gameName} | ${config.version} | HEngine`
}
