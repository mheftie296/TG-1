class BulletGameObject extends GameObject{   
    start(){
        this.addComponent(new Model(bulletm))
        super.start()
    }
    update(){
        super.update()
        if(Math.abs(this.transform.x) < 100 && Math.abs(this.transform.y) < 100){
            this.transform.x += Math.sin(-this.transform.r)
            this.transform.y += Math.cos(-this.transform.r)
        }
    }
}