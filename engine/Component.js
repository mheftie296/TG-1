class Component {
  parent
  get transform () {
    return this.parent.transform
  }
  start () {}
  update () {}
  draw () {}
}
