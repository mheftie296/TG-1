class BulletGameObject extends GameObject{   
    start(){
        this.addComponent(new Model(bulletm))
        this.addComponent(new RigidBodyWallSliding(0))
        this.findComponent(RigidBodyWallSliding).vx = Math.sin(-this.transform.r)*50
        this.findComponent(RigidBodyWallSliding).vy = Math.cos(-this.transform.r)*50
        super.start()
    }
    update(){
        super.update()
        for(let obj of Engine.currentScene.gameObjects){
            if(Math.sqrt((this.transform.x - obj.transform.x)**2 + (this.transform.y - obj.transform.y)**2) < 1 && obj instanceof EnemyGameObject){
                this.transform.z = 100
                obj.transform.z = 100
            }
        }
    }
}