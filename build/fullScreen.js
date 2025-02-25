function fullScreen() {
  return config.fullScreen ? `
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })

    document.addEventListener("click", () => {
      if(document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else {
        console.error("pierdole")
      }
    })
  ` : ``
}


function safeUnload() {
  return config.safeUnload ? `
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault()
      console.log("exit")
    })
  ` : ``
}

