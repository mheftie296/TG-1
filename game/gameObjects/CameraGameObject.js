class CameraGameObject extends GameObject{
    buffer = []
    lx = 0
    x = -10.01
    y = -10
    clx = 0
    tr = 0
    map
    start(){
        this.map = new MapGameObject
        this.ly = 0.1
        super.start()
        this.addComponent(new KeyboardMovement)
        this.addComponent(new Model(tank))
        this.transform.x = -10.0001
        this.transform.y = -10
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
        let hit = false
        //for (let index = 0; index < tankCollider.length; index++) {
        //    let rot1 = this.rotate(tankCollider.at(index-1)[0],tankCollider.at(index-1)[1],-MainScene.tr)
        //    let rot2 = this.rotate(tankCollider[index][0], tankCollider[index][1],-MainScene.tr)
        //    if(this.inCollision([-1,0], [-1,10], [rot1[0] + this.transform.x, rot1[1] - this.transform.y], [rot2[0] + this.transform.x, rot2[1] - this.transform.y])){
        //        hit = true
        //    }
        //}
        for (let index = 0; index < tankCollider.length; index++) {
            let rot1 = this.rotate(tankCollider.at(index-1)[0],tankCollider.at(index-1)[1],-MainScene.tr)
            let rot2 = this.rotate(tankCollider[index][0], tankCollider[index][1],-MainScene.tr)
            for(let collider of this.map.getColliders()){
                for(let i = collider[2].length-1; i>-1; i--){
                    let line = [collider[2].at(i-1), collider[2].at(i)]
                    console.log(line)
                    if(Collisions.inCollision(line[0], line[1], [rot1[0] + this.transform.x, rot1[1] - this.transform.y], [rot2[0] + this.transform.x, rot2[1] - this.transform.y])){
                        hit = true
                    }
                }
            }
        }
        if(hit){
            this.transform.y += movement.direction[0] * Math.cos(-MainScene.tr)*0.1
            this.transform.x += movement.direction[0] * Math.sin(-MainScene.tr)*0.1
        }
        //console.log([this.transform.x, this.transform.y], [this.transform.x+1, this.transform.y+1])
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
        Draw.updateCameraLocation(this.transform.x,this.transform.y,this.transform.z,this.clx)
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
