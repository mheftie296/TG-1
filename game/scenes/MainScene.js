class MainScene extends Scene{
    static lx = 0
    static x = -10.01
    static y = -10
    static tr = 0 // tank body rotation
    static fx = -10.01
    static fy = -10
    static clx = 0
    static spc = false
    static bullets = []
    static colliders = []
    static camera
    //static map
    
    start(){
        MainScene.bullets.push([MainScene.fx, MainScene.fy, MainScene.clx])
        //this.addGameObject(new PlayerGameObject("Player"))
        this.addGameObject(new CameraGameObject())
        this.camera = this.gameObjects[1]
        //this.addGameObject(new MapGameObject)
        //this.map = this.gameObjects[2]
        //this.addGameObject(new PlayerGameObject)
        super.start()
        //this.gameObjects[1].map = this.gameObjects[2]
 
    }
    update(){
        super.update()
    }
    draw(){
        super.draw()
        let x = MainScene.x
        let y = MainScene.y
        //let lx = MainScene.lx
        //Draw.j = MainScene.j
        //MainScene.clx = (lx + MainScene.clx*3)/4
        MainScene.fx = (x + MainScene.fx*3)/4
        MainScene.fy = (y + MainScene.fy*3)/4
        for (const i in map) {
            for (const j in map[i]){
                if(map[i][j] == 1)
                    this.camera.drawModel(floor, 0, [i*1,j*1,-1.31])
                else if(map[i][j] == 0){
                    this.camera.drawModel(floor2, 0, [i*1,j*1,-1.31])
                } 
                else {
                    this.camera.drawModel(box2, 0, [i*1,j*1,-1.31])
                }
                
            }
        }
        for(let bullet of MainScene.bullets){
            bullet[1]-=Math.cos(-bullet[2])
            bullet[0]+=Math.sin(-bullet[2])
            let bx = -bullet[0]
            let by = -bullet[1]
            this.camera.drawModel(bulletm, -bullet[2], [bx,by,0])
            
        }
        this.camera.drawModel(tank, 0, [1.6,3.05,0])
        //console.log(this.gameObjects)
        this.camera.drawModel(turret, -0, [1.6,3,0])
        if(MainScene.spc)
            this.camera.draw3d(["#fff9", [-0.195,5,-1.15], [0.2,5,-0.99], [0.195,5,-1.15], [-0.2,5,-0.99]])
        this.camera.drawModelFixed(tank, MainScene.tr + MainScene.lx, [0,0.0001,0])
        this.camera.drawModelFixed(turret, 0, [0,0.0001,0])
        this.gameObjects[1].doDraw()
    }
}