class TextEditor {
  static textBox = createHtmlElement({
    name: `textarea`,
    text: `text`,
    className: `textEditorTextarea`,
  })

  static exitButton = createHtmlElement({
    name: `a`,
    text: `Exit`,
    className: `textEditorExitButton`,
    onclick: TextEditor.hide,
  })

  static div = createHtmlElement({
    className: `textEditor`,
    childs: [TextEditor.textBox, TextEditor.exitButton],
  })

  static show() {
    TextEditor.textBox.value = selectedObject.script
    document.body.appendChild(TextEditor.textBox)
    document.body.appendChild(TextEditor.exitButton)
  }

  static hide() {
    selectedObject.script = TextEditor.textBox.value
    scriptInput.value = TextEditor.textBox.value

    document.body.removeChild(TextEditor.textBox)
    document.body.removeChild(TextEditor.exitButton)
  }
}
