class MainScene extends Scene{
    lx = 0
    x = -10.01
    y = -10
    tr = 0 // tank body rotation
    fx = -10.01
    fy = -10
    clx = 0
    spc = false
    bullets = []
    colliders = []
    camera
    //static map
    
    start(){
        console.log("MainScene")
        this.bullets.push([this.fx, this.fy, this.clx])
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
        let x = this.x
        let y = this.y
        //let lx = this.lx
        //Draw.j = this.j
        //this.clx = (lx + this.clx*3)/4
        this.fx = (x + this.fx*3)/4
        this.fy = (y + this.fy*3)/4
        for (const i in map) {
            for (const j in map[i]){
                if(map[i][j] == 1)
                    Draw.drawModel(floor, 0, [i*1,j*1,-1.31])
                else if(map[i][j] == 0){
                    Draw.drawModel(floor2, 0, [i*1,j*1,-1.31])
                } 
                else {
                    Draw.drawModel(box2, 0, [i*1,j*1,-1.31])
                }
                
            }
        }
        for(let bullet of this.bullets){
            bullet[1]-=Math.cos(-bullet[2])
            bullet[0]+=Math.sin(-bullet[2])
            let bx = -bullet[0]
            let by = -bullet[1]
            //Draw.drawModel(bulletm, -bullet[2], [bx,by,0])
            
        }
        Draw.drawModel(tank, 0, [1.6,3.05,0])
        //console.log(this.gameObjects)
        //this.camera.drawModel(turret, -0, [1.6,3,0])
        if(this.spc)
            this.camera.draw3d(["#fff9", [-0.195,5,-1.15], [0.2,5,-0.99], [0.195,5,-1.15], [-0.2,5,-0.99]])
        //Draw.drawModelFixed(tank, this.tr + this.lx, [0,0.0001,0])
        //Draw.drawModelFixed(turret, 0, [0,0.0001,0])
        Draw.doDraw()
    }
}