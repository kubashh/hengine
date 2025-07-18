import { readFileSync, writeFileSync } from "fs"

const files = [
  readFileSync("src/lib/consts.js"),
  readFileSync("src/lib/util.js"),
  readFileSync("src/lib/classes.js"),

  // Build
  readFileSync("src/build/classes/Obj.js"),
  readFileSync("src/build/classes/Transform.js"),
  readFileSync("src/build/classes/Sprite.js"),
  readFileSync("src/build/classes/Scene.js"),

  readFileSync("src/build/utilBuild.js"),
  readFileSync("src/build/functions.js"),
  readFileSync("src/build/startAndUpdate.js"),
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
  readFileSync("src/main.js"),
]
  .join(`\n`)
  .replaceAll(/\/\*[\s\S]*?\*\/|\/\/.*/g, ``) // Remove comments
  .split(`\n`) // Split into lines
  .map((line) => line.trim()) // Trim lines
  .filter((line) => line !== ``) // Remove empty lines
  .join(`\n`) // Join lines

writeFileSync(`dist/main.js`, files)

// CSS

const cssFile = [readFileSync("src/styles/main.css"), readFileSync("src/styles/components.css")]
  .join(`\n`)
  .replaceAll(/\/\*[\s\S]*?\*\/*/g, ``) // Remove comments
  .split(`\n`) // Split into lines
  .map((line) => line.trim()) // Trim lines
  .filter((line) => line !== ``) // Remove empty lines
  .join(`\n`) // Join lines

writeFileSync(`dist/main.css`, cssFile)
