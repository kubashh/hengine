function createHtmlElement({name = `div`, text = ``, className, style, onclick, id, child, childs, type, onchange, oninput, change, input, ...rest}) {
  const element = document.createElement(name)

  if(!type) {
    if(name === `input` || name === `textarea`) {
      element.type = `text`
      element.value = text
    } else {
      element.textContent = text
    }
  } else {
    element.type = type
  }

  if(onclick) {
    element.onclick = onclick
    element.style.cursor = `pointer`
  }

  if(child) {
    element.appendChild(child)
  } else if(childs) {
    for(let child of childs) {
      element.appendChild(child)
    }
  }

  for(const key in rest) {
    element[key] = rest[key]
  }

  return element
}


// create section like sprite or transform
function createSection(text, properties, removeButtonFunction) {
  let div = createHtmlElement({
    className: `section`
  })

  let rb = createHtmlElement({})

  if(removeButtonFunction) {
    rb = createHtmlElement({
      text: `Remove`,
      onclick: removeButtonFunction
    })
  }

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
      rb
    ]
  }))

  for(let property of properties) {
    div.appendChild(property)
  }

  return div
}


// return div
function createValueInput(textElement, inputElement) {
  let div = createHtmlElement({
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

  for(let key in object) {
    newObject[key] = deepCopy(object[key])
  }

  return newObject
}


function updateTitle() {
  document.title = `${config.gameName} | ${config.version} | HEngine`
}
