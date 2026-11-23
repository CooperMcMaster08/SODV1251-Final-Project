const settingsButton = document.getElementById("settings-button")
const playButton = document.getElementById("play-button")
const accountButton = document.getElementById("account-button")
const statsButton = document.getElementById("statistics-button")
const menuButtons =[playButton,accountButton,statsButton,settingsButton]
const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d')
const canvasWidth = canvas.width
const canvasHeight = canvas.height
const gravity = 0.2
const slip = 0.2
const spriteSheet = new Image();
spriteSheet.src = "other/spritesheet.png";

const animations = {
    idle: [{ y: 0, height: 24 }],
    runL: [{ y: 26, height: 30 }],
    runR: [{ y: 58, height: 31 }],
    jump: [{ y: 58, height: 31 }],
    fall: [{ y: 26, height: 30 }]
};