class Collisions{
    //static inCollision(x1, y1, r1, x2, y2, r2){
    //    let distance = Math.sqrt((x1-x2) ** 2 + (y1-y2) **2)
    //    return distance < r1 + r2
    //}
    static ccw(A,B,C){
        return (C[1]-A[1]) * (B[0]-A[0]) > (B[1]-A[1]) * (C[0]-A[0])
    }
    static inCollision(A,B,C,D){
        return this.ccw(A,C,D) != this.ccw(B,C,D) && this.ccw(A,B,C) != this.ccw(A,B,D)
    }
}