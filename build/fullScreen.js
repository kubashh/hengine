function fullScreen() {
  return config.fullScreen
    ? `
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

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
