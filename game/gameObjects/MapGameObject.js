class MapGameObject extends GameObject{
    colliders = []
    start(){
        super.start()
    }
    draw(){
        for (const i in map) {
            for (const j in map[i]){
                if(map[i][j] == 1)
                    Draw.drawModel(floor, 0, [i*1,j*1,-1.31])
                else if(map[i][j] == 0){
                    Draw.drawModel(floor2, 0, [i*1,j*1,-1.31])
                } 
                else {
                    Draw.drawModel(box2, 0, [i*1,j*1,-1.31])
                }
                
            }
        }
    }
    addCollider(collider){
        this.colliders.push(collider)
    }
    getColliders(){
        return this.colliders
    }
}
