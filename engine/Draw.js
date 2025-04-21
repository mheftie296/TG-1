class Draw{
    static buffer = []
    static cameraLocation = [0,0,0,0,0.1]
    static updateCameraLocation(x, y, z, r){
        this.cameraLocation[0] = x
        this.cameraLocation[1] = y
        this.cameraLocation[2] = z
        this.cameraLocation[3] = r
    }
    static drawPoly(points){
        ctx.beginPath()
        ctx.fillStyle = points[0]
        ctx.moveTo(points[1][0] + 200, points[1][1] + 120)
        for (let index = 2; index < points.length; index++) {
            ctx.lineTo(points[index][0] + 200, points[index][1] + 120)
        }
        ctx.fill()
    }
    static doDraw(){
        //https://www.w3schools.com/js/js_array_sort.asp
        this.buffer.sort(function(a, b){return a[0] - b[0]})
        this.buffer.reverse()
        for(let point of this.buffer){
            this.drawPoly(point[1])
        }
        this.buffer = []
    }
    static draw3d(poly){
        let dpoly = []
        let dist = 0
        let height = 0
        dpoly.push(poly[0])
        let draw = false
        //.log(poly[0], poly[1], poly[2])
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
            let aX = (point[0]/point[1]) * 400
            let aY = (point[2]/point[1]) * 400 + 30 //Math.tan(Math.atan((point[2])/(point[1])) + this.ly) * 400
            dpoly.push([-aX,-aY])
        }
        //console.log(dist.sort()[0])
        let d = dist/poly.length + -20000 * height/poly.length
        //console.log(d)
        this.buffer.push([d, dpoly])
        //Draw.drawPoly(dpoly)
    }
    static rotate(x, y, a){
        let distance = Math.sqrt(y*y+x*x)
        let angle
        if(y<0)
            angle = -Math.acos(x/distance) + a
        else
            angle = Math.acos(x/distance) + a
        return [Math.cos(angle) * distance, Math.sin(angle) * distance]
    }
    static drawModel(model, r, location){
        let x = location[0] + this.cameraLocation[0]
        let y = location[1] + this.cameraLocation[1]
        let z = location[2] + this.cameraLocation[2]
        let loca = this.rotate(x, y, this.cameraLocation[3])//MainScene.clx)
        for(const poly of model){
            let newPoly = [poly[0]]
            for (const loc of poly.slice(1)) {
                newPoly.push(this.rotate(loc[0], loc[1], MainScene.clx + r))
                newPoly[newPoly.length-1][0] += loca[0]
                newPoly[newPoly.length-1][1] += 4 + loca[1]
                newPoly[newPoly.length-1].push(loc[2] + z)
            }
            this.draw3d(newPoly)
        }
    }
    static drawModelFixed(model, r, location){
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