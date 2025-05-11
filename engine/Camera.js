class Camera{
    static get main(){
        return Engine.currentScene.gameObjects[0]
    }
    static getTransform(){
        let transform = new DOMMatrix()
        transform = transform.translate(canvas.width/2, canvas.height/2)
        let xRatio = canvas.width/Camera.main.transform.w
        let yRatio = canvas.height/Camera.main.transform.h
        let ratio = Math.min(xRatio, yRatio)
        transform = transform.scale(ratio, ratio)
        transform.translate(-Camera.main.transform.x, -Camera.main.transform.y)
        return transform
    }
    static getScale(){
        let xRatio = canvas.width/Camera.main.transform.w
        let yRatio = canvas.height/Camera.main.transform.h
        return Math.min(xRatio, yRatio)
    }
}