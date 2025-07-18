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

const staticJS = `
const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

const objects = []

${classObj}
${classTransform}
${classSprite}
${classScene}
${functions}
${camera}
${startAndUpdate}
`

const run = `
resize()
clear()
selectedScene.load()
run()`

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

function allObjects(object) {
  return `
  ${object.reduce(
    (last, o) => `${last}
    ${objectToString(o)}
  `,
    `{`
  )}}`
}

function allScenes() {
  return `
    const scenes = [${scenes.reduce(
      (prev, s) => `${prev}new Scene(${allObjects(s.objects)}),`,
      ``
    )}]

    let selectedScene = scenes[0]
  `
}

function jsCode() {
  return `
  ${staticJS}

  ${fullScreen()}
  ${safeUnload()}
  ${allScenes()}

  ${run}`
}

function buildGame() {
  downloadFile(
    `${config.gameName}.html`,
    `data:text/html;charset=utf-8,${encodeURIComponent(htmlCode())}`
  )
}
