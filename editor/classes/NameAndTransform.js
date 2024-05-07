const NAME = {
  div: createHtmlElement({
    name: "input",
    text: "ObjectName"
  }),

  add(componentDiv) {
    this.div = createHtmlElement({
      name: "input",
      text: selectedObject.name
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
