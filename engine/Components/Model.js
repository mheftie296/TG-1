class Model extends Component {
    model
    constructor(model){
        super()
        this.model = model
    }
    draw(){
        Draw.drawModel(this.model, this.transfrom.r, 0, [this.transfrom.x, this.transfrom.y, this.transfrom.z])
        console.log('draw model' + this.model)
    }
}