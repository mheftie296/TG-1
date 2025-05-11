class EnemyGameObject extends GameObject{
    tr
    constructor(){
        super()
    }    
    start(){
        this.tr = 0
        this.addComponent(new Model(turret))
        this.addComponent(new TankBody())
        this.addComponent(new Collider(tankCollider))
        this.addComponent(new PhysicsStatic())
        super.start()
    }
    update(){
        super.update()
        this.findComponent(TankBody).tr = this.tr
    }
}