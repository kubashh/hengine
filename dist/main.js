const staticJS = `const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")
const objects = []
Camera = {
transform: {
position: {
x: 0,
y: 0,
},
rotation: 0,
scale: {
x: 1,
y: 1,
},
},
}
timers = {
update: {
gravity: 0,
user: 0,
all: 0,
},
}
let running = true
const ms = 1000 / 60
let updatesLegit = 0
let framesLegit = 0
function randNum(min, max) {
return Math.random() * (max - min) + min
}
function randInt(min, max) {
return Math.floor(randNum(min, max))
}
function deepCopy(object) {
if (typeof object !== "object" || object === null) {
return object
}
const newObject = Array.isArray(object) ? [] : {}
for (const key in object) {
newObject[key] = deepCopy(object[key])
}
return newObject
}
function clone(object) {
const newObject = new Obj({
transform: new Transform({
transform: deepCopy(object.transform),
}),
...(object.sprite
? {
sprite: new Sprite(object.sprite.color, object.sprite.width, object.sprite.height),
}
: {}),
})
for (const key in object) {
if (object.hasOwnProperty(key) && !newObject.hasOwnProperty(key)) {
if (typeof object[key] === "function") {
newObject[key] = object[key].bind(newObject)
} else {
newObject[key] = object[key]
}
}
}
objects.push(newObject)
newObject.start?.()
}
function createObject({ object, transform, sprite }) {
const newObject = deepCopy(object)
newObject.awake?.()
newObject.start?.()
}
function del(object, timeout = 0) {
setTimeout(() => {
if (objects.includes(object)) {
for (const key in object) {
delete object[key]
}
objects.splice(objects.indexOf(object), 1)
}
}, timeout)
}
function now() {
return window.performance.now()
}
function clear() {
ctx.fillStyle = "black"
ctx.fillRect(0, 0, canvas.width, canvas.height)
}
function drawBox(x, y, w, h, color) {
if (color) ctx.fillStyle = color
ctx.fillRect(x, y, w, h)
}
function drawBoxMiddle(x, y, w, h, color) {
if (color) {
ctx.fillStyle = color
}
ctx.fillRect(x, y, w, h)
}
function drawText(text, x, y, color, h, textAlign, textBaseline) {
if (color) ctx.fillStyle = color
if (h) ctx.font = h + "px Arial"
if (textBaseline) ctx.textBaseline = textBaseline
if (textAlign) ctx.textAlign = textAlign
ctx.fillText(text, x, y)
}
async function wait(time) {
await new Promise((resolve) => setTimeout(resolve, time))
}
function allStart() {
for (const o of objects) {
o.start?.()
}
}
function update() {
let gravityTimer = now()
for (const o of objects) {
o.gravity?.update()
}
gravityTimer = now() - gravityTimer
let userTimer = now()
for (const o of objects) {
o.update?.()
}
userTimer = now() - userTimer
let allTimer = gravityTimer + userTimer
let gravityPercent = 0
if (gravityTimer > 0) {
gravityPercent = (gravityTimer / allTimer) * 100
}
let userPercent = 0
if (userTimer > 0) {
userPercent = (userTimer / allTimer) * 100
}
timers.update.gravity = gravityPercent
timers.update.user = userPercent
timers.update.all = allTimer
}
function render() {
clear()
let spriteTimer = now()
for (const o of objects) {
o.sprite?.render(o.transform)
}
spriteTimer = now() - spriteTimer
let userTimer = now()
for (const o of objects) {
o.render?.()
}
userTimer = now() - userTimer
const allTimer = spriteTimer + userTimer
let userPercent = 0
if (userTimer > 0) {
userPercent = (userTimer / allTimer) * 100
}
let spritePercent = 0
if (spriteTimer > 0) {
spritePercent = (spriteTimer / allTimer) * 100
}
const h = 16
const x = 200
drawText(
objects.length + " objects " + updatesLegit + "ups " + framesLegit + " fps",
canvas.width - 2,
2,
"white",
h,
"right",
"top"
)
drawText("Update", 0, 0, "white", h, "left", "top")
drawText("Gravity: " + timers.update.gravity.toFixed(2) + "%", 0, h, "white", h, "left", "top")
drawText("Dev Update: " + timers.update.user.toFixed(2) + "%", 0, h * 2, "white", h, "left", "top")
drawText(
"All: " + timers.update.all.toFixed(2) + "ms " + ((timers.update.all / ms) * 100).toFixed(2) + "% time",
0,
h * 3,
"white",
h,
"left",
"top"
)
drawText("Render", x, 0, "white", h, "left", "top")
drawText("Sprite: " + spritePercent.toFixed(2) + "%", x, h, "white", h, "left", "top")
drawText("Dev Render: " + userPercent.toFixed(2) + "%", x, h * 2, "white", h, "left", "top")
drawText(
"All: " + allTimer.toFixed(2) + "ms " + ((allTimer / ms) * 100).toFixed(2) + "% time",
x,
h * 3,
"white",
h,
"left",
"top"
)
}
async function run() {
let lastTime = now()
let timer = now()
let frames = 0
let updates = 0
let delta = 0
while (running) {
let nowVar = now()
delta += (nowVar - lastTime) / ms
lastTime = nowVar
while (delta >= 1) {
update()
updates++
delta--
}
render()
frames++
if (now() - timer > 1000) {
timer += 1000
updatesLegit = updates
framesLegit = frames
updates = 0
frames = 0
}
await wait(1)
}
}
class Obj {
constructor({ transform, sprite, script, start }) {
this.transform = transform
if (sprite) this.sprite = sprite
if (script)
for (const key in script) {
if (script.hasOwnProperty(key)) this[key] = script[key]
}
if (start) start()
}
}
class Transform {
constructor({ transform, position, rotation, scale }) {
this.position = {
x: 0,
y: 0,
}
this.rotation = 0
this.scale = {
x: 1,
y: 1,
}
if (transform) {
this.position = deepCopy(transform.position)
this.rotation = transform.rotation
this.scale = deepCopy(transform.scale)
}
if (position) {
this.position = {
x: position.x,
y: position.y,
}
}
if (rotation) {
this.rotation = rotation
}
if (scale) {
this.scale = {
x: scale.x,
y: scale.y,
}
}
}
}
class Sprite {
constructor(color, width, height) {
this.color = color
this.width = width
this.height = height
}
render(transform) {
drawBoxMiddle(
transform.position.x,
transform.position.y,
transform.scale.x * this.width,
transform.scale.y * this.height,
this.color
)
}
}
class Scene {
constructor(objects) {
this.objects = []
for (const key in objects) {
const object = objects[key]
this[key] = object
this.objects.push(object)
}
}
load() {
selectedScene.quit()
selectedScene = this
for (const o of this.objects) {
objects.push(o)
}
allStart()
}
quit() {
objects.length = 0
}
}`
const hierarchy = document.getElementById(`hierarchy`)
const inspector = document.getElementById(`inspector`)
const objects = []
const scenes = [{ objects: [] }]
let selectedScene = scenes[0]
const config = {
gameName: `Name of Game`,
screenWidth: 1600,
screenHeight: 900,
fullScreen: true,
safeUnload: false,
version: 0,
author: `Your Name or Nick`,
description: `Write what game is`,
}
let editorLoad = false
const selectedOptions = {
HIERARCHY: 0,
FILES: 1,
INSPECTOR: 2,
}
let selectedField = selectedOptions.HIERARCHY
const selectedFilePath = [`files`]
let selectedFileName = ``
let selectedFile = ``
let selectedObject = undefined
let inInspector = true
function createElement({
name = `div`,
text = ``,
className,
style,
onclick,
id,
child,
childs,
type,
onchange,
oninput,
change,
input,
}) {
const element = document.createElement(name)
if (!type) {
switch (name) {
case `input`:
case `textarea`:
element.type = `text`
element.value = text
break
case ``:
break
default:
element.textContent = text
break
}
} else {
element.type = type
}
if (id) {
element.id = id
}
if (className) {
element.className = className
}
if (style) {
element.style = style
}
if (onclick) {
element.onclick = onclick
element.style.cursor = `pointer`
}
if (child) {
element.appendChild(child)
} else if (childs) {
for (const child of childs) {
element.appendChild(child)
}
}
if (onchange) {
element.onchange = onchange
}
if (oninput) {
element.oninput = oninput
}
if (change) {
element.change = change
}
if (input) {
element.input = input
}
return element
}
function createSection(text, properties, removeButtonFunction) {
const div = createElement({
className: `section`,
})
div.appendChild(
createElement({
className: `headerOfSection`,
childs: [
createElement({
text: text,
style: `
margin-bottom: 5px;
font-weight: bold;
border-left: 2px black solid;
padding: 2px;
`,
}),
createElement(
removeButtonFunction
? {
text: `Remove`,
onclick: removeButtonFunction,
}
: {}
),
],
})
)
for (const property of properties) {
div.appendChild(property)
}
return div
}
function createValueInput(textElement, inputElement) {
const div = createElement({
className: `valueInput`,
})
textElement.style.margin = `2px`
textElement.style.fontSize = `16px`
inputElement.style.border = `2px solid black`
inputElement.style.padding = `0 0 0 1px`
inputElement.style.fontSize = `16px`
div.appendChild(textElement)
div.appendChild(inputElement)
return div
}
function randNum(min, max) {
return Math.random() * (max - min) + min
}
function randInt(min, max) {
return Math.floor(randNum(min, max))
}
function deepCopy(object) {
if (typeof object !== `object` || object === null) {
return object
}
const newObject = Array.isArray(object) ? [] : {}
for (const key in object) {
newObject[key] = deepCopy(object[key])
}
return newObject
}
function updateTitle() {
document.title = `${config.gameName} | ${config.version} | HEngine`
}
function downloadFile(name, src) {
const htmlElement = createElement({ name: `a` })
htmlElement.href = src
htmlElement.download = name
htmlElement.click()
}
function copyElement() {
const object = new Obj({})
object.transform = deepCopy(selectedObject.transform)
if (selectedObject.sprite) {
new Sprite({
object: object,
color: selectedObject.sprite.color,
width: selectedObject.sprite.width,
height: selectedObject.sprite.height,
})
}
if (selectedObject.script) {
object.script = selectedObject.script
}
}
function findElementByName(name) {
return objects.find((o) => o.name === name)
}
class TextEditor {
textBox = createElement({
name: `textarea`,
text: `text`,
className: `textEditorTextarea`,
})
exitButton = createElement({
name: `a`,
text: `Exit`,
className: `textEditorExitButton`,
onclick: this.hide,
})
div = createElement({
className: `textEditor`,
childs: [this.textBox, this.exitButton],
})
show() {
this.textBox.value = selectedObject.script
document.body.appendChild(this.textBox)
document.body.appendChild(this.exitButton)
}
hide() {
selectedObject.script = this.textBox.value
scriptInput.value = this.textBox.value
document.body.removeChild(this.textBox)
document.body.removeChild(this.exitButton)
}
}
class myImage {
constructor(object, imagePath, rx = 0, ry = 0) {
this.image = imagePath
this.rectTransform = { x: rx, y: ry }
object.image = this
}
render(transform) {
ctx.save()
ctx.rotate(transform.rotation)
ctx.drawImage(
this.image,
transform.position.x - (this.image.width / 2) * this.rectTransform.x,
transform.position.y - (this.image.height / 2) * this.rectTransform.y,
this.image.width * transform.scale.x,
this.image.height * transform.scale.y
)
ctx.restore()
}
static toJson(imageJS) {
return JSON.stringify({
image: {
src: imageJS.image.src,
width: imageJS.image.width,
height: imageJS.image.height,
},
position: imageJS.position,
rotation: imageJS.rotation,
rectTransform: imageJS.rectTransform,
})
}
static toJs(imageJson) {
new myImage({
image: objectToImage(imageJson.image),
position: imageJson.position,
rotation: imageJson.rotation,
rectTransform: imageJson.rectTransform,
})
}
}
function imagesToJs(file = files) {
for (const key in file) {
if (file[key].type == `image`) {
file[key] = myImage.toJs(file[key].image)
} else if (file[key].type == `folder`) {
imagesToJs(file[key])
}
}
}
function htmlCode() {
return codeOptimalize(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="author" content="${config.author}">
<meta name="description" content="${config.description}">
<meta name="keywords" content="${config.gameName}, ${config.author}">
<title>${config.gameName}</title>
<style>
body {
background-color:black;
margin:0;
border:0;
padding:0;
width:100%;
height:100%;
}
canvas { display:block; }
</style>
</head>
<body>
<canvas id="gameCanvas" width="${config.screenWidth}" height="${
config.screenHeight
}"></canvas>
<script>
${jsCode()}
</script>
</body>
</html>
`)
}
const codeOptimalize = (text) =>
text
.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ``)
.split(`\n`)
.map((line) => line.trim())
.filter((line) => line !== ``)
.join(`\n`)
function fullScreen() {
return config.fullScreen
? `
function resize() {
canvas.width = window.innerWidth
canvas.height = window.innerHeight
}
window.addEventListener("resize", resize)
window.addEventListener("contextmenu", (e) => {
e.preventDefault()
!document.fullscreenElement ? document.documentElement.requestFullscreen() : document.exitFullscreen()
})
`
: ``
}
function safeUnload() {
return config.safeUnload
? `
window.addEventListener("beforeunload", (event) => {
event.preventDefault()
console.log("exit")
})
`
: ``
}
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
const scenes = [${scenes.reduce((prev, s) => `${prev}new Scene(${allObjects(s.objects)}),`, ``)}]
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
downloadFile(`${config.gameName}.html`, `data:text/html;charset=utf-8,${encodeURIComponent(htmlCode())}`)
}
function findName(name) {
if (!findElementByName(name)) {
return name
}
let help = 0
while (findElementByName(name + help.toString())) {
help++
}
return name + help.toString()
}
class Obj {
constructor({ name, transform, script, sprite }) {
if (name) {
this.name = findName(name)
} else {
this.name = findName(`NewObject`)
}
if (transform) {
this.transform = transform
} else {
this.transform = {
position: {
x: 0,
y: 0,
},
rotation: 0,
scale: {
x: 1,
y: 1,
},
}
}
if (sprite) {
this.sprite = sprite
}
if (script) {
this.script = script
}
this.children = []
objects.push(this)
}
toJson() {
const object = {
name: this.name,
transform: this.transform,
}
if (this.sprite) {
object.sprite = this.sprite
}
if (this.script) {
object.script = this.script
}
if (this.text) {
object.text = this.text
}
return object
}
static toJs(object) {
const jsObject = {
name: object.name,
transform: object.transform,
}
if (object.sprite) {
jsObject.sprite = object.sprite
}
if (object.script) {
jsObject.script = object.script
}
if (object.text) {
jsObject.text = object.text
}
return new Obj(jsObject)
}
}
const NAME = {
div: createElement({
name: `input`,
text: `ObjectName`,
}),
add(componentDiv) {
this.div = createElement({
name: `input`,
text: selectedObject.name,
})
componentDiv.appendChild(
createSection(`Name`, [
createValueInput(
createElement({
text: `Name`,
}),
this.div
),
])
)
},
refresh() {
this.div.value = selectedObject.name
},
update() {
let n = this.div.value
if (n != selectedObject.name) {
n = findName(n)
}
selectedObject.name = n
},
}
const TRANSFORM = {
positionX: createElement({
name: `input`,
id: `positionX`,
text: 0,
}),
positionY: createElement({
name: `input`,
id: `positionY`,
text: 0,
}),
rotation: createElement({
name: `input`,
id: `rotation`,
text: 0,
}),
scaleX: createElement({
name: `input`,
id: `scaleX`,
text: 1,
}),
scaleY: createElement({
name: `input`,
id: `scaleY`,
text: 1,
}),
add(componentDiv) {
const div1 = createElement({
childs: [
createValueInput(
createElement({
text: `x`,
}),
this.positionX
),
createValueInput(
createElement({
text: `y`,
}),
this.positionY
),
],
})
const div2 = createElement({
child: createValueInput(
createElement({
text: `z`,
}),
this.rotation
),
})
const div3 = createElement({
childs: [
createValueInput(
createElement({
text: `x`,
}),
this.scaleX
),
createValueInput(
createElement({
text: `y`,
}),
this.scaleY
),
],
})
componentDiv.appendChild(
createSection(`Transform`, [
createElement({
text: `Position`,
style: `margin-bottom:6px;`,
className: `tab`,
child: div1,
}),
createElement({
text: `Rotation`,
style: `margin-bottom:6px;`,
className: `tab`,
child: div2,
}),
createElement({
text: `Scale`,
style: `margin-bottom:6px;`,
className: `tab`,
child: div3,
}),
])
)
},
refresh() {
this.positionX.value = selectedObject.transform.position.x
this.positionY.value = selectedObject.transform.position.y
this.rotation.value = selectedObject.transform.rotation
this.scaleX.value = selectedObject.transform.scale.x
this.scaleY.value = selectedObject.transform.scale.y
},
update() {
selectedObject.transform.position.x = Number(this.positionX.value) || 0
selectedObject.transform.position.y = Number(this.positionY.value) || 0
selectedObject.transform.rotation = Number(this.rotation.value) || 0
selectedObject.transform.scale.x = Number(this.scaleX.value) || 0
selectedObject.transform.scale.y = Number(this.scaleY.value) || 0
},
}
const SPRITE = {
defaultPath: `files.engineAssets.tempImage`,
sprite: createSection(
`Sprite`,
[
createValueInput(
createElement({
text: `Color`,
}),
createElement({
name: `input`,
id: `spriteInput`,
text: `Color`,
})
),
createValueInput(
createElement({
text: `Image Path`,
}),
createElement({
name: `input`,
id: `imagePathInput`,
text: `Path`,
})
),
],
() => {
delete selectedObject.sprite
refreshInspector()
}
),
addSprite: createElement({
text: `Add Sprite`,
className: `addNewComponent`,
onclick: () => {
SPRITE.set()
},
}),
add(componentDiv, addComponentDiv) {
componentDiv.appendChild(this.sprite)
if (!selectedObject?.sprite) {
this.sprite.style.display = `none`
} else {
this.addSprite.style.display = `none`
}
addComponentDiv.appendChild(this.addSprite)
},
refresh() {
if (selectedObject.sprite) {
document.getElementById(`spriteInput`).value = selectedObject.sprite.color
document.getElementById(`imagePathInput`).value =
selectedObject.sprite.imagePath
this.sprite.style.display = `block`
this.addSprite.style.display = `none`
} else {
document.getElementById(`spriteInput`).value = `blue`
document.getElementById(`imagePathInput`).value = this.defaultPath
this.sprite.style.display = `none`
this.addSprite.style.display = `block`
}
},
update() {
if (selectedObject.sprite) {
selectedObject.sprite.color = document.getElementById(`spriteInput`).value
selectedObject.sprite.imagePath =
document.getElementById(`imagePathInput`).value
}
},
set() {
selectedObject.sprite = {
color: `blue`,
width: 1,
height: 1,
imagePath: this.defaultPath,
}
},
}
const SCRIPT = {
script: createSection(
`Script`,
[
createElement({
childs: [
createElement({
name: `textarea`,
id: `scriptInput`,
style: `height: 300px; width: 100%; color: white;`,
}),
createElement({
text: `Full open`,
onclick: TextEditor.show,
}),
],
}),
],
() => {
delete selectedObject.script
refreshInspector()
}
),
addScript: createElement({
text: `Add Script`,
className: `addNewComponent`,
onclick: () => {
selectedObject.script = defaultScript
document.getElementById(`scriptInput`).value = selectedObject.script
},
}),
add(componentDiv, addComponentDiv) {
componentDiv.appendChild(this.script)
if (!selectedObject?.script) {
this.script.style.display = `none`
}
addComponentDiv.appendChild(this.addScript)
},
refresh() {
if (selectedObject.script) {
document.getElementById(`scriptInput`).value = selectedObject.script
this.script.style.display = `block`
this.addScript.style.display = `none`
} else {
document.getElementById(`scriptInput`).value = ``
this.script.style.display = `none`
this.addScript.style.display = `block`
}
},
update() {
if (selectedObject.script) {
selectedObject.script = document.getElementById(`scriptInput`).value
}
},
}
const defaultScript = `start() {
this.transform.position.y = randInt(0, 1080)
this.speed = randNum(0, 10)
},
update() {
this.transform.position.x += this.speed
this.speed -= randNum(0.01, 0.015)
if(this.transform.position.x > 1920) {
this.transform.position.x -= 1920
} else if(this.transform.position.x < 0) {
this.transform.position.x = 1920
}
}`
const TEXT = {
defaultText: `Text`,
text: createSection(
`Text`,
[
createValueInput(
createElement({
text: `Color`,
}),
createElement({
name: `input`,
id: `colorTextInput`,
text: `Color`,
})
),
createValueInput(
createElement({
text: `Text`,
}),
createElement({
name: `input`,
id: `textInput`,
text: `Text`,
})
),
],
() => {
delete selectedObject.text
refreshInspector()
}
),
addText: createElement({
text: `Add Text`,
className: `addNewComponent`,
onclick: () => {
TEXT.set()
},
}),
add(componentDiv, addComponentDiv) {
componentDiv.appendChild(this.text)
if (!selectedObject?.text) {
this.text.style.display = `none`
} else {
this.addText.style.display = `none`
}
addComponentDiv.appendChild(this.addText)
},
refresh() {
if (selectedObject.text) {
document.getElementById(`colorTextInput`).value =
selectedObject.text.color
document.getElementById(`textInput`).value = selectedObject.text.text
this.text.style.display = `block`
this.addText.style.display = `none`
} else {
document.getElementById(`colorTextInput`).value = `blue`
document.getElementById(`textInput`).value = this.defaultText
this.text.style.display = `none`
this.addText.style.display = `block`
}
},
update() {
if (selectedObject.text) {
selectedObject.text.color =
document.getElementById(`colorTextInput`).value
selectedObject.text.text = document.getElementById(`textInput`).value
}
},
set() {
selectedObject.text = {
color: `blue`,
text: this.defaultText,
width: 1,
height: 1,
size: 30,
rectTransform: {
x: 0,
y: 0,
},
}
},
}
const CONFIG = {
gameName: createValueInput(
createElement({
text: `Name of Game (Version: ${config.version})`,
}),
createElement({
name: `input`,
id: `nameOfGameInput`,
text: config.name,
oninput: () => {
config.gameName = document.getElementById(`nameOfGameInput`).value
updateTitle()
},
})
),
fullScreen: createValueInput(
createElement({
text: `Full Screen`,
}),
createElement({
name: `input`,
id: `fullScreenCheckbox`,
type: `checkbox`,
onchange: function () {
config.fullScreen = this.checked
},
})
),
safeUnload: createValueInput(
createElement({
text: `Safe Unload`,
}),
createElement({
name: `input`,
id: `safeUnload`,
type: `checkbox`,
onchange: function () {
config.safeUnload = this.checked
},
})
),
author: createValueInput(
createElement({
text: `Game Author`,
}),
createElement({
name: `input`,
id: `authorField`,
oninput: () => {
config.author = document.getElementById(`authorField`).value
},
})
),
description: createValueInput(
createElement({
text: `Description`,
}),
createElement({
name: `input`,
id: `descriptionField`,
oninput: () => {
config.description = document.getElementById(`descriptionField`).value
},
})
),
show() {
if (inInspector) {
inInspector = false
cleanInspector()
inspector.appendChild(
createSection(`Config`, [
createElement({
text: `Basic info`,
}),
CONFIG.gameName,
CONFIG.author,
CONFIG.description,
CONFIG.fullScreen,
CONFIG.safeUnload,
])
)
document.getElementById(`nameOfGameInput`).value = config.gameName
document.getElementById(`authorField`).value = config.author
document.getElementById(`descriptionField`).value = config.description
document.getElementById(`fullScreenCheckbox`).checked = config.fullScreen
document.getElementById(`safeUnload`).checked = config.safeUnload
} else {
inInspector = true
deepRefresh()
}
},
}
function startTestGame() {
let newWindow = window.open()
newWindow.document.write(htmlCode())
}
function save() {
config.version++
const jsonData = JSON.stringify({
config,
files,
objects,
})
const src = `data:application/json;charset=utf-8,${encodeURIComponent(
jsonData
)}`
downloadFile(`${config.gameName}${config.version}.json`, src)
updateTitle()
}
const plikInput = document.getElementById(`plikInput`)
plikInput.addEventListener(`change`, ({ target }) => {
const file = target.files[0]
const reader = new FileReader()
reader.onload = ({ target }) => {
setData(JSON.parse(target.result))
}
reader.readAsText(file)
})
function clearData() {
for (const key in files) delete files[key]
objects.length = 0
}
function setData(data) {
clearData()
for (const key in data.config) config[key] = data.config[key]
for (const key in data.files) files[key] = data.files[key]
for (const o of data.objects) Obj.toJs(o)
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
function refreshHierarchy() {
hierarchy.innerHTML = ``
for (const object of objects) {
hierarchy.appendChild(createHierarchyElement(object))
}
}
function createNewObject() {
new Obj({})
refreshHierarchy()
}
function createHierarchyElement(object) {
const div = createElement({})
div.appendChild(
createElement({
text: object.name,
className: `tab`,
onclick: () => {
refreshInspector(object)
},
})
)
if (object == selectedObject) {
div.style.color = `yellow`
}
if (object.children && object.children.length > 0) {
for (const child of object.children) {
div.appendChild(createHierarchyElement(child))
}
}
return div
}
const filesElement = createElement({ style: `padding:5px;` })
document.getElementById(`files`).appendChild(filesElement)
const files = {
type: `folder`,
engineAssets: {
type: `folder`,
tempImage: {
type: `image`,
value: {
src: `data:image/png;base64`,
width: 1,
height: 1,
},
},
},
folder1: {
type: `folder`,
object2: {
type: `text`,
value: `str 2`,
},
obj3: {
type: `folder`,
obj4: {
type: `text`,
value: `str 3`,
},
obj5: {
type: `text`,
value: `str 4`,
},
},
},
folder2: {
type: `folder`,
object2: {
type: `text`,
value: `str 5`,
},
obj2: {
type: `folder`,
obj4: {
type: `text`,
value: `str 5`,
},
obj5: {
type: `text`,
value: `str 8`,
},
},
},
}
const FILES = {
next() {
const obiekt = getCurrentFolder()
const keys = Object.keys(obiekt).filter((item) => item !== `type`)
let indexNow = keys.indexOf(selectedFileName)
indexNow++
if (indexNow >= keys.length) {
indexNow = 0
}
selectedFileName = keys[indexNow]
selectedFile = obiekt[selectedFileName]
refreshFiles()
},
left() {
if (selectedFilePath.length > 1) {
selectedFilePath.pop()
this.refreshSelectedFile()
}
},
right(name = selectedFileName) {
if (selectedFile?.type == `folder`) {
selectedFilePath.push(name)
this.refreshSelectedFile()
}
},
refreshSelectedFile() {
const element = selectedFilePath.reduce(
(acc, f) => (f !== `files` ? acc[f] : acc),
files
)
selectedFileName = Object.keys(element).find((key) => key != `type`)
selectedFile = element[selectedFileName]
refreshFiles()
},
}
function newFile(name = `NewFile`) {
const file = name
selectedFile = file
}
function refreshFiles() {
filesElement.innerHTML = ``
allFileStructureToHtml()
addFileInfo()
}
function createFileElement(file, name) {
const element = createElement({
text: `${name} (${file.type})`,
style: `margin-left:16px; cursor:pointer;`,
})
if (file.type == `folder`) {
element.addEventListener(`click`, () => {
FILES.right(name)
})
} else {
element.addEventListener(`click`, () => {
selectedFile = file
refreshFiles(file)
})
}
if (file == selectedFile) {
element.style.color = `yellow`
}
return element
}
function allFileStructureToHtml() {
const div = createElement({})
const filePathElement = createElement({
style: `display:flex;`,
})
let i = 1
for (const f of selectedFilePath) {
const j = i
filePathElement.appendChild(
createElement({
text: f + `.`,
onclick: () => {
selectedFilePath.length = j
refreshFiles()
},
})
)
i++
}
div.appendChild(filePathElement)
const newElement = createElement({
text: `..`,
style: `margin-left:16px; cursor: pointer;`,
})
if (selectedFilePath.length > 1) {
newElement.addEventListener(`click`, () => {
FILES.left()
})
}
div.appendChild(newElement)
const element = getCurrentFolder()
for (const key in element) {
if (key != `type`) {
div.appendChild(createFileElement(element[key], key))
}
}
filesElement.appendChild(div)
}
function addFileInfo() {
filesElement.appendChild(
createElement({
style: `margin-top:50px;`,
childs: [
createElement({
style: `display:flex;`,
childs: [
createElement({
name: `input`,
text: selectedFileName,
style: `margin-right:16px;`,
onchange: (event) => {
const folder = getCurrentFolder()
selectedFile = deepCopy(selectedFile)
delete folder[selectedFileName]
selectedFileName = checkString(event.target.value)
folder[selectedFileName] = selectedFile
refreshFiles()
},
}),
createElement({
text: `(${selectedFile?.type})`,
}),
createElement({
text: `Delete file`,
onclick: deleteSelectedFile,
}),
],
}),
createElement({
text: JSON.stringify(selectedFile),
}),
],
})
)
}
function getCurrentFolder() {
let element = files
for (const f of selectedFilePath) {
if (f !== `files`) element = element[f]
}
return element
}
function addNewFolder() {
const folder = getCurrentFolder()
const name = checkFileName(`NewFile`)
folder[name] = { type: `folder` }
refreshFiles()
}
function importFile() {}
function checkFileName(name) {
const folder = getCurrentFolder()
if (!findFileByName(name, folder)) return name
let i = 0
while (findFileByName(name + i, folder)) i++
return name + i
}
function findFileByName(name, folder = files) {
return name in folder
}
function copyCurrentPath() {
let path = ``
for (const p of selectedFilePath) {
path += p + `.`
}
path += selectedFileName
navigator.clipboard.writeText(path)
}
function deleteSelectedFile() {
const folder = getCurrentFolder()
delete folder[selectedFileName]
FILES.refreshSelectedFile()
}
function checkString(string) {
return string.replace(/^\d+|\W+/g, ``)
}
function cleanInspector() {
inspector.innerHTML = ``
}
function deepRefresh() {
inInspector = true
cleanInspector()
if (!selectedObject) {
return
}
const componentDiv = createElement({})
const addComponentDiv = createElement({
style: `margin: 2px;`,
childs: [
createElement({
style: `tab`,
text: `Add New Component`,
}),
],
})
NAME.add(componentDiv)
TRANSFORM.add(componentDiv)
SPRITE.add(componentDiv, addComponentDiv)
SCRIPT.add(componentDiv, addComponentDiv)
TEXT.add(componentDiv, addComponentDiv)
inspector.appendChild(componentDiv)
inspector.appendChild(addComponentDiv)
}
function refreshInspector(object) {
inInspector = true
inWhat = 0
updateValue()
if (object) {
selectedObject = object
deepRefresh()
}
if (!selectedObject) {
return
}
NAME.refresh()
TRANSFORM.refresh()
SPRITE.refresh()
SCRIPT.refresh()
TEXT.refresh()
refreshHierarchy()
}
function updateValue() {
if (!selectedObject) {
return
}
NAME.update()
TRANSFORM.update()
SPRITE.update()
SCRIPT.update()
TEXT.update()
}
function deleteSelectedObject() {
if (selectedObject) {
objects.splice(objects.indexOf(selectedObject), 1)
if (objects.length == 0) {
selectedObject = new Obj({})
} else {
selectedObject = objects[0]
}
refreshHierarchy()
} else {
console.error(objects)
}
}
document
.querySelector(`.hierarchyBox`)
.addEventListener(`click`, () => (selectedField = selectedOptions.HIERARCHY))
document
.querySelector(`.filesBox`)
.addEventListener(`click`, () => (selectedField = selectedOptions.FILES))
document
.querySelector(`.inspectorBox`)
.addEventListener(`click`, () => (selectedField = selectedOptions.INSPECTOR))
document.addEventListener(`keydown`, (e) => {
if (e.ctrlKey)
switch (e.key) {
case `s`:
e.preventDefault()
save()
break
case `d`:
e.preventDefault()
copyElement()
refreshHierarchy()
break
case `q`:
e.preventDefault()
startTestGame()
break
case `y`:
e.preventDefault()
CONFIG.show()
break
}
})
function saveScene() {
selectedScene.objects = deepCopy(objects)
}
document.addEventListener(`click`, saveScene)
document.addEventListener(`click`, () => {
if (inInspector) {
refreshInspector()
}
})
window.addEventListener(`load`, () => (editorLoad = true))
FILES.refreshSelectedFile()
refreshFiles()
saveScene()
updateTitle()
refreshHierarchy()
refreshFiles()
deepRefresh()
new Obj({
script: `start() {
for(let i = 0; i < 20000; i++) {
clone(selectedScene.NewObject0)
}
}`,
})
refreshInspector(new Obj({ script: defaultScript }))