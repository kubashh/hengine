const CONFIG = {
  gameName: createValueInput(
    createElement({
      text: `Name of Game (Version: ${config.version})`,
    }),
    createElement({
      name: `input`,
      id: `nameOfGameInput`,
      text: config.name,
      oninput: () => {
        config.gameName = document.getElementById(`nameOfGameInput`).value
        updateTitle()
      },
    })
  ),
  fullScreen: createValueInput(
    createElement({
      text: `Full Screen`,
    }),
    createElement({
      name: `input`,
      id: `fullScreenCheckbox`,
      type: `checkbox`,
      onchange: function () {
        config.fullScreen = this.checked
      },
    })
  ),
  safeUnload: createValueInput(
    createElement({
      text: `Safe Unload`,
    }),
    createElement({
      name: `input`,
      id: `safeUnload`,
      type: `checkbox`,
      onchange: function () {
        config.safeUnload = this.checked
      },
    })
  ),
  author: createValueInput(
    createElement({
      text: `Game Author`,
    }),
    createElement({
      name: `input`,
      id: `authorField`,
      oninput: () => {
        config.author = document.getElementById(`authorField`).value
      },
    })
  ),
  description: createValueInput(
    createElement({
      text: `Description`,
    }),
    createElement({
      name: `input`,
      id: `descriptionField`,
      oninput: () => {
        config.description = document.getElementById(`descriptionField`).value
      },
    })
  ),

  show() {
    if (inInspector) {
      inInspector = false

      cleanInspector()

      inspector.appendChild(
        createSection(`Config`, [
          createElement({
            text: `Basic info`,
          }),
          CONFIG.gameName,
          CONFIG.author,
          CONFIG.description,
          CONFIG.fullScreen,
          CONFIG.safeUnload,
        ])
      )

      document.getElementById(`nameOfGameInput`).value = config.gameName
      document.getElementById(`authorField`).value = config.author
      document.getElementById(`descriptionField`).value = config.description
      document.getElementById(`fullScreenCheckbox`).checked = config.fullScreen
      document.getElementById(`safeUnload`).checked = config.safeUnload
    } else {
      inInspector = true
      deepRefresh()
    }
  },
}
