class KeyboardMovement extends Component {
    wasd
    cosntructor(){
        super()
        this.direction = [0,0]
    }
    update() {
        this.direction = [0,0]
        if(Input.keysdown.includes("ArrowLeft")){
            MainScene.lx += 0.05
            MainScene.clx += 0.05
        }
        if(Input.keysdown.includes("ArrowRight")){
            MainScene.lx -= 0.05
            MainScene.clx -= 0.05
        }
        if(Input.keysdown.includes("KeyW")){
            this.direction[0] = 1
        }
        if(Input.keysdown.includes("KeyS")){
            this.direction[0] = -1
        }
        if(Input.keysdown.includes("KeyA")){
            this.direction[1] = 1
        }
        if(Input.keysdown.includes("KeyD")){
            this.direction[1] = -1
        }
        if(Input.keysdown.includes("Space") && !MainScene.spc){
            MainScene.bullets.push([MainScene.fx, MainScene.fy, MainScene.clx])
            MainScene.spc = true
        }
    }
}