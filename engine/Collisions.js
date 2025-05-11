class Collisions{
    //static inCollision(x1, y1, r1, x2, y2, r2){
    //    let distance = Math.sqrt((x1-x2) ** 2 + (y1-y2) **2)
    //    return distance < r1 + r2
    //}
    static ccw(A,B,C){
        return (C[1]-A[1]) * (B[0]-A[0]) > (B[1]-A[1]) * (C[0]-A[0])
    }
    static inCollisionOld(A,B,C,D){
        return this.ccw(A,C,D) != this.ccw(B,C,D) && this.ccw(A,B,C) != this.ccw(A,B,D)
    }

    static inCollision(gameObject1, gameObject2){
        if(gameObject1.findComponent(Collider) && gameObject2.findComponent(Collider)) return Collisions.colliderCollider(gameObject1, gameObject2)
    }

    /**
     * Detects if two colliders are in collision
     */
    static colliderCollider(gO1, gO2){
        gO1.findComponent(Collider).rotation = gO1.findComponent(Transform).r
        gO2.findComponent(Collider).rotation = gO2.findComponent(Transform).r
        for([la1, la2] in gO1.findComponent(Collider).lines){
            for([lb1, lb2] in gO2.findComponent(Collider).lines){
                if(Collisions.areLineSegmentsIntersecting(la1, la2, lb1, lb2)){
                    return True
                }
            }
        }
        return false
    }
    /**
     * Detects if two lines are crossed
     * like lineLine but it takes lines so it's lineLineLine
     */
    static lineLineLine(line1, line2){
        let [start1, end1] = Collisions.getEndsOfLine(line1)
        let [start2, end2] = Collisions.getEndsOfLine(line2)
        return Collisions.areLineSegmentsIntersecting(start1, end1, start2, end2)
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
}