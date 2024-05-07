const selectedOptions = {
  HIERARCHY: 0,
  FILES: 1,
  INSPECTOR: 2
}

let selectedField = selectedOptions.HIERARCHY


document.querySelector(".hierarchyBox").addEventListener("click", (event) => {
  selectedField = selectedOptions.HIERARCHY
})

document.querySelector(".filesBox").addEventListener("click", (event) => {
  selectedField = selectedOptions.FILES
})

document.querySelector(".inspectorBox").addEventListener("click", (event) => {
  selectedField = selectedOptions.INSPECTOR
})
