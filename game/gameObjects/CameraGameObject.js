class CameraGameObject extends GameObject{
    buffer = []
    lx = 0
    x = -10.01
    y = -10
    clx = 0
    tr = 0
    start(){
        this.ly = 0.1
        super.start()
        this.addComponent(new KeyboardMovement)
    }
    updateLocation(x, y, z, r){
        this.transform.x = x
        this.transform.y = y
        this.transform.z = z
        this.transform.r = r
    }
    update(){
        super.update()
        let movement = this.components[1]
        this.transform.y -= movement.direction[0] * Math.cos(-MainScene.tr)*0.1
        this.transform.x -= movement.direction[0] * Math.sin(-MainScene.tr)*0.1
        MainScene.tr -= 0.025 * movement.direction[1]
        this.clx += 0.01 * movement.direction[1]
        this.lx += 0.05 * movement.direction[1]
        this.lx += 0.05 * movement.direction[2]
        this.clx += 0.05 * movement.direction[2]
        MainScene.lx = this.lx
        this.clx = (this.lx + this.clx*3)/4
        MainScene.clx = this.clx
        this.transform.r = this.clx
        if(Input.keysdown.includes("Space") && !MainScene.spc){
            MainScene.bullets.push([MainScene.fx, MainScene.fy, MainScene.clx])
            MainScene.spc = true
        }
        if(!Input.keysdown.includes("Space")){MainScene.spc = false}
    }
    drawPoly(points){
        ctx.beginPath()
        ctx.fillStyle = points[0]
        ctx.moveTo(points[1][0] + 200, points[1][1] + 120)
        for (let index = 2; index < points.length; index++) {
            ctx.lineTo(points[index][0] + 200, points[index][1] + 120)
        }
        ctx.fill()
    }
    doDraw(){
        //https://www.w3schools.com/js/js_array_sort.asp
        this.buffer.sort(function(a, b){return a[0] - b[0]})
        this.buffer.reverse()
        for(let point of this.buffer){
            //point[1][0] = "#"+Math.round(100-(point[0]*0.005)).toString(16) + "0000"
            //console.log((point[0]*0.005))
            this.drawPoly(point[1])
        }
        this.buffer = []
    }
    draw3d(poly){
        let dpoly = []
        let dist = 0
        let height = 0
        dpoly.push(poly[0])
        let draw = false
        for (const point of poly.slice(1)){
            if(point[1]>0.1){
                draw = true
                break
            }
        }
        if(!draw){
            return
        }
        for (const point of poly.slice(1)) {
            dist += (Math.sqrt(point[0]**2 + point[1]**2))
            height += point[2]
            if(point[1]<0.1)
                point[1] = 0.01
            let aX = Math.tan(Math.atan((point[0])/(point[1]))) * 400
            let aY = Math.tan(Math.atan((point[2])/(point[1])) + this.ly) * 400
            dpoly.push([-aX,-aY])
        }
        //console.log(dist.sort()[0])
        let d = dist/poly.length + -20000 * height/poly.length
        //console.log(d)
        this.buffer.push([d, dpoly])
        //Draw.drawPoly(dpoly)
    }
    rotate(x, y, a){
        let distance = Math.sqrt(y*y+x*x)
        let angle
        if(y<0)
            angle = -Math.acos(x/distance) + a
        else
            angle = Math.acos(x/distance) + a
        return [Math.cos(angle) * distance, Math.sin(angle) * distance]
    }
    drawModel(model, r, location){
        let x = location[0] + this.transform.x
        let y = location[1] + this.transform.y
        let z = location[2] + this.transform.z
        let loca = this.rotate(x, y, this.transform.r)
        for(const poly of model){
            let newPoly = [poly[0]]
            for (const loc of poly.slice(1)) {
                newPoly.push(this.rotate(loc[0], loc[1], this.transform.r + r))
                newPoly[newPoly.length-1][0] += loca[0]
                newPoly[newPoly.length-1][1] += 4 + loca[1]
                newPoly[newPoly.length-1].push(loc[2] + z)
            }
            this.draw3d(newPoly)
        }
    }
    drawModelFixed(model, r, location){
        let x = location[0]// + this.transform.x
        let y = location[1]// + this.transform.y
        let z = location[2]// + this.transform.z
        let loca = this.rotate(x, y, 0)
        for(const poly of model){
            let newPoly = [poly[0]]
            for (const loc of poly.slice(1)) {
                newPoly.push(this.rotate(loc[0], loc[1], 0 + r))
                newPoly[newPoly.length-1][0] += loca[0]
                newPoly[newPoly.length-1][1] += 4 + loca[1]
                newPoly[newPoly.length-1].push(loc[2] + z)
            }
            this.draw3d(newPoly)
        }
    }
}
