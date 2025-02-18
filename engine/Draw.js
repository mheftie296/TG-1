class Draw{
    static ly = 0.0
    static j = 0
    static buffer = []
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
            //point[1][0] = "#"+Math.round(100-(point[0]*5)).toString(16) + "0000"
            Draw.drawPoly(point[1])
        }
        this.buffer = []
    }
    static draw3d(poly){
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
            let aY = Math.tan(Math.atan((point[2])/(point[1])) + Draw.ly) * 400
            dpoly.push([-aX,-aY])
        }
        //console.log(dist.sort()[0])
        let d = dist/poly.length + -20000 * height/poly.length
        //console.log(d)
        this.buffer.push([d, dpoly])
        //Draw.drawPoly(dpoly)
    }
    static drawTank(poly, r){
        let newPoly = [poly[0]]
        for (const loc of poly.slice(1)) {
            newPoly.push(this.rotate(loc[0], loc[1], r))
            newPoly[newPoly.length-1][1] += 4
            newPoly[newPoly.length-1].push(loc[2])
        }
        Draw.draw3d(newPoly)
    }
    static drawTank2(poly, r){
        let newPoly = [poly[0]]
        for (const loc of poly.slice(1)) {
            newPoly.push(this.rotate(loc[0], loc[1]-4, r))
            newPoly[newPoly.length-1][1] += 4
            newPoly[newPoly.length-1].push(loc[2])
        }
        Draw.draw3d(newPoly)
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
    static drawFlat(p, r, c){
        let newPoly = [c]
        for (const loc in p) {
            newPoly.push(this.rotate(p[loc][0], p[loc][1], r))
            newPoly[newPoly.length-1][1] += 4
            newPoly[newPoly.length-1].push(-1.3001 - Draw.j)
        }
        Draw.draw3d(newPoly)
    }
    static drawModel(model, r1, r2, location){
        let loca = this.rotate(location[0], location[1], r1)
        for(const poly of model){
            let newPoly = [poly[0]]
            for (const loc of poly.slice(1)) {
                newPoly.push(this.rotate(loc[0], loc[1], r1 + r2))
                newPoly[newPoly.length-1][0] += loca[0]
                newPoly[newPoly.length-1][1] += 4 + loca[1]
                newPoly[newPoly.length-1].push(loc[2] + location[2])
            }
            Draw.draw3d(newPoly)
        }
    }
    static drawFlat2(p, r, c){
        let newPoly = [c]
        for (const loc in p) {
            newPoly.push(this.rotate(p[loc][0], p[loc][1], r))
            newPoly[newPoly.length-1][1] += 6
            newPoly[newPoly.length-1].push(p[loc][2])
        }
        Draw.draw3d(newPoly)
    }
    static setY(y){
        this.ly = y
    }
}