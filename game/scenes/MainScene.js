class MainScene extends Scene{
    static lx = 0
    static ly = 0.1
    static x = -10.01
    static y = -10
    static tr = 0
    static fx = -10.01
    static fy = -10
    static clx = 0
    static spc = false
    static bullets = []
    
    start(){
        MainScene.bullets.push([MainScene.fx, MainScene.fy, MainScene.clx])
    }
    update(){
        if(Input.keysdown.includes("ArrowLeft")){
            MainScene.lx += 0.05
            MainScene.clx += 0.05
        }
        if(Input.keysdown.includes("ArrowRight")){
            MainScene.lx -= 0.05
            MainScene.clx -= 0.05
        }
        if(Input.keysdown.includes("KeyW")){
            MainScene.y -= Math.cos(-MainScene.tr)*0.1
            MainScene.x -= Math.sin(-MainScene.tr)*0.1
        }
        if(Input.keysdown.includes("KeyS")){
            MainScene.y += Math.cos(-MainScene.tr)*0.1
            MainScene.x += Math.sin(-MainScene.tr)*0.1
        }
        if(Input.keysdown.includes("KeyA")){
            MainScene.tr -= 0.05
            MainScene.clx += 0.01
            MainScene.lx += 0.05
        }
        if(Input.keysdown.includes("KeyD")){
            MainScene.tr += 0.05
            MainScene.clx -= 0.01
            MainScene.lx -= 0.05
        }
        if(Input.keysdown.includes("Space") && !MainScene.spc){
            MainScene.bullets.push([MainScene.fx, MainScene.fy, MainScene.clx])
            MainScene.spc = true
        }
        if(!Input.keysdown.includes("Space")){MainScene.spc = false}
        MainScene.inertia -= 0.05
    }
    draw(){
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        let x = MainScene.x
        let y = MainScene.y
        let lx = MainScene.lx
        let s = 1
        Draw.j = MainScene.j
        Draw.setY(MainScene.ly)
        MainScene.clx = (lx + MainScene.clx*3)/4
        MainScene.fx = (x + MainScene.fx*3)/4
        MainScene.fy = (y + MainScene.fy*3)/4
        let fx = MainScene.fx
        let fy = MainScene.fy
        for (const i in map) {
            for (const j in map[i]){
                if(map[i][j] == 1)
                    Draw.drawFlat([[i*s+fx,j*s+fy], [i*s+s+fx,j*s+fy], [i*s+s+fx,j*s+s+fy], [i*s+fx,j*s+s+fy]], MainScene.clx, "red")
                else if(map[i][j] == 0){
                    Draw.drawFlat([[i*s+fx,j*s+fy], [i*s+s+fx,j*s+fy], [i*s+s+fx,j*s+s+fy], [i*s+fx,j*s+s+fy]], MainScene.clx, "lightgray")
                } 
                else {
                    Draw.drawModel(box2, MainScene.clx, 0, [fx+i*1,fy+j*1,-1.3])
                }
                
            }
        }
        for(let bullet of MainScene.bullets){
            bullet[1]-=Math.cos(-bullet[2])
            bullet[0]+=Math.sin(-bullet[2])
            let bx = -bullet[0]
            let by = -bullet[1]
            Draw.drawModel(bulletm, MainScene.clx, -bullet[2], [MainScene.fx+bx,MainScene.fy + by,0])
            
        }
        Draw.drawModel(tank, MainScene.clx, 0, [MainScene.fx+1.6,MainScene.fy + 3.05,0])
        Draw.drawModel(turret, MainScene.clx, -0, [MainScene.fx+1.6,MainScene.fy + 3,0])
        if(MainScene.spc)
            Draw.draw3d(["#fff9", [-0.2,5,-1.15], [0.2,5,-0.99], [0.2,5,-1.15], [-0.2,5,-0.99]])
        Draw.drawModel(tank, MainScene.tr + MainScene.lx, 0, [0,0.05,0])
        Draw.drawModel(turret, 0, 0, [0,-0.01,0])
        Draw.doDraw()
    }
}