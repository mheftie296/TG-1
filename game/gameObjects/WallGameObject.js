class WallGameObject extends GameObject{
    constructor(){
        super()
    }    
    start(){
        this.tr = 0
        this.addComponent(new Collider(boxCollider))
        this.addComponent(new PhysicsStatic())
        super.start()
    }
    update(){
        super.update()
        this.findComponent(Collider).r = 0
    }
}