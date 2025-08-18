import { readFileSync, writeFileSync } from "fs"

const classesFile = `const staticJS = \`${encode(
  optimalize(
    readFileSync(`core/values/consts.js`),

    readFileSync("core/util/util.js"),
    readFileSync("core/util/startUpdateRun.js"),

    readFileSync("core/classes/Obj.js"),
    readFileSync("core/classes/Transform.js"),
    readFileSync("core/classes/Sprite.js"),
    readFileSync("core/classes/Scene.js")
  )
)}\``

const jsFile = optimalize(
  classesFile,

  readFileSync("src/lib/consts.js"),
  readFileSync("src/lib/util.js"),
  readFileSync("src/lib/classes.js"),

  // Build
  readFileSync("src/build/utilImg.js"),
  readFileSync("src/build/utilBuild.js"),
  readFileSync("src/build/build.js"),

  // Editor
  readFileSync("src/editor/classes/Obj.js"),
  readFileSync("src/editor/classes/NameAndTransform.js"),
  readFileSync("src/editor/classes/Sprite.js"),
  readFileSync("src/editor/classes/Script.js"),
  readFileSync("src/editor/classes/Text.js"),
  readFileSync("src/editor/classes/Config.js"),

  readFileSync("src/editor/utilEditor.js"),
  readFileSync("src/editor/hierarchy.js"),
  readFileSync("src/editor/files.js"),
  readFileSync("src/editor/inspector.js"),

  // Main
  readFileSync("src/main.js")
)

function encode(s: string) {
  const buf = []
  for (const e of s) {
    if (["`", `$`].includes(e)) buf.push(`\\`)
    buf.push(e)
  }
  return buf.join(``)
}

// CSS

const cssFile = [readFileSync("src/styles/main.css"), readFileSync("src/styles/components.css")]
  .join(`\n`)
  .replaceAll(/\/\*[\s\S]*?\*\/*/g, ``) // Remove comments
  .split(`\n`) // Split into lines
  .map((line) => line.trim()) // Trim lines
  .filter((line) => line !== ``) // Remove empty lines
  .join(``) // Join lines

function optimalize(...files: (string | NonSharedBuffer)[]) {
  return files
    .join(`\n`)
    .replaceAll(/\/\*[\s\S]*?\*\/|\/\/.*/g, ``) // Remove comments
    .split(`\n`) // Split into lines
    .map((line) => line.trim()) // Trim lines
    .filter((line) => line !== ``) // Remove empty lines
    .join(`\n`) // Join lines
}

writeFileSync(`dist/main.js`, jsFile)
writeFileSync(`dist/main.css`, cssFile)
