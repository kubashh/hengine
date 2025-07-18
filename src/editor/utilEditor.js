function startTestGame() {
  let newWindow = window.open()
  newWindow.document.write(htmlCode())
}

function save() {
  config.version++

  const jsonData = JSON.stringify({
    config,
    files,
    objects,
  })

  const src = `data:application/json;charset=utf-8,${encodeURIComponent(
    jsonData
  )}`

  downloadFile(`${config.gameName}${config.version}.json`, src)

  updateTitle()
}

// Load
const plikInput = document.getElementById(`plikInput`)

plikInput.addEventListener(`change`, ({ target }) => {
  const file = target.files[0]
  const reader = new FileReader()

  reader.onload = ({ target }) => {
    setData(JSON.parse(target.result))
  }

  reader.readAsText(file)
})

function clearData() {
  for (const key in files) delete files[key]

  objects.length = 0
}

function setData(data) {
  clearData()

  for (const key in data.config) config[key] = data.config[key]
  for (const key in data.files) files[key] = data.files[key]
  for (const o of data.objects) Obj.toJs(o)

  updateTitle()

  refreshFiles()
  refreshInspector(objects[0])
}

function firstLoad() {
  document.getElementById(`plikInput`).click()

  newProject()
}

function newProject() {
  document.getElementById(`popup-load`).remove()
}
