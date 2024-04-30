function startTestGame() {
  let newWindow = window.open()
  newWindow.document.write(htmlCode())
  //setTimeout(() => { newWindow.close() }, 10000)
}
