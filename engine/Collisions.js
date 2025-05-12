class Collisions{
    //static inCollision(x1, y1, r1, x2, y2, r2){
    //    let distance = Math.sqrt((x1-x2) ** 2 + (y1-y2) **2)
    //    return distance < r1 + r2
    //}
    static inCollision(gameObject1, gameObject2){
        if(gameObject1.name == gameObject2.name) return false
        if(gameObject1.findComponent(Collider) && gameObject2.findComponent(Collider)) return Collisions.colliderCollider(gameObject1, gameObject2)
    }

    /**
     * Detects if two colliders are in collision
     */
    static colliderCollider(gO1, gO2){
        for(let line1 of gO1.findComponent(Collider).lines){
            for(let line2 of gO2.findComponent(Collider).lines){
                let p1 = new Vector2(line1[0][0], line1[0][1])
                let p2 = new Vector2(line1[1][0], line1[1][1])
                let p3 = new Vector2(line2[0][0], line2[0][1])
                let p4 = new Vector2(line2[1][0], line2[1][1])
                if(Collisions.areLineSegmentsIntersecting(p1, p2, p3, p4)){
                    ctx.fillStyle = "red"
                    ctx.beginPath()
                    ctx.rect(0, 0, canvas.width, canvas.height)
                    ctx.fill()
                    return true
                }
            }
        }
        return false
    }

    static isPointOnInfiniteLineWithinLineSegment(point, point1, point2){
        let lengthOfLine = point2.minus(point1).length()
        let tangent = point2.minus(point1)
        let tangentNormalized = tangent.normalized()
        let toPoint = point.minus(point1)
        let toPointLength = tangentNormalized.dot(toPoint)      
        return toPointLength >= 0 && toPointLength <= lengthOfLine
    }

    static areLineSegmentsIntersecting(point1A, point2A, point1B, point2B){
        let [A1, B1, C1] = Collisions.findLineABC(point1A, point2A)
        let [A2, B2, C2] = Collisions.findLineABC(point1B, point2B)
        let x = B1 * C2 - B2 * C1
        let y = C1 * A2 - C2 * A1
        let z = A1 * B2 - A2 * B1           
        if (z == 0) return false          
        let collision = new Vector2(x / z, y / z)           
        return this.isPointOnInfiniteLineWithinLineSegment(collision, point1A, point2A) && this.isPointOnInfiniteLineWithinLineSegment(collision, point1B, point2B)         
    }

    static findLineABC(point1, point2){
        let A = point2.y - point1.y
        let B = -(point2.x - point1.x)
        let C = -new Vector2(A, B).dot(point1)
        return [A, B, C]
    }
}