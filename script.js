let canvas
let ctx

function tick(){
    currentScene.update()
    currentScene.draw()
}

function setup(){
    window.addEventListener("keydown", Input.keydown)
    window.addEventListener("keyup", Input.keyup)

    canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")
    const SCALING_FACTOR = Math.min(window.innerWidth/canvas.width * 0.9, window.innerHeight/canvas.height * 0.9)
    // Scaling the canvas https://stackoverflow.com/questions/62032797/how-do-i-make-a-canvas-html-picture-bigger-without-losing-resolution
    ctx.canvas.width = SCALING_FACTOR * canvas.width
    ctx.canvas.height = SCALING_FACTOR * canvas.height
    ctx.scale(SCALING_FACTOR, SCALING_FACTOR)
}

setup()
let currentScene = new MainScene()
currentScene.start()
setInterval(tick, Time.msBetweenFrames) //Start the game loop (engine code)
