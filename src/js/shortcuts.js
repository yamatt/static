export default class Shortcuts {
  KEY_MAP = {
    "Space": this.playpause,
    "ArrowRight": this.next_station,
    "ArrowLeft": this.prev_station,
    "ArrowDown": this.change_background,
    "ArrowUp": this.change_background
  }

  media;

  constructor(parent) {
    this.parent = parent;
  }

  setup() {
    const that = this;
    document.addEventListener("keyup", (e) => {
      e = e || window.event;

      if (e.code in this.KEY_MAP) {
        if (e.code === "ArrowRight" || e.code === "ArrowLeft") {
          e.preventDefault();
        }
        this.KEY_MAP[e.code].call(that, e)
      }
    })
  }

  playpause () {
    this.parent.player.toggle();
  }

  next_station () {
    this.parent.player.change_stream(1)
  }

  prev_station () {
    this.parent.player.change_stream(-1)
  }

  change_background () {
    this.parent.background.change();
  }
}
