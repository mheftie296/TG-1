class Input {
  static keysdown = []

  static keyDown (event) {
    if (!Input.keysdown.includes(event.code)) {
      Input.keysdown.push(event.code)
    }
  }
  static keyUp (event) {
    let index = Input.keysdown.indexOf(event.code)
    Input.keysdown.splice(index, 1)
  }
}
