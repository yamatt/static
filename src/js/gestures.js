
export default class Gestures {

  GESTURE_DELAY_MS = 200;

  GESTURE_STATE = {
    "stopped": 0,
    "started": 1
  }

  #body_el;
  #gesture_state = this.GESTURE_STATE.stopped;

  constructor (parent) {
    this.parent = parent;
  }

  get body_el() {
    if (!this.#body_el) {
      this.#body_el = document.body;
    }
    return this.#body_el;
  }

  start() {
    this.body_el.addEventListener("touchstart", this.touch_start.bind(this));
    this.body_el.addEventListener("touchend", this.touch_stop.bind(this));
    this.body_el.addEventListener("touchcancel", this.touch_stop.bind(this));
  }

  touch_start(e) {
    this.#gesture_state = this.GESTURE_STATE.started;

    setTimeout(this.timer_end.bind(this),this.GESTURE_DELAY_MS);
  }

  touch_stop(e) {
    this.#gesture_state = this.GESTURE_STATE.stopped;
  }

  timer_end() {
    if(this.#gesture_state == this.GESTURE_STATE.stopped) {
      //tapped
      this.parent.player.toggle();
    }
  }
}
