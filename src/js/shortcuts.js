export default class Shortcuts {
  KEY_MAP = {
    "Space": this.space
  }

  constructor(parent) {
    this.parent = parent;
  }

  setup() {
    const that = this;
    document.addEventListener("keypress", (e) => {
      e = e || window.event;

      this.KEY_MAP[e.code].call(that, e)
    })
  }

  space (e) {
    this.parent.player.toggle();
  }
}
