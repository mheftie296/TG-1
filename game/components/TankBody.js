class TankBody extends Model {
    tr
    draw(){
        Draw.drawModel(tank, this.transform.r + this.tr, [this.transform.x, this.transform.y, this.transform.z])
    }
}