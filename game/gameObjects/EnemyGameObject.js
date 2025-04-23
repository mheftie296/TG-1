class EnemyGameObject extends GameObject{
    tr
    constructor(offset){
        super()
        this.transform.x = offset[0]
        this.transform.y = offset[1]
    }    
    start(){
        this.tr = 0
        this.addComponent(new Model(turret))
        this.addComponent(new TankBody())
        super.start()
    }
    update(){
        super.update()
        this.findComponent(TankBody).tr = this.tr
    }
}