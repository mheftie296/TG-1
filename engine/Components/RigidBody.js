class Rigidbody extends Comment {
    constructor(gravity = 0){
        super()
        this.gravity = gravity
        this.vx = 0
        this.vy = 0
    }
    update(){
        this.vy += this.gravity * Time.deltaTime
        this.transform.x += this.vx * Time.deltaTime
        this.transform.y += this.vy * Time.deltaTime
    }
}