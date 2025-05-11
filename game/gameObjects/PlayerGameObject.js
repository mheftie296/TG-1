class PlayerGameObject extends GameObject{
    tr
    shot
    start(){
        this.tr = 0
        this.addComponent(new Model(turret))
        this.addComponent(new TankBody())
        this.addComponent(new KeyboardMovement)
        this.addComponent(new Collider(tankCollider))
        this.addComponent(new RigidBody(0))
        this.shot = false
        super.start()
    }
    update(){
        super.update()
        let direction = this.findComponent(KeyboardMovement).direction
        this.tr += 0.05 * direction[2]
        this.findComponent(TankBody).tr = this.tr
        this.transform.x = -(Draw.cameraLocation[0] - 0.0001)
        this.transform.y = -Draw.cameraLocation[1]
        this.transform.r = -Draw.cameraLocation[3]
        if(Input.keysdown.includes("Space")){
            if(!this.shot)
                Engine.currentScene.addGameObject(new BulletGameObject(), this.transform.x, this.transform.y, 0, this.transform.r)
            this.shot = true
        } else {
            this.shot = false
        }
    }
}