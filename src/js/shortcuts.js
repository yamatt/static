export class Shortcuts {
  KEY_MAP = {
    "Space": space
  }

  constructor(background, player) {
    this.background = background;
    this.player = player;
  }

  setup() {
    document.addEventLisenter("keypress", (e) => {
      e = e || window.event;

      this.KEY_MAP[e.code](e)
    })
  }

  space (e) {
    this.player.toggle();
  }
}
