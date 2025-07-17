const SCRIPT = {
  script: createSection(
    `Script`,
    [
      createElement({
        childs: [
          createElement({
            name: `textarea`,
            id: `scriptInput`,
            style: `height: 300px; width: 100%; color: white;`,
          }),
          createElement({
            text: `Full open`,
            onclick: TextEditor.show,
          }),
        ],
      }),
    ],
    () => {
      delete selectedObject.script
      refreshInspector()
    }
  ),

  addScript: createElement({
    text: `Add Script`,
    className: `addNewComponent`,
    onclick: () => {
      selectedObject.script = defaultScript
      document.getElementById(`scriptInput`).value = selectedObject.script
    },
  }),

  add(componentDiv, addComponentDiv) {
    componentDiv.appendChild(this.script)
    if (!selectedObject?.script) {
      this.script.style.display = `none`
    }
    addComponentDiv.appendChild(this.addScript)
  },

  refresh() {
    if (selectedObject.script) {
      document.getElementById(`scriptInput`).value = selectedObject.script
      this.script.style.display = `block`
      this.addScript.style.display = `none`
    } else {
      document.getElementById(`scriptInput`).value = ``
      this.script.style.display = `none`
      this.addScript.style.display = `block`
    }
  },

  update() {
    if (selectedObject.script) {
      selectedObject.script = document.getElementById(`scriptInput`).value
    }
  },
}

const defaultScript = `start() {
  this.transform.position.y = randInt(0, 1080)
  this.speed = randNum(0, 10)
  //del(this, randInt(30000, 40000))
},

update() {
  this.transform.position.x += this.speed
  this.speed -= randNum(0.01, 0.015)
  if(this.transform.position.x > 1920) {
    this.transform.position.x -= 1920
  } else if(this.transform.position.x < 0) {
    this.transform.position.x = 1920
  }
}`
