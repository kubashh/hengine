function save() {
  let objectsJs = []
  for(const o of objects) {
    objectsJs.push(o.toJson())
  }

  config.version++

  const content = {
    config: config,
    files: files,
    objects: objectsJs
  }
  console.log(objectsJs)
  const jsonData = JSON.stringify(content) // Konwersja obiektu na JSON
  console.log(jsonData)


  const htmlElement = document.createElement('a')
  htmlElement.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonData) // Ustawienie typu i kodowania
  htmlElement.download = `${config.gameName}${config.version}.json`
  htmlElement.style.display = 'none'
  document.body.appendChild(htmlElement)
  htmlElement.click()
  document.body.removeChild(htmlElement)

  updateTitle()
}
