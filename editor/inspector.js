const inspector = document.getElementById("inspector")

let selectedObject = undefined



function cleanInspector() {
  while(inspector.firstChild) {
    inspector.removeChild(inspector.firstChild)
  }
}




const NAME = {
  div: createHtmlElement({
    name: "input",
    text: "Object Name"
  }),

  add(componentDiv) {
    this.div = createHtmlElement({
      name: "input",
      text: "Object Name"
    })

    // name
    componentDiv.appendChild(createSection(
      "Name",
      [
        createValueInput(
          createHtmlElement({
            text: "Name"
          }),
          this.div
        )
      ]
    ))
  },

  refresh() {
    this.div.value = selectedObject.name
  },

  update() {
    let n = this.div.value

    if(n != selectedObject.name) {
      n = findName(n)
    }
    selectedObject.name = n
  }
}




const TRANSFORM = {
  positionX: createHtmlElement({
    name: "input",
    id: "positionX",
    text: 0
  }),
  positionY: createHtmlElement({
    name: "input",
    id: "positionY",
    text: 0
  }),
  rotation: createHtmlElement({
    name: "input",
    id: "rotation",
    text: 0
  }),
  scaleX: createHtmlElement({
    name: "input",
    id: "scaleX",
    text: 1
  }),
  scaleY: createHtmlElement({
    name: "input",
    id: "scaleY",
    text: 1
  }),

  add(componentDiv) {
    let div1 = createHtmlElement({
      childs: [
        createValueInput(
          createHtmlElement({
            text: "x"
          }),
          this.positionX
        ),
        createValueInput(
          createHtmlElement({
            text: "y"
          }),
          this.positionY
        )
      ]
    })
  
  
    let div2 = createHtmlElement({
    child: createValueInput(
      createHtmlElement({
        text: "z"
      }),
      this.rotation
    )})
  
  
    let div3 = createHtmlElement({
      childs: [
        createValueInput(
          createHtmlElement({
            text: "x"
          }),
          this.scaleX
        ),
        createValueInput(
          createHtmlElement({
            text: "y"
          }),
          this.scaleY
        )
      ]
    })
  
    // transform
    componentDiv.appendChild(createSection(
      "Transform",
      [
        createHtmlElement({
          text: "Position",
          style: "margin-bottom:6px;",
          className: "tab",
          child: div1
        }),
        createHtmlElement({
          text: "Rotation",
          style: "margin-bottom:6px;",
          className: "tab",
          child: div2
        }),
        createHtmlElement({
          text: "Scale",
          style: "margin-bottom:6px;",
          className: "tab",
          child: div3
        })
      ]
    ))
  },

  refresh() {
    this.positionX.value = selectedObject.transform.position.x
    this.positionY.value = selectedObject.transform.position.y
    this.rotation.value = selectedObject.transform.rotation
    this.scaleX.value = selectedObject.transform.scale.x
    this.scaleY.value = selectedObject.transform.scale.y
  },

  update() {
    let positionX = parseFloat(this.positionX.value)
    let positionY = parseFloat(this.positionY.value)
    let rotation = parseFloat(this.rotation.value)
    let scaleX = parseFloat(this.scaleX.value)
    let scaleY = parseFloat(this.scaleY.value)

    if(isNaN(positionX)) {
      positionX = 0
    }
    if(isNaN(positionY)) {
      positionY = 0
    }
    if(isNaN(rotation)) {
      rotation = 0
    }
    if(isNaN(scaleX)) {
      scaleX = 0
    }
    if(isNaN(scaleY)) {
      scaleY = 0
    }

    selectedObject.transform.position.x = positionX
    selectedObject.transform.position.y = positionY
    selectedObject.transform.rotation = rotation
    selectedObject.transform.scale.x = scaleX
    selectedObject.transform.scale.y = scaleY
  }
}






function deepRefresh() {
  cleanInspector()

  if(!selectedObject) {
    return
  }

  const componentDiv = createHtmlElement({
  })

  const addComponentDiv = createHtmlElement({
    style: "margin: 2px",
    childs: [
      createHtmlElement({
        name: "div",
        style: "tab",
        text: "Add New Component"
      })
    ]
  })


  NAME.add(componentDiv)
  TRANSFORM.add(componentDiv)
  SPRITE.add(componentDiv, addComponentDiv)
  SCRIPT.add(componentDiv, addComponentDiv)


  inspector.appendChild(componentDiv)
  inspector.appendChild(addComponentDiv)
}





function refreshInspector(object) {
  inWhat = 0
  updateValue()
  if(object) {
    selectedObject = object
    deepRefresh()
  }
  if(!selectedObject) {
    return
  }

  NAME.refresh()
  TRANSFORM.refresh()
  SPRITE.refresh()
  SCRIPT.refresh()

  refreshHierarchy()
}


document.addEventListener("click", (event) => {
  if(inWhat == 0) {
    //console.log("Kliknięto element:", event.target)
    refreshInspector()
  }
})


function updateValue() {
  if(!selectedObject) {
    return
  }

  NAME.update()
  TRANSFORM.update()
  SPRITE.update()
  SCRIPT.update()
}


deepRefresh()



const CONFIG = {
  gameName: createValueInput(
    createHtmlElement({
      text: `Name of Game (Version: ${config.version})`
    }),
    createHtmlElement({
      name: "input",
      id: "nameOfGameInput",
      text: config.name,
      oninput: () => {
        config.gameName = document.getElementById("nameOfGameInput").value
        updateTitle()
      }
    })
  ),
  fullScreen: createValueInput(
    createHtmlElement({
      text: "Full Screen"
    }),
    createHtmlElement({
      name: "input",
      id: "fullScreenCheckbox",
      type: "checkbox",
      onchange: function() {
        config.fullScreen = this.checked
      }
    })
  ),
  author: createValueInput(
    createHtmlElement({
      text: "Game Author"
    }),
    createHtmlElement({
      name: "input",
      id: "authorField",
      oninput: () => {
        config.author = document.getElementById("authorField").value
      }
    })
  ),
  description: createValueInput(
    createHtmlElement({
      text: "Description"
    }),
    createHtmlElement({
      name: "input",
      id: "descriptionField",
      oninput: () => {
        config.description = document.getElementById("descriptionField").value
      }
    })
  ),
}



function showConfig() {
  cleanInspector()

  inspector.appendChild(createSection(
    "Config",
    [
      CONFIG.gameName,
      CONFIG.author,
      CONFIG.description,
      CONFIG.fullScreen
    ]
  ))

  document.getElementById("nameOfGameInput").value = config.gameName
  document.getElementById("authorField").value = config.author
  document.getElementById("descriptionField").value = config.description
  document.getElementById("fullScreenCheckbox").checked = config.fullScreen
}


let inWhat = 0


function checkInspector(num) {
  if(num !== undefined) {
    inWhat = num
  }

  switch(inWhat) {
    case 0:
      deepRefresh()
      break
    case 1:
      showConfig()
      break
    default:
      deepRefresh()
      break
  }
}
