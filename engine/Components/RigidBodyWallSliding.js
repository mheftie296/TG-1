class RigidBodyWallSliding extends Rigidbody {
    update(){
        let physicsStatics = Engine.currentScene.gameObjects.filter(go=>go.findComponents(PhysicsStatic))
        let originalPosition = this.transform.position
        this.vy += this.gravity * Time.deltaTime
        let velocity = new Vector2(this.vx, this.vy)
        let maxComponent = Math.max(Math.abs(this.vx), Math.abs(this.vy))
        velocity = velocity.normalized().scaled(maxComponent)
        this.transform.move(velocity.scaled(Time.deltaTime))
        let tries = 0
        while(true){
          if(tries++ >= 3){
            this.transform.position = originalPosition
            break
          }
          let [minDistance, minObstacle, minFinalLocation] = Physics.findNearestCollisionTime(originalPosition, this.parent, physicsStatics)
          this.transform.position = minFinalLocation
          if(!minObstacle) break
          let line2 = Line2.fromGameObject(minObstacle)
          let circleCenter = Vector2.fromGameObject(this.parent)
          let closestPoint = Collisions.findClosestPointOnLineSegment(circleCenter, line2.point1, line2.point2)
          let toClosestPoint = circleCenter.minus(closestPoint).normalized()          
          let tangent = new Vector2(toClosestPoint.y, -toClosestPoint.x)
          if(velocity.dot(tangent) < 0) tangent = tangent.scaled(-1)
          let perpendicular = toClosestPoint
          this.transform.move(perpendicular.scaled(.0001))
          let distanceTraveled = velocity.dot(tangent)
          let directionTraveled = tangent.scaled(distanceTraveled).scaled(Time.deltaTime)
          this.transform.move(directionTraveled)
        }
    }
}