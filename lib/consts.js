const hierarchy = document.getElementById(`hierarchy`)
const inspector = document.getElementById(`inspector`)

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

const selectedOptions = {
  HIERARCHY: 0,
  FILES: 1,
  INSPECTOR: 2,
}

let selectedField = selectedOptions.HIERARCHY

const selectedFilePath = [`files`]
let selectedFileName = ``

let selectedFile = ``

let selectedObject = undefined

let inInspector = true
