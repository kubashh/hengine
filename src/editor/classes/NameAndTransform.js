const NAME = {
  div: createElement({
    name: `input`,
    text: `ObjectName`,
  }),

  add(componentDiv) {
    this.div = createElement({
      name: `input`,
      text: selectedObject.name,
    })

    // name
    componentDiv.appendChild(
      createSection(`Name`, [
        createValueInput(
          createElement({
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
  positionX: createElement({
    name: `input`,
    id: `positionX`,
    text: 0,
  }),
  positionY: createElement({
    name: `input`,
    id: `positionY`,
    text: 0,
  }),
  rotation: createElement({
    name: `input`,
    id: `rotation`,
    text: 0,
  }),
  scaleX: createElement({
    name: `input`,
    id: `scaleX`,
    text: 1,
  }),
  scaleY: createElement({
    name: `input`,
    id: `scaleY`,
    text: 1,
  }),

  add(componentDiv) {
    const div1 = createElement({
      childs: [
        createValueInput(
          createElement({
            text: `x`,
          }),
          this.positionX
        ),
        createValueInput(
          createElement({
            text: `y`,
          }),
          this.positionY
        ),
      ],
    })

    const div2 = createElement({
      child: createValueInput(
        createElement({
          text: `z`,
        }),
        this.rotation
      ),
    })

    const div3 = createElement({
      childs: [
        createValueInput(
          createElement({
            text: `x`,
          }),
          this.scaleX
        ),
        createValueInput(
          createElement({
            text: `y`,
          }),
          this.scaleY
        ),
      ],
    })

    // transform
    componentDiv.appendChild(
      createSection(`Transform`, [
        createElement({
          text: `Position`,
          style: `margin-bottom:6px;`,
          className: `tab`,
          child: div1,
        }),
        createElement({
          text: `Rotation`,
          style: `margin-bottom:6px;`,
          className: `tab`,
          child: div2,
        }),
        createElement({
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
