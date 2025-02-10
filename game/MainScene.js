class MainScene extends Scene{
    static lx = 0
    static ly = 0.1
    static x = 0.01
    static y = 0
    static tr = 0
    static fx = 0
    static fy = 0
    static inertia = 0
    static clx = 0
    static j = 0
    static car = [
        ["#0004", [-0.3,-0.5,-1.3],[-0.3,0.5,-1.3],[0.3,0.5,-1.3],[0.3,-0.5,-1.3]],
        ["#222", [0.2,-0.4,-1.3],[0.2,0.4,-1.3],[0.3,0.4,-1.3],[0.3,-0.4,-1.3]],
        ["#222", [0.3,-0.5,-1.2],[0.3,0.5,-1.2],[0.3,0.4,-1.3],[0.3,-0.4,-1.3]],
        ["#222", [0.2,-0.5,-1.2],[0.2,0.5,-1.2],[0.2,0.4,-1.3],[0.2,-0.4,-1.3]],
        ["#222", [0.2,-0.5,-1.2],[0.3,-0.5,-1.2],[0.3,-0.4,-1.3],[0.2,-0.4,-1.3]],

        ["#222", [-0.2,-0.4,-1.3],[-0.2,0.4,-1.3],[-0.3,0.4,-1.3],[-0.3,-0.4,-1.3]],
        ["#222", [-0.3,-0.5,-1.2],[-0.3,0.5,-1.2],[-0.3,0.4,-1.3],[-0.3,-0.4,-1.3]],
        ["#222", [-0.2,-0.5,-1.2],[-0.2,0.5,-1.2],[-0.2,0.4,-1.3],[-0.2,-0.4,-1.3]],
        ["#222", [-0.2,-0.5,-1.2],[-0.3,-0.5,-1.2],[-0.3,-0.4,-1.3],[-0.2,-0.4,-1.3]],

        ["#161", [-0.3,-0.5,-1.2],[-0.3,0.5,-1.2],[0.3,0.5,-1.2],[0.3,-0.5,-1.2]],
        ["#171",[-0.3,-0.5,-1.2],[-0.3,-0.4,-1.1],[0.3,-0.4,-1.1],[0.3,-0.5,-1.2]],
        ["#171",[-0.3,0.5,-1.2],[-0.3,0.3,-1.1],[0.3,0.3,-1.1],[0.3,0.5,-1.2]],
        ["#272", [-0.3,-0.4,-1.1],[-0.3,0.3,-1.1],[0.3,0.3,-1.1],[0.3,-0.4,-1.1]]
        
    ]
    start(){
        //
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
        MainScene.inertia -= 0.05
        if(MainScene.j + MainScene.inertia <= 0){
            MainScene.j = 0
            MainScene.inertia = 0
        }   
        MainScene.j += MainScene.inertia
    }
    draw(){
        let map = [[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1], 
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],  
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1], 
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1], 
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1], 
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1]
    ]
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
        //for (const i in map) {
        //    for (const j in map[i])
        //        if(map[i][j] == 1)
        //            Draw.drawFlat([[i*s+fx,j*s+fy], [i*s+s+fx,j*s+fy], [i*s+s+fx,j*s+s+fy], [i*s+fx,j*s+s+fy]], MainScene.clx, "red")
        //        else{
        //            Draw.drawFlat([[i*s+fx,j*s+fy], [i*s+s+fx,j*s+fy], [i*s+s+fx,j*s+s+fy], [i*s+fx,j*s+s+fy]], MainScene.clx, "lightgray")
        //        }
        //}
        for (const i in map) {
                for (const j in map[i])
                    Draw.draw3d(["#333", [i*s+fx,j*s+fy, -1.3], [i*s+s+fx,j*s+fy, -1.3], [i*s+s+fx,j*s+s+fy, -1.3], [i*s+fx,j*s+s+fy, -1.3]])
        }
        for(const poly in MainScene.car){
            Draw.drawTank(MainScene.car[poly], MainScene.tr + MainScene.lx)
        }
        Draw.draw3d(["#272", [-0.02,4.25,-1.05], [0.02,4.25,-1.05], [0.02,5,-1.05], [-0.02,5,-1.05]])
        Draw.draw3d(["#575", [-0.01,4.25,-1.05], [0.01,4.25,-1.05], [0.01,5,-1.05], [-0.01,5,-1.05]])
        Draw.draw3d(["#252", [-0.25,3.75,-1.1], [0.25,3.75,-1.1], [0.25,4.25,-1.1], [-0.25,4.25,-1.1]])
        Draw.draw3d(["#474", [-0.2,3.75,-1], [0.2,3.75,-1], [0.2,4.25,-1], [-0.2,4.25,-1]])
        Draw.draw3d(["#363", [-0.25,3.75,-1.1], [0.25,3.75,-1.1], [0.2,3.75,-1], [-0.2,3.75,-1]])
        
    }
}