class Collider extends Component{
    collider
    r
    constructor(collider){
        super()
        this.collider = collider
    }
    rotate(){
        let newC = []
        for(point in this.collider){
            let distance = Math.sqrt(y*y+x*x)
            let angle
            if(y<0)
                angle = -Math.acos(x/distance) + a
            else
                angle = Math.acos(x/distance) + a
            newC.push([Math.cos(angle) * distance, Math.sin(angle) * distance])
        }
        return newC
    }
    set rotation(r){
        this.r = r
    }
    get lines(){
        points = []
        rCollider = this.rotate()
        for (let i = 0; i < this.collider.length; i++) {
            points.push([this.collider.at(i-1), this.collider.at(i)])
        }
        return points
    }
}