const hierarchy = document.getElementById(`hierarchy`)

const objects = []

const scenes = [{ objects: [] }]

let selectedScene = scenes[0]

const config = {
  gameName: `Name of Game`,
  screenWidth: 1600,
  screenHeight: 900,
  fullScreen: true,
  safeUnload: false,
  version: 0,
  author: `Your Name or Nick`,
  description: `Write what game is`,
}

let editorLoad = false

window.addEventListener(`load`, () => (editorLoad = true))
