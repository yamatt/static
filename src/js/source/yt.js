const State = {
  "STOPPED": 0,
  "PLAYING": 1
}

export default class YouTube {
  #state;

  constructor(player_el, stream_url) {
    this.player_el = player_el;
    this.stream_url = stream_url;
  }

  setup(){
    let yt_iframe = document.createElement("iframe");
    yt_iframe.setAttribute("allow", "autoplay; encrypted-media;");
    yt_iframe.setAttribute("src", this.stream_url + "?enablejsapi=1");
    this.player_el.appendChild(yt_iframe);
    this.#state = State.STOPPED;
  }

  get state() {
    return this.#state;
  }

  post_message(message) {
    this.player_el.childNodes[0].contentWindow.postMessage('{"event":"command","func":"' + message + '","args":""}', '*')
  }

  play() {
    this.post_message('playVideo')
    this.#state = State.PLAYING;
  }

  stop() {
    this.post_message('stopVideo')
    this.#state = State.STOPPED;
  }

  destroy() {
    this.stop()
    while (this.player_el.lastChild) {
      this.player_el.removeChild(this.player_el.lastChild);
    }
    this.#state == undefined;
  }
}
