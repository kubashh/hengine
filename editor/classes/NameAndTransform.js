const NAME = {
  div: createHtmlElement({
    name: `input`,
    text: `ObjectName`,
  }),

  add(componentDiv) {
    this.div = createHtmlElement({
      name: `input`,
      text: selectedObject.name,
    })

    // name
    componentDiv.appendChild(
      createSection(`Name`, [
        createValueInput(
          createHtmlElement({
            text: `Name`,
          }),
          this.div
        ),
      ])
    )
  },

  refresh() {
    this.div.value = selectedObject.name
  },

  update() {
    let n = this.div.value

    if (n != selectedObject.name) {
      n = findName(n)
    }
    selectedObject.name = n
  },
}

const TRANSFORM = {
  positionX: createHtmlElement({
    name: `input`,
    id: `positionX`,
    text: 0,
  }),
  positionY: createHtmlElement({
    name: `input`,
    id: `positionY`,
    text: 0,
  }),
  rotation: createHtmlElement({
    name: `input`,
    id: `rotation`,
    text: 0,
  }),
  scaleX: createHtmlElement({
    name: `input`,
    id: `scaleX`,
    text: 1,
  }),
  scaleY: createHtmlElement({
    name: `input`,
    id: `scaleY`,
    text: 1,
  }),

  add(componentDiv) {
    const div1 = createHtmlElement({
      childs: [
        createValueInput(
          createHtmlElement({
            text: `x`,
          }),
          this.positionX
        ),
        createValueInput(
          createHtmlElement({
            text: `y`,
          }),
          this.positionY
        ),
      ],
    })

    const div2 = createHtmlElement({
      child: createValueInput(
        createHtmlElement({
          text: `z`,
        }),
        this.rotation
      ),
    })

    const div3 = createHtmlElement({
      childs: [
        createValueInput(
          createHtmlElement({
            text: `x`,
          }),
          this.scaleX
        ),
        createValueInput(
          createHtmlElement({
            text: `y`,
          }),
          this.scaleY
        ),
      ],
    })

    // transform
    componentDiv.appendChild(
      createSection(`Transform`, [
        createHtmlElement({
          text: `Position`,
          style: `margin-bottom:6px;`,
          className: `tab`,
          child: div1,
        }),
        createHtmlElement({
          text: `Rotation`,
          style: `margin-bottom:6px;`,
          className: `tab`,
          child: div2,
        }),
        createHtmlElement({
          text: `Scale`,
          style: `margin-bottom:6px;`,
          className: `tab`,
          child: div3,
        }),
      ])
    )
  },

  refresh() {
    this.positionX.value = selectedObject.transform.position.x
    this.positionY.value = selectedObject.transform.position.y
    this.rotation.value = selectedObject.transform.rotation
    this.scaleX.value = selectedObject.transform.scale.x
    this.scaleY.value = selectedObject.transform.scale.y
  },

  update() {
    selectedObject.transform.position.x = Number(this.positionX.value) || 0
    selectedObject.transform.position.y = Number(this.positionY.value) || 0
    selectedObject.transform.rotation = Number(this.rotation.value) || 0
    selectedObject.transform.scale.x = Number(this.scaleX.value) || 0
    selectedObject.transform.scale.y = Number(this.scaleY.value) || 0
  },
}
