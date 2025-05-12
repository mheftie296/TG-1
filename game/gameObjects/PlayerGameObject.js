class PlayerGameObject extends GameObject{
    tr
    shot
    clx = 0
    tr = 0
    start(){
        this.tr = 0
        this.addComponent(new Model(turret))
        this.addComponent(new TankBody())
        this.addComponent(new KeyboardMovement)
        this.addComponent(new Collider(tankCollider))
        this.addComponent(new RigidBodyWallSliding(0))
        this.shot = false
        super.start()
    }
    update(){
        super.update()
        let movement = this.findComponent(KeyboardMovement)
        this.findComponent(RigidBodyWallSliding).vx = movement.direction[0] * Math.sin(this.tr - this.clx)*3
        this.findComponent(RigidBodyWallSliding).vy = movement.direction[0] * Math.cos(this.tr - this.clx)*3
        this.transform.r -= 0.05 * movement.direction[2]
        this.transform.r -= 0.05 * movement.direction[1]
        this.tr -= 0.05 * movement.direction[2]
        this.clx -= 0.05 * movement.direction[2]
        this.clx -= 0.05 * movement.direction[1]
        Draw.clx = -this.clx
        Draw.updateCameraLocation(-this.transform.x+0.0001,-this.transform.y,this.transform.z,-this.clx)
        if(Input.keysdown.includes("Space")){
            if(!this.shot)
                Engine.currentScene.addGameObject(new BulletGameObject(), this.transform.x, this.transform.y, 0, this.transform.r)
            this.shot = true
        } else {
            this.shot = false
        }
        this.findComponent(TankBody).tr = -this.tr
        this.findComponent(Collider).r = -(this.tr - this.clx)
    }
}