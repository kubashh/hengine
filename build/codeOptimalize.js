const codeOptimalize = (text) => text
  .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ``) // Remove comments
  .split(`\n`)
  .map(line => line.trim())
  .filter(line => line !== ``)
  .map(line => line.replace(/\s*([({[])\s*/g, "$1")) // Remove spaces before brackets
  .join(`\n`) // Join lines
  .replace(/\s{2,}/g, ` `) // Replace multiple spaces with a single space
