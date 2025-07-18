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
