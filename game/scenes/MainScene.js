class MainScene extends Scene{
    lx = 0
    x = 0.01
    y = 0
    tr = 0 // tank body rotation
    fx = 0.01
    fy = 0

    colliders = []
    camera
    //static map
    
    start(){
        //this.addGameObject(new PlayerGameObject("Player"))
        this.addGameObject(new CameraGameObject())
        //this.camera = this.gameObjects[1]
        //this.addGameObject(new MapGameObject)
        //this.map = this.gameObjects[2]
        this.addGameObject(new PlayerGameObject)
        this.addGameObject(new EnemyGameObject(), 1.6, 3)
        this.addGameObject(new MapGameObject)
        super.start()
        //this.gameObjects[1].map = this.gameObjects[2]
 
    }
    update(){
        super.update()
        Camera.main.transform.w = 400
        Camera.main.transform.h = 240
    }
    draw(){
        super.draw()
        //for(let bullet of this.bullets){
        //    bullet[1]-=Math.cos(-bullet[2])
        //    bullet[0]+=Math.sin(-bullet[2])
        //    let bx = -bullet[0]
        //    let by = -bullet[1]
        //    Draw.drawModel(bulletm, -bullet[2], [bx,by,0])
    }
}