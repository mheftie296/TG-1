class Model extends Component {
    model
    constructor(model){
        super()
        this.model = model
    }
    draw(){
        Draw.drawModel(this.model, this.transform.r, [this.transform.x, this.transform.y, this.transform.z])
    }
}