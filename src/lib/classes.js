class TextEditor {
  textBox = createElement({
    name: `textarea`,
    text: `text`,
    className: `textEditorTextarea`,
  })

  exitButton = createElement({
    name: `a`,
    text: `Exit`,
    className: `textEditorExitButton`,
    onclick: this.hide,
  })

  div = createElement({
    className: `textEditor`,
    childs: [this.textBox, this.exitButton],
  })

  show() {
    this.textBox.value = selectedObject.script
    document.body.appendChild(this.textBox)
    document.body.appendChild(this.exitButton)
  }

  hide() {
    selectedObject.script = this.textBox.value
    scriptInput.value = this.textBox.value

    document.body.removeChild(this.textBox)
    document.body.removeChild(this.exitButton)
  }
}
