class PlayerGameObject extends GameObject{
    start(){
        super.start()
        //this.addComponent(new KeyboardMovement)
        this.addComponent(new Model(tank))
    }
    update(){
        super.update()
    }
    draw(){
        super.draw()
    }
}