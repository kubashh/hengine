const plikInput = document.getElementById('plikInput')

plikInput.addEventListener(`change`, function() {
  const file = this.files[0]
  const reader = new FileReader()

  reader.onload = (event) => {
    const jsonFile = event.target.result
    try {
      const data = JSON.parse(jsonFile)
      console.log(data)

      setData(data)
    } catch (error) {
      console.error('Błąd parsowania JSON:', error)
    }
  }

  reader.readAsText(file)
})



function clearData() {
  for(const key in files) {
    delete files[key]
  }

  objects.length = 0
}


function setData(data) {
  clearData()

  for(const key in data.config) {
    config[key] = data.config[key]
  }

  for(const key in data.files) {
    files[key] = data.files[key]
  }

  for(const o of data.objects) {
    Obj.toJs(o)
  }

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
