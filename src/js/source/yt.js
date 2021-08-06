import { State } from '../state';

export default class YouTube {
  #state;
  #iframe;

  constructor(parent) {
    this.parent = parent;
    this.player_el = parent.player_el;
    this.stream_url = parent.stream.url;
  }

  setup(){
    let that = this;
    this.#iframe = document.createElement("iframe");
    this.#iframe.setAttribute("allow", "autoplay; encrypted-media;");
    this.#iframe.setAttribute("src", this.stream_url + "?enablejsapi=1");
    this.#iframe.addEventListener("load", function (e) { that.play() })
    this.player_el.appendChild(this.#iframe);
    this.state = State.STOPPED;
  }

  get state() {
    return this.#state;
  }

  set state (state) {
    this.#state = state;
  }

  post_message(message) {
    this.#iframe.contentWindow.postMessage('{"event":"command","func":"' + message + '","args":""}', '*')
  }

  play() {
    this.post_message('playVideo')
    this.state = State.PLAYING;
  }

  stop() {
    this.post_message('stopVideo')
    this.state = State.STOPPED;
  }

  destroy() {
    this.stop()
    this.#iframe.remove();
    this.#iframe = undefined;
    this.state == undefined;
  }
}
