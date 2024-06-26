function fullScreen() {
  if(!config.fullScreen) {
    return ""
  }
  return `
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
  `
}


function safeUnload() {
  if(!config.safeUnload) {
    return ""
  }
  return `
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault()
      console.log("exit")
    })
  `
}

