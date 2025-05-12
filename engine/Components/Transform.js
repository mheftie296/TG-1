class Transform extends Component {
    x
    y
    z
    r
    collision = false
    get r(){return this.r}
    move(vector){
        this.x += vector.x
        this.y += vector.y
    }
    get position(){
        return new Vector2(this.x, this.y)
    }
    set position(vector){
        this.x = vector.x
        this.y = vector.y
    }
    move(vector){
        this.x += vector.x
        this.y += vector.y
    }
}
