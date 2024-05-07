function save() {
  let objectsJs = []
  for(let o of objects) {
    objectsJs.push(o.toJson())
  }

  config.version++

  let content = {
    config: config,
    files: files,
    objects: objectsJs
  }
  console.log(objectsJs)
  let jsonData = JSON.stringify(content) // Konwersja obiektu na JSON
  console.log(jsonData)


  let htmlElement = document.createElement('a')
  htmlElement.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonData) // Ustawienie typu i kodowania
  htmlElement.download = `${config.gameName}${config.version}.json`
  htmlElement.style.display = 'none'
  document.body.appendChild(htmlElement)
  htmlElement.click()
  document.body.removeChild(htmlElement)

  updateTitle()
}
