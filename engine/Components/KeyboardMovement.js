class KeyboardMovement extends Component {
    direction = []
    cosntructor(){
        //super()
        this.direction = [0,0,0]
    }
    update() {
        this.direction = [0,0,0]
        if(Input.keysdown.includes("ArrowLeft")){
            this.direction[2] = 1
        }
        if(Input.keysdown.includes("ArrowRight")){
            this.direction[2] = -1
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
    }
}