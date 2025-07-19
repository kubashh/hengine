const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

const objects = []

Camera = {
  transform: {
    position: {
      x: 0,
      y: 0,
    },
    rotation: 0,
    scale: {
      x: 1,
      y: 1,
    },
  },
}

timers = {
  update: {
    gravity: 0,
    user: 0,
    all: 0,
  },
}

let running = true
const ms = 1000 / 60
let updatesLegit = 0
let framesLegit = 0
