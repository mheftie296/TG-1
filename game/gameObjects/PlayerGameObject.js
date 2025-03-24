class PlayerGameObject extends GameObject{
    start(){
        this.addComponent(new Model(tank))
        this.addComponent(new KeyboardMovement)
        super.start()
        
    }
    update(){
        let movement = this.components[1]
        this.transform.y -= movement.direction[0] * Math.cos(-MainScene.tr)*0.1
        this.transform.x -= movement.direction[0] * Math.sin(-MainScene.tr)*0.1
        MainScene.tr -= 0.025 * movement.direction[1]
        this.clx += 0.01 * movement.direction[1]
        this.lx += 0.05 * movement.direction[1]
        this.lx += 0.05 * movement.direction[2]
        this.clx += 0.05 * movement.direction[2]
        MainScene.lx = this.lx
        this.clx = (this.lx + this.clx*3)/4
        MainScene.clx = this.clx
        this.transform.r = this.clx
        if(Input.keysdown.includes("Space") && !MainScene.spc){
            MainScene.bullets.push([MainScene.fx, MainScene.fy, MainScene.clx])
            MainScene.spc = true
        }
        if(!Input.keysdown.includes("Space")){MainScene.spc = false}
    }
}