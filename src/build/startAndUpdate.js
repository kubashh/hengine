const startAndUpdate = `
  function allStart() {
    for(const o of objects) {
      o.start?.()
    }
  }

  timers = {
    update: {
      gravity: 0,
      user: 0,
      all: 0
    }
  }

  function update() {
    let gravityTimer = now()
    for(const o of objects) {
      o.gravity?.update()
    }
    gravityTimer = now() - gravityTimer

    let userTimer = now()
    for(const o of objects) {
      o.update?.()
    }
    userTimer = now() - userTimer

    let allTimer = gravityTimer + userTimer

    let gravityPercent = 0
    if(gravityTimer > 0) {
      gravityPercent = (gravityTimer / allTimer) * 100
    }
    let userPercent = 0
    if(userTimer > 0) {
      userPercent = (userTimer / allTimer) * 100
    }

    timers.update.gravity = gravityPercent
    timers.update.user = userPercent
    timers.update.all = allTimer
  }

  function render() {
    clear()

    let spriteTimer = now()
    for(const o of objects) {
      o.sprite?.render(o.transform)
    }
    spriteTimer = now() - spriteTimer
    
    let userTimer = now()
    for(const o of objects) {
      o.render?.()
    }
    userTimer = now() - userTimer

    const allTimer = spriteTimer + userTimer


    let userPercent = 0
    if(userTimer > 0) {
      userPercent = (userTimer / allTimer) * 100
    }
    let spritePercent = 0
    if(spriteTimer > 0) {
      spritePercent = (spriteTimer / allTimer) * 100
    }


    const h = 16
    const x = 200

    drawText(objects.length + " objects " + updatesLegit + "ups " + framesLegit + " fps", canvas.width - 2, 2, "white", h, "right", "top")

    // Update
    drawText("Update", 0, 0, "white", h, "left", "top")
    drawText("Gravity: " + timers.update.gravity.toFixed(2) + "%", 0, h, "white", h, "left", "top")
    drawText("Dev Update: " + timers.update.user.toFixed(2) + "%", 0, h * 2, "white", h, "left", "top")
    drawText("All: " + timers.update.all.toFixed(2) + "ms " + (timers.update.all / ms * 100).toFixed(2) + "% time", 0, h * 3, "white", h, "left", "top")

    // Render
    drawText("Render", x, 0, "white", h, "left", "top")
    drawText("Sprite: " + spritePercent.toFixed(2) + "%", x, h, "white", h, "left", "top")
    drawText("Dev Render: " + userPercent.toFixed(2) + "%", x, h * 2, "white", h, "left", "top")
    drawText("All: " + allTimer.toFixed(2) + "ms " + (allTimer / ms * 100).toFixed(2) + "% time", x, h * 3, "white", h, "left", "top")
  }

  let running = true
  const ms = 1000 / 60
  let updatesLegit = 0
  let framesLegit = 0

  async function run() {
    let lastTime = now()
    let timer = now()
    let frames = 0
    let updates = 0
    let delta = 0
    while(running) {
      let nowVar = now()
      delta += (nowVar - lastTime) / ms
      lastTime = nowVar
      while(delta >= 1) {
        update()
        updates++
        delta--
      }
      render()
      frames++

      if(now() - timer > 1000) {
        timer += 1000
        updatesLegit = updates
        framesLegit = frames
        updates = 0
        frames = 0
      }

      await wait(2)
    }
  }
`
