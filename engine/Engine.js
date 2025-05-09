class Engine{
    static currentScene
    static nextScene

    static tick(currentTime){
        //Time.deltaTime = (currentTime - Time.last)/1000
        //Time.last = currentTime
        if(Engine.nextScene){
            Engine.currentScene = Engine.nextScene
            Engine.nextScene = null
        }
        Engine.currentScene.update()
        Engine.currentScene.draw()
        //Input.update()
    }
    static setup(){
        window.addEventListener("keydown", Input.keyDown)
        window.addEventListener("keyup", Input.keyUp)
        window.addEventListener("mousemove", Input.mouseMove)
        window.addEventListener("mousedown", Input.mouseDown)
        window.addEventListener("mouseup", Input.mouseUp)
        window.addEventListener("wheel", Input.mouseWheel)

        canvas = document.getElementById("canvas")
        ctx = canvas.getContext("2d")
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        //const SCALING_FACTOR = Math.min(window.innerWidth/canvas.width * 0.9, window.innerHeight/canvas.height * 0.9)
        //// Scaling the canvas https://stackoverflow.com/questions/62032797/how-do-i-make-a-canvas-html-picture-bigger-without-losing-resolution
        //ctx.canvas.width = SCALING_FACTOR * canvas.width
        //ctx.canvas.height = SCALING_FACTOR * canvas.height
        //ctx.scale(SCALING_FACTOR, SCALING_FACTOR)
    }
    static start(){
        Engine.setup()
        //requestAnimationFrame(Engine.tick)
        setInterval(Engine.tick, Time.msBetweenFrames) // I never called this thats why it was never working
    }
}