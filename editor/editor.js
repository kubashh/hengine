const selectedOptions = {
  HIERARCHY: 0,
  FILES: 1,
  INSPECTOR: 2
}

let selectedField = selectedOptions.HIERARCHY


document.querySelector(".hierarchyBox").addEventListener("click", () => {
  selectedField = selectedOptions.HIERARCHY
})

document.querySelector(".filesBox").addEventListener("click", () => {
  selectedField = selectedOptions.FILES
})

document.querySelector(".inspectorBox").addEventListener("click", () => {
  selectedField = selectedOptions.INSPECTOR
})
