class Component {
  parent
  constructor () {
    this.started = false
  }
  get transform () {
    return this.parent.transform
  }
  start () {}
  update () {}
  draw () {}
}
