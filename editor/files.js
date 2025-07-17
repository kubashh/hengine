const filesElement = createElement({ style: `padding:5px;` })
document.getElementById(`files`).innerHTML = ``
document.getElementById(`files`).appendChild(filesElement)
const files = {
  type: `folder`,
  engineAssets: {
    type: `folder`,
    tempImage: {
      type: `image`,
      value: {
        src: `data:image/png;base64`,
        width: 1,
        height: 1,
      },
    },
  },
  folder1: {
    type: `folder`,
    object2: {
      type: `text`,
      value: `str 2`,
    },
    obj3: {
      type: `folder`,
      obj4: {
        type: `text`,
        value: `str 3`,
      },
      obj5: {
        type: `text`,
        value: `str 4`,
      },
    },
  },
  folder2: {
    type: `folder`,
    object2: {
      type: `text`,
      value: `str 5`,
    },
    obj2: {
      type: `folder`,
      obj4: {
        type: `text`,
        value: `str 5`,
      },
      obj5: {
        type: `text`,
        value: `str 8`,
      },
    },
  },
}

const FILES = {
  next(bool = true) {
    const obiekt = getCurrentFolder()
    const keys = Object.keys(obiekt).filter((item) => item !== `type`)
    let indexNow = keys.indexOf(selectedFileName)
    if (bool) {
      indexNow++
      if (indexNow >= keys.length) {
        indexNow = 0
      }
    } else {
      indexNow--
      if (indexNow < 0) {
        indexNow = keys.length - 1
      }
    }

    selectedFileName = keys[indexNow]
    selectedFile = obiekt[selectedFileName]

    refreshFiles()
  },

  up() {
    FILES.next(false)
  },

  down() {
    FILES.next()
  },

  left() {
    if (selectedFilePath.length > 1) {
      selectedFilePath.pop()
      this.refreshSelectedFile()
    }
  },

  right(name = selectedFileName) {
    if (selectedFile?.type == `folder`) {
      selectedFilePath.push(name)
      this.refreshSelectedFile()
    }
  },

  refreshSelectedFile() {
    const element = selectedFilePath.reduce(
      (acc, f) => (f !== `files` ? acc[f] : acc),
      files
    )

    selectedFileName = Object.keys(element).find((key) => key != `type`)
    selectedFile = element[selectedFileName]

    refreshFiles()
  },
}

let inFiles = true

const selectedFilePath = [`files`]
let selectedFileName = ``

let selectedFile = ``
FILES.refreshSelectedFile()

function newFile(name = `NewFile`) {
  const file = name
  //files.push(file)
  selectedFile = file
}

function refreshFiles() {
  filesElement.innerHTML = ``

  allFileStructureToHtml()

  addFileInfo()
}

function createFileElement(file, name) {
  const element = createElement({
    text: `${name} (${file.type})`,
    style: `margin-left:16px; cursor:pointer;`,
  })

  if (file.type == `folder`) {
    element.addEventListener(`click`, () => {
      FILES.right(name)
    })
  } else {
    element.addEventListener(`click`, () => {
      selectedFile = file
      refreshFiles(file)
    })
  }

  if (file == selectedFile) {
    element.style.color = `yellow`
  }

  return element
}

function allFileStructureToHtml() {
  const div = createElement({})

  const filePathElement = createElement({
    style: `display:flex;`,
  })

  let i = 1
  for (const f of selectedFilePath) {
    const j = i
    filePathElement.appendChild(
      createElement({
        text: f + `.`,
        onclick: () => {
          selectedFilePath.length = j
          refreshFiles()
        },
      })
    )
    i++
  }

  div.appendChild(filePathElement)

  const newElement = createElement({
    text: `..`,
    style: `margin-left:16px; cursor: pointer;`,
  })

  if (selectedFilePath.length > 1) {
    newElement.addEventListener(`click`, () => {
      FILES.left()
    })
  }

  div.appendChild(newElement)

  const element = getCurrentFolder()
  for (const key in element) {
    if (key != `type`) {
      div.appendChild(createFileElement(element[key], key))
    }
  }

  filesElement.appendChild(div)
}

function addFileInfo() {
  filesElement.appendChild(
    createElement({
      style: `margin-top:50px;`,
      childs: [
        createElement({
          style: `display:flex;`,
          childs: [
            createElement({
              name: `input`,
              text: selectedFileName,
              style: `margin-right:16px;`,
              onchange: (event) => {
                // rename file to value
                const folder = getCurrentFolder()
                selectedFile = deepCopy(selectedFile)
                delete folder[selectedFileName]
                selectedFileName = checkString(event.target.value)
                folder[selectedFileName] = selectedFile
                refreshFiles()
              },
            }),
            createElement({
              text: `(${selectedFile?.type})`,
            }),
            createElement({
              text: `Delete file`,
              onclick: deleteSelectedFile,
            }),
          ],
        }),
        createElement({
          text: JSON.stringify(selectedFile),
        }),
      ],
    })
  )
}

function getCurrentFolder() {
  const element = files
  for (const f of selectedFilePath) {
    if (f != `files`) {
      element = element[f]
    }
  }

  return element
}

function addNewFolder() {
  const folder = getCurrentFolder()
  const name = checkFileName(`NewFile`)
  folder[name] = {
    type: `folder`,
  }

  refreshFiles()
}

function importFile() {}

function checkFileName(name) {
  const folder = getCurrentFolder()
  if (!findFileByName(name, folder)) {
    return name
  }

  let i = 0
  while (findFileByName(name + i, folder)) {
    i++
  }

  return name + i
}

function findFileByName(name, folder = files) {
  return name in folder
}

function copyCurrentPath() {
  let path = ``
  for (const p of selectedFilePath) {
    path += p + `.`
  }
  path += selectedFileName
  navigator.clipboard.writeText(path)
}

function deleteSelectedFile() {
  const folder = getCurrentFolder()
  delete folder[selectedFileName]
  FILES.refreshSelectedFile()
}

refreshFiles()

function checkString(string) {
  return string.replace(/^\d+|\W+/g, ``)
}
