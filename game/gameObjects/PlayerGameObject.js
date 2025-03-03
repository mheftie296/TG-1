class PlayerGameObject extends GameObject{
    start(){
        this.addComponent(new KeyboardMovement)
    }
}