import YouTube from "./source/yt.js"

export default class Player {
  STREAMS_URL = "streams.json"

  SOURCES = {
    "www.youtube.com": YouTube
  }

  constructor (player_el) {
    this.player_el = player_el;
  }

  get_json(url, callback) {
    fetch(url)
      .then(function(response) {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
      })
      .then(callback.bind(this))
  }

  handle_streams(streams) {
    this.update_stream(this.random_choice(streams));
  }

  random_choice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  update_stream (stream) {
    if (this.source) {this.source.destroy()}

    const stream_url = new URL(stream.url);
    this.source = new this.SOURCES[stream_url.hostname](this.player_el, stream.url)
    this.source.setup()
  }

  pause() {
    this.source.stop();
  }

  play() {
    this.source.play();
  }

  toggle() {
    this.source.toggle();
  }

  clear(){
    if (this.source) {this.source.destroy()};
  }

  start() {
    this.get_json(this.STREAMS_URL, this.handle_streams)
  }
}
