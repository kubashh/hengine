const TEXT = {
  defaultText: `Text`,


  text: createSection(
    `Text`,
    [
      createValueInput(
        createHtmlElement({
          text: `Color`
        }),
        createHtmlElement({
          name: `input`,
          id: `colorTextInput`,
          text: `Color`
        })
      ),
      createValueInput(
        createHtmlElement({
          text: `Text`
        }),
        createHtmlElement({
          name: `input`,
          id: `textInput`,
          text: `Text`
        })
      )
    ],
    () => {
      delete selectedObject.text
      refreshInspector()
    }
  ),
  
  addText: createHtmlElement({
    text: `Add Text`,
    className: `addNewComponent`,
    onclick: () => {
      TEXT.set()
    }
  }),

  add(componentDiv, addComponentDiv) {
    componentDiv.appendChild(this.text)
    if(!selectedObject?.text) {
      this.text.style.display = `none`
    } else {
      this.addText.style.display = `none`
    }
    
    addComponentDiv.appendChild(this.addText)
  },

  refresh() {
    if(selectedObject.text) {
      document.getElementById(`colorTextInput`).value = selectedObject.text.color
      document.getElementById(`textInput`).value = selectedObject.text.text
      this.text.style.display = `block`
      this.addText.style.display = `none`
    } else {
      document.getElementById(`colorTextInput`).value = `blue`
      document.getElementById(`textInput`).value = this.defaultText
      this.text.style.display = `none`
      this.addText.style.display = `block`
    }
  },

  update() {
    if(selectedObject.text) {
      selectedObject.text.color = document.getElementById(`colorTextInput`).value
      selectedObject.text.text = document.getElementById(`textInput`).value
    }
  },

  set() {
    selectedObject.text = {
      color: `blue`,
      text: this.defaultText,
      width: 1,
      height: 1,
      size: 30,
      rectTransform: {
        x: 0,
        y: 0
      }
    }
  }
}
