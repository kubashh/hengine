function allStart() {
  for (const o of objects) o.start?.()
}

function update() {
  let gravityTimer = now()
  for (const o of objects) o.gravity?.update()
  gravityTimer = now() - gravityTimer

  let userTimer = now()
  for (const o of objects) o.update?.()
  userTimer = now() - userTimer

  let allTimer = gravityTimer + userTimer

  const gravityPercent = gravityTimer > 0 ? (gravityTimer / allTimer) * 100 : 0
  const userPercent = userTimer > 0 ? (userTimer / allTimer) * 100 : 0

  timers.update.gravity = gravityPercent
  timers.update.user = userPercent
  timers.update.all = allTimer
}

function render() {
  clear()

  let spriteTimer = now()
  for (const o of objects) o.sprite?.render(o.transform)
  spriteTimer = now() - spriteTimer

  let userTimer = now()
  for (const o of objects) o.render?.()

  userTimer = now() - userTimer
  const allTimer = spriteTimer + userTimer

  const userPercent = userTimer > 0 ? (userTimer / allTimer) * 100 : 0
  const spritePercent = spriteTimer > 0 ? (spriteTimer / allTimer) * 100 : 0

  const h = 16
  const x = 200

  drawText(
    `${objects.length} objects ${updatesLegit}ups ${framesLegit}fps`,
    canvas.width - 2,
    2,
    `white`,
    h,
    `right`,
    `top`
  )

  // Update
  drawText(`Update`, 0, 0, `white`, h, `left`, `top`)
  drawText(`Gravity: ${timers.update.gravity.toFixed(2)}%`, 0, h, `white`, h, `left`, `top`)
  drawText(`Dev Update: ${timers.update.user.toFixed(2)}%`, 0, h * 2, `white`, h, `left`, `top`)
  drawText(
    `All: ${timers.update.all.toFixed(2)}ms ${((timers.update.all / ms) * 100).toFixed(2)}% time`,
    0,
    h * 3,
    `white`,
    h,
    `left`,
    `top`
  )

  // Render
  drawText(`Render`, x, 0, `white`, h, `left`, `top`)
  drawText(`Sprite: ${spritePercent.toFixed(2)}%`, x, h, `white`, h, `left`, `top`)
  drawText(`Dev Render: ${userPercent.toFixed(2)}%`, x, h * 2, `white`, h, `left`, `top`)
  drawText(
    `All: ${allTimer.toFixed(2)}ms ${((allTimer / ms) * 100).toFixed(2)}% time`,
    x,
    h * 3,
    `white`,
    h,
    `left`,
    `top`
  )

  frames++
  requestAnimationFrame(render)
}

let frames = 0
async function run() {
  requestAnimationFrame(render)

  let lastTime = now()
  let timer = now()
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
