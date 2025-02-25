function objectToString(object) {
  return `
    ${object.name}: new Obj ({
      transform: new Transform({
        transform: ${JSON.stringify(object.transform)}
      }),


      ${object.sprite ? `
        sprite: new Sprite("${object.sprite.color}", ${object.sprite.width}, ${object.sprite.height}),
        ` : ``
      }

      ${object.script ? `
        script: {
          ${object.script}
        },
        ` : ``
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
  for(const o of object) {
    aObj += `
      ${objectToString(o)}
    `
  }

  return `${aObj}}`
}


function allScenes() {
  let text = `
    const objects = []
    const scenes = [
  `
  
  for(const s of scenes) {
    text += `
      new Scene(${allObjects(s.objects)}),
    `
  }

  return `${text}
    ]

    let selectedScene = scenes[0]
  `
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
  const htmlElement = document.createElement(`a`)
  htmlElement.href = `data:text/html;charset=utf-8,${encodeURIComponent(htmlCode())}`
  htmlElement.download = `${config.gameName}.html`
  htmlElement.style.display = `none`
  document.body.appendChild(htmlElement).click()
  document.body.removeChild(htmlElement)
}
