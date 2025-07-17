function save() {
  config.version++

  const jsonData = JSON.stringify({
    config,
    files,
    objects,
  })

  const htmlElement = document.createElement(`a`)
  htmlElement.href = `data:application/json;charset=utf-8,${encodeURIComponent(
    jsonData
  )}`
  htmlElement.download = `${config.gameName}${config.version}.json`
  htmlElement.click()

  updateTitle()
}
