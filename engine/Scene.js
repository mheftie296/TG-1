class Scene {

  constructor (backgroundColour = "#000000") {
    this.backgroundColour = backgroundColour
    this.started = false
  }
  gameObjects = []
  start () {
    this.gameObjects.forEach(gameObject => gameObject.start())
  }
  draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //ctx.fillStyle = "White"
    //ctx.beginPath()
    //ctx.rect(0, 0, canvas.width, canvas.height)
    //ctx.fill()
    this.gameObjects.forEach(gameObject => gameObject.draw())
  }
  update () {
    if(!this.started){
      this.start()
      this.started = true
    }
    this.gameObjects.forEach(gameObject => gameObject.update())
  }

  addGameObject(gameObject, x = 0, y = 0, z = 0, r = 0) {
    this.gameObjects.push(gameObject)
    gameObject.transform.x = x
    gameObject.transform.y = y
    gameObject.transform.z = z
    gameObject.transform.r = r
  }
}
