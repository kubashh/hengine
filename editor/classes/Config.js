const CONFIG = {
  gameName: createValueInput(
    createHtmlElement({
      text: `Name of Game (Version: ${config.version})`
    }),
    createHtmlElement({
      name: `input`,
      id: `nameOfGameInput`,
      text: config.name,
      oninput: () => {
        config.gameName = document.getElementById(`nameOfGameInput`).value
        updateTitle()
      }
    })
  ),
  fullScreen: createValueInput(
    createHtmlElement({
      text: `Full Screen`
    }),
    createHtmlElement({
      name: `input`,
      id: `fullScreenCheckbox`,
      type: `checkbox`,
      onchange: function() {
        config.fullScreen = this.checked
      }
    })
  ),
  safeUnload: createValueInput(
    createHtmlElement({
      text: `Safe Unload`
    }),
    createHtmlElement({
      name: `input`,
      id: `safeUnload`,
      type: `checkbox`,
      onchange: function() {
        config.safeUnload = this.checked
      }
    })
  ),
  author: createValueInput(
    createHtmlElement({
      text: `Game Author`
    }),
    createHtmlElement({
      name: `input`,
      id: `authorField`,
      oninput: () => {
        config.author = document.getElementById(`authorField`).value
      }
    })
  ),
  description: createValueInput(
    createHtmlElement({
      text: `Description`
    }),
    createHtmlElement({
      name: `input`,
      id: `descriptionField`,
      oninput: () => {
        config.description = document.getElementById(`descriptionField`).value
      }
    })
  ),


  show() {
    if(inInspector) {
      inInspector = false
        
      cleanInspector()

      inspector.appendChild(createSection(
        `Config`,
        [
          createHtmlElement({
            text: `Basic info`
          }),
          CONFIG.gameName,
          CONFIG.author,
          CONFIG.description,
          CONFIG.fullScreen,
          CONFIG.safeUnload
        ]
      ))

      document.getElementById(`nameOfGameInput`).value = config.gameName
      document.getElementById(`authorField`).value = config.author
      document.getElementById(`descriptionField`).value = config.description
      document.getElementById(`fullScreenCheckbox`).checked = config.fullScreen
      document.getElementById(`safeUnload`).checked = config.safeUnload
    } else {
      inInspector = true
      deepRefresh()
    }
  }
}
