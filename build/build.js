function objectToString(object) {
  return `
    ${object.name}: new Obj ({
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
    }),
  `
}


const camera = `Camera = {
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
}`



function allObjects(object) {
  let aObj = `{
  `
  for(let o of object) {
    aObj += `
      ${objectToString(o)}
    `
  }

  aObj += "}"

  return aObj
}


function allScenes() {
  let text = `
    const objects = []
    const scenes = [
  `
  
  for(let s of scenes) {
    text += `
      new Scene(${allObjects(s.objects)}),
    `
  }

  text += `
    ]

    let selectedScene = scenes[0]
  `

  return text
}



function jsCode() {
  return `
    const canvas = document.getElementById("gameCanvas")
    const ctx = canvas.getContext("2d")

    ${fullScreen()}
    ${safeUnload()}
    ${functions}
    ${classes}
    ${camera}
    ${allScenes()}
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
