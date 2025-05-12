class CameraGameObject extends GameObject{
    buffer = []
    lx = 0
    x = -10.01
    y = -10
    clx = 0
    tr = 0
    map
    slider
    start(){
        this.ly = 0.1
        super.start()
        this.addComponent(new KeyboardMovement)
        this.transform.x = -10.0001
        this.transform.y = -10
    }
    updateLocation(x, y, z, r){
        this.transform.x = x
        this.transform.y = y
        this.transform.z = z
        this.transform.r = r
    }
    update(){
        super.update()
        let movement = this.components[1]
        
    }
}
