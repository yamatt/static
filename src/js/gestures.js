
export default class Gestures {

  SWIPE_THRESHOLD_PX = 50;

  #body_el;
  #touch_start;

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
    this.body_el.addEventListener("touchcancel", this.touch_cancel.bind(this));
  }

  touch_start(e) {
    const touch = e.changedTouches[0];
    this.#touch_start = { x: touch.clientX, y: touch.clientY };
  }

  touch_stop(e) {
    if (!this.#touch_start) {
      return;
    }

    const touch = e.changedTouches[0];
    const delta_x = touch.clientX - this.#touch_start.x;
    const delta_y = touch.clientY - this.#touch_start.y;
    this.#touch_start = null;

    if (Math.abs(delta_x) >= this.SWIPE_THRESHOLD_PX && Math.abs(delta_x) > Math.abs(delta_y)) {
      this.parent.player.change_stream(delta_x < 0 ? 1 : -1);
      return;
    }

    if (Math.abs(delta_y) >= this.SWIPE_THRESHOLD_PX && Math.abs(delta_y) > Math.abs(delta_x)) {
      this.parent.background.change();
      return;
    }

    this.parent.player.toggle();
  }

  touch_cancel() {
    this.#touch_start = null;
  }
}
