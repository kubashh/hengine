const plikInput = document.getElementById('plikInput')


function load() {
  plikInput.addEventListener('change', function() {
    const file = this.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)
        console.log(data)

        clearData()

        for(const key in data.config) {
          config[key] = data.config[key]
        }

        updateTitle()

        for(const key in data.files) {
          files[key] = data.files[key]
        }

        for(let o of data.objects) {
          Obj.toJs(o)
        }

        refreshFiles()
        refreshInspector(objects[0])
      } catch (error) {
        console.error('Błąd parsowania JSON:', error)
      }
    }

    reader.readAsText(file)
  })
}

load()


function clearData() {
  for(let key in files) {
    delete files[key]
  }

  objects.length = 0
}
