const filesElement = document.getElementById("files")
const files = {
  file1: {
    object1: "string"
  },
  file2: {
    object2: "str 2",
    obj3: {
      obj4: "ds",
      obj5: "dss"
    }
  }
}

console.log(files)

let selectedFile = files


function newFile(name = "NewFile") {
  let file = name
  //files.push(file)
  selectedFile = file
}


function refreshFiles() {
  while(filesElement.firstChild) {
    filesElement.removeChild(filesElement.firstChild)
  }

  allFileStructureToHtml()

  filesElement.appendChild(createHtmlElement({
    text: "Copy path",
    style: "curcor: pointer;",
    onclick: copyCurrentPath
  }))

  filesElement.appendChild(createHtmlElement({
    text: "+ Add New File",
    style: "curcor: pointer;",
    onclick: () => {
      addFile()
      refreshFiles()
    }
  }))
}


function createFileElement(div, file, name, deep) {
  let element = createHtmlElement({
    text: name,
    className: "tab" + deep,
    onclick: () => {
      selectedFile = file
      refreshFiles(file)
    }
  })

  if(file == selectedFile) {
    element.style.color = "yellow"
  }
  
  div.appendChild(element)

  if(typeof file === 'object') {
    if(Object.keys(file).length > 0) {
      for(let key in file) {
        createFileElement(div, file[key], key, deep + 1)
      }
    }
  }
}


function allFileStructureToHtml() {
  let div = createHtmlElement({
  })

  for(let key in files) {
    createFileElement(div, files[key], key, 0)
  }

  filesElement.appendChild(div)
}


function addFile() {
  let name = checkFileName("NewFile")
  files[name] = "none"

  refreshFiles()
}


function renameFile(file, name) {

}


function checkFileName(name) {
  if(!findFileByName(name)) {
    return name
  }

  let i = 0
  while(findFileByName(name + i)) {
    i++
  }

  return name + i
}


function findFileByName(name) {
  return name in files
}


function getPathByFile(files, targetFile, currentPath = "files") {
  for (let key in files) {
    if (files[key] === targetFile) {
      return (currentPath === '') ? key : currentPath + '.' + key;
    } else if (typeof files[key] === 'object') {
      const result = getPathByFile(files[key], targetFile, (currentPath === '') ? key : currentPath + '.' + key);
      if (result !== null) return result;
    }
  }
  return null; // Jeśli plik nie został znaleziony
}



function copyCurrentPath() {
  const path = getPathByFile(files, selectedFile);
  if(path) {
    navigator.clipboard.writeText(path);
  }
}


document.addEventListener("click", () => {
  copyCurrentPath()
})
