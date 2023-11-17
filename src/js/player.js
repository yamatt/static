import YouTube from "./source/yt.js"
import { State } from './state';

export default class Player {
  STREAMS_URL = "streams.json"

  SOURCES = {
    "www.youtube.com": YouTube
  }

  #streams;
  #stream_index;

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

  set streams(streams) {
    this.#streams = this.#streams;

    this.stream = this.parent.storage.stream_index;
  }

  get streams() {
    let that = this;
    if(!this.#streams) {
      this.get_json(this.STREAMS_URL, (streams) => {
        that.streams = streams;
      })
    }
  }

  set stream (index) {
    if (index==null) {
      index = this.random_stream_index(this.streams);
    }
    this.parent.storage.stream_index = index;
    this.#stream_index = index;

    this.start_stream()
  }

  random_stream_index(arr){
    return Math.floor(Math.random() * arr.length);
  }

  random_stream() {
    var that = this;
    let streams = Object.keys(this.streams).map(function (key) {
      return that.streams[key];
    });
    return this.random_choice(streams);
  }

  change_stream (step) {
    if(!step) {
      step=1;
    }
    this.stream = this.streams[this.#stream_index+step]
  }

  start_stream(index) {
    const stream = this.streams[index];
    if (this.source) {this.source.destroy()}
    this.parent.info.update_stream(stream);

    const stream_url = new URL(stream.url);
    this.source = new this.SOURCES[stream_url.hostname](this);
    this.source.setup()
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

  setup() {
    this.streams;
  }
}
