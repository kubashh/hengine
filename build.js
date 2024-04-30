function objectToString(object) {
  return `
    let ${object.name} = new Obj ({
      transform: new Transform({
        transform: ${JSON.stringify(object.transform)}
      }),


      ${object.sprite ? `
        sprite: new Sprite("${object.sprite.color}", ${object.sprite.width}, ${object.sprite.height}),
        ` : ""
      }

      ${object.script ? `
        script: {
          ${object.script}
        },
        ` : ""
      }
    })
  `
}



function allObjects() {
  let aObj = `
    const Camera = {
      transform: {
        position: {
          x: 0,
          y: 0
        },
        rotation: 0,
        scale: {
          x: 1,
          y: 1
        }
      }
    }

    const objects = []
  `
  for(let o of objects) {
    aObj += `
      ${objectToString(o)}
    `
  }

  return aObj
}



function jsCode() {
  return `
    const canvas = document.getElementById("gameCanvas")
    const ctx = canvas.getContext("2d")

    window.addEventListener('beforeunload', (event) => {
      event.preventDefault()
      console.log("exit")
    })

    ${fullScreen()}
    ${functions}
    ${classes}
    ${allObjects()}
    ${startAndUpdate}
  `
}



function buildGame() {
  let htmlContent = htmlCode()

  let htmlElement = document.createElement('a')
  htmlElement.href = `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`
  htmlElement.download = `${config.gameName}.html`
  htmlElement.style.display = 'none'
  document.body.appendChild(htmlElement).click()
  document.body.removeChild(htmlElement)

  console.log(htmlContent)
}
