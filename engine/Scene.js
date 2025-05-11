class Scene {
  started
  constructor (backgroundColour = "#87CEEB") {
    this.backgroundColour = backgroundColour
    this.started = false
    if(typeof Camera !== 'undefined')
      this.addGameObject(new GameObject('Camera'))
  }
  gameObjects = []
  start () {
    this.gameObjects.forEach(gameObject => gameObject.start())
  }
  draw () {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = this.backgroundColour
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fill()
    Draw.doDraw()
    let xRatio = canvas.width / Camera.main.transform.w
    let yRatio = canvas.height / Camera.main.transform.h
    ctx.fillStyle = 'gray'
    ctx.beginPath()
    let ratio = Camera.getScale()
    if(xRatio > yRatio){
      let size = (canvas.width - Camera.main.transform.w * ratio)/2
      ctx.rect(0, 0, size, canvas.height)
      ctx.rect(canvas.width-size, 0, size, canvas.height)
    }
    if(xRatio < yRatio){
      let size = (canvas.height - Camera.main.transform.h * ratio)/2
      ctx.rect(0, 0, canvas.width, size)
      ctx.rect(0, canvas.height-size, canvas.width, size)
    }
    this.gameObjects.forEach(gameObject => gameObject.draw())
    ctx.fill()
    
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
