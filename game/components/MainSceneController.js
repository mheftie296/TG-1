class MainSceneController extends Component{
    constructor(nextScene){
        super()
        this.nextScene = nextScene
    }
    update() {
        let playerGameObject = Engine.currentScene.findGameObject("Player Game Object")
        let guardGameObjects = Engine.currentScene.findGameObject("Guard Game Object")

        for (let guardGameObject of guardGameObjects) {
            if(Collisions.inCollision){
                engine.nextScene = new DeathScene()
            }
        }

        
    }
}