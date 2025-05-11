class BulletGameObject extends GameObject{
    constructor(offset){
        super()
        this.transform.x = offset[0]
        this.transform.y = offset[1]
    }    
    start(){
        this.addComponent(new Model(bulletm))
        super.start()
    }
    update(){
        super.update()
    }
}