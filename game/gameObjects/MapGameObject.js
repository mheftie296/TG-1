class MapGameObject extends GameObject{
    colliders = []
    start(){
        super.start()
    }
    draw(){
        
    }
    addCollider(collider){
        this.colliders.push(collider)
    }
    getColliders(){
        return this.colliders
    }
}
