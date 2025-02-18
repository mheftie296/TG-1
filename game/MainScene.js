class MainScene extends Scene{
    static lx = 0
    static ly = 0.1
    static x = -10.01
    static y = -10
    static tr = 0
    static fx = -10.01
    static fy = -10
    static inertia = 0
    static clx = 0
    static j = 0
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
        if(MainScene.j + MainScene.inertia <= 0){
            MainScene.j = 0
            MainScene.inertia = 0
        }   
        MainScene.j += MainScene.inertia
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
                } else if((i*1 + j*1) % 2 == 0){
                    Draw.drawModel(box, MainScene.clx, 0, [fx+i*1,fy+j*1,-1.3])
                    Draw.drawModel(box, MainScene.clx, Math.PI/2, [fx+i*1+1,fy+j*1,-1.2])
                    Draw.drawModel(box, MainScene.clx, 0, [fx+i*1,fy+j*1,-1.1])
                    Draw.drawModel(box, MainScene.clx, Math.PI/2, [fx+i*1+1,fy+j*1,-1.0])
                    Draw.drawModel(box, MainScene.clx, 0, [fx+i*1,fy+j*1,-0.9])
                    Draw.drawModel(box, MainScene.clx, Math.PI/2, [fx+i*1+1,fy+j*1,-0.8])
                    Draw.drawModel(box, MainScene.clx, Math.PI/2, [fx+i*1+1,fy+j*1,-1.25])
                    Draw.drawModel(box, MainScene.clx, 0, [fx+i*1,fy+j*1,-1.15])
                    Draw.drawModel(box, MainScene.clx, Math.PI/2, [fx+i*1+1,fy+j*1,-1.05])
                    Draw.drawModel(box, MainScene.clx, 0, [fx+i*1,fy+j*1,-0.95])
                    Draw.drawModel(box, MainScene.clx, Math.PI/2, [fx+i*1+1,fy+j*1,-0.85])
                } else {
                    Draw.drawModel(box, MainScene.clx, Math.PI/2, [fx+i*1+1,fy+j*1,-1.3])
                    Draw.drawModel(box, MainScene.clx, 0, [fx+i*1,fy+j*1,-1.2])
                    Draw.drawModel(box, MainScene.clx, Math.PI/2, [fx+i*1+1,fy+j*1,-1.1])
                    Draw.drawModel(box, MainScene.clx, 0, [fx+i*1,fy+j*1,-1.0])
                    Draw.drawModel(box, MainScene.clx, Math.PI/2, [fx+i*1+1,fy+j*1,-0.9])
                    Draw.drawModel(box, MainScene.clx, 0, [fx+i*1,fy+j*1,-0.8])
                    Draw.drawModel(box, MainScene.clx, 0, [fx+i*1,fy+j*1,-1.25])
                    Draw.drawModel(box, MainScene.clx, Math.PI/2, [fx+i*1+1,fy+j*1,-1.15])
                    Draw.drawModel(box, MainScene.clx, 0, [fx+i*1,fy+j*1,-1.05])
                    Draw.drawModel(box, MainScene.clx, Math.PI/2, [fx+i*1+1,fy+j*1,-0.95])
                    Draw.drawModel(box, MainScene.clx, 0, [fx+i*1,fy+j*1,-0.85])
                }
            }
        }
        for(let bullet of MainScene.bullets){
            bullet[1]-=Math.cos(-bullet[2])
            bullet[0]+=Math.sin(-bullet[2])
            let bx = -bullet[0]
            let by = -bullet[1]
            Draw.drawModel(bulletm, MainScene.clx, -bullet[2], [MainScene.fx+bx,MainScene.fy + by,0])
            //Draw.drawFlat([[bx-0.1,by-0.1], [bx+0.1,by-0.1], [bx+0.1,by+0.1], [bx-0.1,by+0.1]], MainScene.clx-bullet[2 ], "Black")
            //Draw.draw3d(["#FF0", [bx-0.02,by+4.25,-1.05], [bx+0.02,by+4.25,-1.05], [bx+0.02,by+5,-1.05], [bx-0.02,by+5,-1.05]])
            //Draw.drawTank(["#fca400", [bx+MainScene.fx-0.02,by+MainScene.fy+0.5,-1.05], [bx+MainScene.fx+0.02,by+MainScene.fy+0.5,-1.05], [bx+MainScene.fx+0.02,by+MainScene.fy+1,-1.05], [bx+MainScene.fx-0.02,by+MainScene.fy+1,-1.05]], MainScene.clx-bullet[2])
            //Draw.drawTank(["#de9000", [bx+MainScene.fx-0.02,by+MainScene.fy+0.5,-1.05], [bx+MainScene.fx+0.02,by+MainScene.fy+0.5,-1.05], [bx+MainScene.fx+0.02,by+MainScene.fy+0.5,-1.09], [bx+MainScene.fx-0.02,by+MainScene.fy+0.5,-1.09]], MainScene.clx-bullet[2])
            //console.log("Drawing bullet, original location:", bullet, "offset:", [MainScene.fx, MainScene.fy])
        }
        Draw.drawModel(tank, MainScene.clx, 0, [MainScene.fx+1.6,MainScene.fy + 3.05,0])
        Draw.drawModel(turret, MainScene.clx, -0, [MainScene.fx+1.6,MainScene.fy + 3,0])
        //for(const poly of car){
        //    Draw.drawTank(poly, MainScene.tr + MainScene.lx)
        //}
        if(MainScene.spc)
            Draw.draw3d(["#fff9", [-0.2,5,-1.15], [0.2,5,-0.99], [0.2,5,-1.15], [-0.2,5,-0.99]])
        //Draw.draw3d(["#272", [-0.02,4.25,-1.05], [0.02,4.25,-1.05], [0.02,5,-1.05], [-0.02,5,-1.05]])
        //Draw.draw3d(["#252", [-0.25,3.75,-1.09], [0.25,3.75,-1.09], [0.25,4.25,-1.09], [-0.25,4.25,-1.09]])
        //Draw.draw3d(["#474", [-0.2,3.75,-1], [0.2,3.75,-1], [0.2,4.25,-1], [-0.2,4.25,-1]])
        //Draw.draw3d(["#363", [-0.25,3.75,-1.1], [0.25,3.75,-1.1], [0.2,3.75,-1], [-0.2,3.75,-1]])
        Draw.drawModel(tank, MainScene.tr + MainScene.lx, 0, [0,0.05,0])
        Draw.drawModel(turret, 0, 0, [0,-0.01,0])
        Draw.doDraw()
    }
}