export default class Shortcuts {
  KEY_MAP = {
    "Space": this.space
  }

  constructor(background, player) {
    this.background = background;
    this.player = player;
  }

  setup() {
    const that = this;
    document.addEventListener("keypress", (e) => {
      e = e || window.event;

      this.KEY_MAP[e.code].call(that, e)
    })
  }

  space (e) {
    this.player.toggle();
  }
}
