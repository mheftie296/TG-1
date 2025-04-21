class PlayerGameObject extends GameObject{
    tr
    start(){
        this.tr = 0
        this.addComponent(new Model(turret))
        this.addComponent(new TankBody())
        this.addComponent(new KeyboardMovement)
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
    }
}