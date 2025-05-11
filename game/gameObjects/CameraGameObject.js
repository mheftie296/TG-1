class CameraGameObject extends GameObject{
    buffer = []
    lx = 0
    x = -10.01
    y = -10
    clx = 0
    tr = 0
    map
    slider
    start(){
        this.ly = 0.1
        super.start()
        this.addComponent(new KeyboardMovement)
        this.transform.x = -10.0001
        this.transform.y = -10
    }
    updateLocation(x, y, z, r){
        this.transform.x = x
        this.transform.y = y
        this.transform.z = z
        this.transform.r = r
    }
    update(){
        super.update()
        let movement = this.components[1]
        this.transform.y -= movement.direction[0] * Math.cos(this.tr)*0.1
        this.transform.x -= movement.direction[0] * Math.sin(this.tr)*0.1
        this.clx += 0.01 * movement.direction[1]
        this.lx += 0.05 * movement.direction[1]
        this.tr += 0.05 * movement.direction[1]
        this.clx += 0.05 * movement.direction[2]
        this.lx += 0.05 * movement.direction[2]
        this.clx = (this.lx + this.clx*3)/4
        Draw.clx = this.clx
        this.transform.r = this.clx
        //if(Input.keysdown.includes("Space") && !MainScene.spc){
        //    MainScene.bullets.push([MainScene.fx, MainScene.fy, MainScene.clx])
        //    MainScene.spc = true
        //}
        if(!Input.keysdown.includes("Space")){MainScene.spc = false}
        Draw.updateCameraLocation(this.transform.x,this.transform.y,this.transform.z,this.clx)
    }
}
