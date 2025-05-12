class MainScene extends Scene{
    colliders = []
    camera
    
    start(){
        this.addGameObject(new PlayerGameObject("player"), 10.01, 10)
        this.addGameObject(new EnemyGameObject("enemy"), 1.6, 3)
        this.addGameObject(new EnemyGameObject("enemy"), 20, 20)
        this.addGameObject(new MapGameObject)
        super.start()
    }
    update(){
        super.update()
        Camera.main.transform.w = 400
        Camera.main.transform.h = 240
    }
    draw(){
        super.draw()
    }
}