function createTextTextReadOnly(text1, text2) {
  return createHtmlElement({
    style: "margin: 3px 10px; display: flex; justify-content: space-between;",
    childs: [
      createHtmlElement({
        text: text1
      }),
      createHtmlElement({
        text: text2
      })
    ]
  })
}


function createLogSection(text, array) {
  const div = createHtmlElement({
    style: "margin: 10px;",
    child: createHtmlElement({
      text: text,
      style: "font-weight: bold;"
    })
  })

  for(t of array) {
    div.appendChild(createHtmlElement({
      text: `- ${t}`,
      className: "tab"
    }))
  }

  return div
}


function createLogElement() {
  const div = createHtmlElement({
  })

  let array = []

  for(let key in log) {
    array.unshift({text: key, array: log[key]})
  }
  
  for(let a of array) {
    div.appendChild(createLogSection(a.text, a.array))
  }

  return div
}


const ENGINEINFO = {
  show() {
    if(inInspector) {
      inInspector = false
        
      cleanInspector()

      inspector.appendChild(createSection(
        "Info about HEngine",
        [
          createTextTextReadOnly("Type", info.type),
          createTextTextReadOnly("Name", info.name),
          createTextTextReadOnly("Programming Language", info.lang),
          createTextTextReadOnly("Current Version", info.currentVersion)
        ]
      ))
      inspector.appendChild(createSection(
        "Versions",
        [
          createLogElement()
        ]
      ))
    } else {
      inInspector = true
      deepRefresh()
    }
  }
}
