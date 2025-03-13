class MainScene extends Scene{
    static lx = 0
    static x = -10.01
    static y = -10
    static tr = 0
    static fx = -10.01
    static fy = -10
    static clx = 0
    static spc = false
    static bullets = []
    static colliders = []
    static camera
    static mapCollider = []
    
    start(){
        MainScene.bullets.push([MainScene.fx, MainScene.fy, MainScene.clx])
        //this.addGameObject(new PlayerGameObject("Player"))
        this.addGameObject(new CameraGameObject())
        this.camera = this.gameObjects[1]
        super.start()
        
    }
    update(){
        super.update()
    }
    draw(){
        super.draw()
        let x = MainScene.x
        let y = MainScene.y
        let lx = MainScene.lx
        //Draw.j = MainScene.j
        //MainScene.clx = (lx + MainScene.clx*3)/4
        MainScene.fx = (x + MainScene.fx*3)/4
        MainScene.fy = (y + MainScene.fy*3)/4
        //this.camera.updateLocation(MainScene.fx, MainScene.fy, 0, MainScene.clx)
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
            this.camera.draw3d(["#fff9", [-0.2,5,-1.15], [0.2,5,-0.99], [0.2,5,-1.15], [-0.2,5,-0.99]])
        this.camera.drawModelFixed(tank, MainScene.tr + MainScene.lx, [0,0.0001,0])
        this.camera.drawModelFixed(turret, 0, [0,0.0001,0])
        this.gameObjects[1].doDraw()
        ctx.beginPath();
        for (let index = 0; index < tankCollider.length; index++) {
            let rot1 = this.camera.rotate(tankCollider.at(index-1)[0]*5,tankCollider.at(index-1)[1]*5,-MainScene.tr)
            let rot2 = this.camera.rotate(tankCollider[index][0]*5, tankCollider[index][1]*5,-MainScene.tr)
            ctx.moveTo(rot1[0] + 100  + this.camera.transform.x*5, rot1[1] + 100 - this.camera.transform.y*5);
            ctx.lineTo(rot2[0] + 100  + this.camera.transform.x*5, rot2[1] + 100 - this.camera.transform.y*5);
        }
        ctx.moveTo(100 - 1*5, 100);
        ctx.lineTo(100 - 1*5, 150);
        ctx.lineWidth = 0.3;
        ctx.strokeStyle = 'magenta';
        ctx.stroke();
    }
}