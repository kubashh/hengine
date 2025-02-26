function save() {
  const objectsJs = []
  for(const o of objects) {
    objectsJs.push(o.toJson())
  }

  config.version++

  const jsonData = JSON.stringify({
    config: config,
    files: files,
    objects: objectsJs
  }) // Konwersja obiektu na JSON


  const htmlElement = document.createElement(`a`)
  htmlElement.href = `data:application/json;charset=utf-8,${encodeURIComponent(jsonData)}`
  htmlElement.download = `${config.gameName}${config.version}.json`
  htmlElement.style.display = `none`
  document.body.appendChild(htmlElement)
  htmlElement.click()
  document.body.removeChild(htmlElement)

  updateTitle()
}
