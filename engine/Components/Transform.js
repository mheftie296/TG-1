class Transform extends Component {
    x
    y
    z
    r
    get r(){return this.r}
    move(vector){
        this.x += vector.x
        this.y += vector.y
    }
}
