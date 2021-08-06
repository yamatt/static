State = {
  "STOPPED": 0,
  "PLAYING": 1
}

export default class YouTube {
  constructor(player_el, stream_url) {
    this.player_el = player_el;
    this.stream_url = stream_url;
  }

  setup(){
    let yt_iframe = document.createElement("iframe");
    yt_iframe.setAttribute("allow", "autoplay; encrypted-media;");
    yt_iframe.setAttribute("src", this.stream_url + "?enablejsapi=1");
    this.player_el.appendChild(yt_iframe);
    this.player_state = State.STOPPED;
  }

  post_message(message) {
    this.player_el.childNodes[0].contentWindow.postMessage('{"event":"command","func":"' + message + '","args":""}', '*')
  }

  play() {
    this.post_message('playVideo')
    this.player_state = State.PLAYING;
  }

  stop() {
    this.post_message('stopVideo')
    this.player_state = State.STOPPED;
  }

  toggle() {
    console.log(this);
    if (this.player_state == State.PLAYING) {
      this.stop();
      return;
    }
    else if (this.player_state == State.STOPPED) {
      this.play();
      return;
    }
  }

  destroy() {
    this.stop()
    while (this.player_el.lastChild) {
      this.player_el.removeChild(this.player_el.lastChild);
    }
    this.state == undefined;
  }
}
