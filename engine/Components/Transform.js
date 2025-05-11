class Transform extends Component {
    x
    y
    z
    r

    get w(){return this.r}
    set w(value){this.r=value}
    get x2(){return this.r}
    get y2(){return this.h}
}
