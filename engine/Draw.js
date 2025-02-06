class Draw{
    static ly = 0.0
    static j = 0
    static drawPoly(points){
        ctx.beginPath()
        ctx.fillStyle = points[0]
        ctx.moveTo(points[1][0] + 200, points[1][1] + 120)
        for (let index = 2; index < points.length; index++) {
            ctx.lineTo(points[index][0] + 200, points[index][1] + 120)
        }
        ctx.fill()
    }
    static draw3d(poly){
        let dpoly = []
        dpoly.push(poly[0])
        for (const point of poly.slice(1)) {
            if(point[1]<0.1)
                point[1] = 0.01
            let aX = Math.tan(Math.atan((point[0])/(point[1]))) * 400
            let aY = Math.tan(Math.atan((point[2])/(point[1])) + Draw.ly) * 400
            dpoly.push([-aX,-aY])
        }
        Draw.drawPoly(dpoly)
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
            newPoly[newPoly.length-1].push(-1.3 - Draw.j)
        }
        Draw.draw3d(newPoly)
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