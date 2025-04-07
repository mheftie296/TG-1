class Engine{
    static currentScene
    static nextScene

    static tick(){
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
    }
    static start(){
        Engine.setup()
        setInterval(Engine.tick, Time.msBetweenFrames) // I never called this thats why it was never working
    }
}