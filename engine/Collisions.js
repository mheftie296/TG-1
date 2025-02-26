class Collisions{
    static inCollision(x1, y1, r1, x2, y2, r2){
        let distance = Math.sqrt((x1-x2) ** 2 + (y1-y2) **2)
        return distance < r1 + r2
    }
}