class Collider extends Component{
    collider
    r
    constructor(collider){
        super()
        this.collider = collider
    }
    rotate(){
        let newC = []
        for(let point of this.collider){
            let x = point[0]
            let y = point[1]
            let a = this.r
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
    get lines(){
        let points = []
        let rCollider = this.rotate()
        for (let i = 0; i < rCollider.length; i++) {
            let x1 = rCollider.at(i-1)[0] + this.transform.x
            let y1 = rCollider.at(i-1)[1] + this.transform.y
            let x2 = rCollider[i][0] + this.transform.x
            let y2 = rCollider[i][1] + this.transform.y
            points.push([[x1,y1], [x2,y2]])
        }
        return points
    }
}