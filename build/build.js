function objectToString(object) {
  return `
  ${object.name}: new Obj ({
    transform: new Transform({
      transform: ${JSON.stringify(object.transform)}
    }),

    ${
      object.sprite
        ? `
      sprite: new Sprite("${object.sprite.color}", ${object.sprite.width}, ${object.sprite.height}),
      `
        : ``
    }

    ${
      object.script
        ? `
      script: {
        ${object.script}
      },
      `
        : ``
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
  return `
  ${object.reduce(
    (last, o) => `${last}
    ${objectToString(o)}
  `,
    `{
`
  )}}`
}

function allScenes() {
  const text = scenes.reduce(
    (prev, s) => `${prev}new Scene(${allObjects(s.objects)}),`,
    `
    const objects = []
    const scenes = [
  `
  )

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

const buildGame = () => {
  downloadFile(
    `${config.gameName}.html`,
    `data:text/html;charset=utf-8,${encodeURIComponent(htmlCode())}`
  )
}
