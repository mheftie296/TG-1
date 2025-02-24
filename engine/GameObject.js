class GameObject {
    components = []
    constructor() {
        this.transform = new Transform()
        this.components.push(this.transform)
    }
}