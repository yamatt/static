import YouTube from "./source/yt.js"
import { State } from './state';

export default class Player {
  STREAMS_URL = "streams.json"

  SOURCES = {
    "www.youtube.com": YouTube
  }

  constructor (parent) {
    this.parent = parent
    this.player_el = parent.player_el;
  }

  get_json(url, callback) {
    return fetch(url)
      .then(function(response) {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
      })
  }

  handle_streams(streams) {
    this.streams = streams;
  }

  random_choice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  random_stream() {
    var that = this;
    let streams = Object.keys(this.streams).map(function (key) {
      return that.streams[key];
    });
    return this.random_choice(streams);
  }

  change_stream () {
    this.stream = this.random_stream();
    this.start_stream();
  }

  start_stream() {
    if (!this.stream && localStorage.getItem("stream")) {
      this.stream = this.streams[localStorage.getItem("stream")]
    }
    if (this.source) {this.source.destroy()}
    this.parent.info.update_stream(this.stream);

    const stream_url = new URL(this.stream.url);
    this.source = new this.SOURCES[stream_url.hostname](this);
    this.source.setup()
    localStorage.setItem("stream", this.stream.id);
  }

  pause() {
    this.source.stop();
  }

  play() {
    this.source.play();
  }

  toggle() {
    if (this.source.state == State.PLAYING) {
      this.source.stop();
      return;
    }
    else if (this.source.state == State.STOPPED) {
      this.source.play();
      return;
    }
  }

  clear(){
    if (this.source) {this.source.destroy()};
  }

  start() {
    this.get_json(this.STREAMS_URL, this.handle_streams)
      .then(this.handle_streams.bind(this))
      .then(this.start_stream.bind(this))
  }
}
