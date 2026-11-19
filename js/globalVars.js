const canvas = document.querySelector("canvas")
const gameDisplay = document.getElementById("game-display")
const c = canvas.getContext('2d')
const canvasWidth = gameDisplay.width
const canvasHeight= gameDisplay.height

c.fillRect(0,0,canvasWidth,canvasHeight)