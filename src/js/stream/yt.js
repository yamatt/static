class State {
  STOPPED = 0
  PLAYING = 1
}

class YouTubePlayer {
  constructor(player_el, stream_url) {
    this.player_el = player_el;
  }

  function setup(){
    var yt_iframe = document.createElement("iframe");
    yt_iframe.setAttribute("allow", "autoplay; encrypted-media;");
    yt_iframe.setAttribute("src", stream.url + "?enablejsapi=1");
    this.player_el.appendChild(yt_iframe);
    this.state = State.STOPPED;
  }

  function post_message(message) {
    this.player_el.childNodes[0].contentWindow.postMessage('{"event":"command","func":"' + message + '","args":""}', '*')
  }

  function play() {
    if (this.state == State.STOPPED) {
      this.post_message('playVideo')
      this.state = State.PLAYING;
    }
  }

  function stop() {
    if (this.state == State.PLAYING) {
      this.post_message('stopVideo')
      this.state = State.STOPPED;
    }
  }

  function toggle() {
    if (this.state == State.PLAYING) {
      this.stop();
      return;
    }
    else if (this.state == State.STOPPED) {
      this.play();
      return;
    }
  }

  function destroy() {
    this.stop()
    while (this.player_el.lastChild) {
      this.player_el.removeChild(this.player_el.lastChild);
    }
    this.state == undefined;
  }
}