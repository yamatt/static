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
      .then(callback.bind(this))
  }

  set streams(streams) {
    if (!Array.isArray(streams) || streams.length === 0) {
      throw new Error("The streams list must be a non-empty array.");
    }

    this.#streams = streams;

    const savedStream = this.parent.storage.stream;
    let index = this.streams.findIndex((stream) => stream.url === savedStream);

    // Older versions stored the selected array index instead of the stream URL.
    if (index === -1 && /^\d+$/.test(savedStream ?? "")) {
      const legacyIndex = Number(savedStream);
      if (legacyIndex < this.streams.length) {
        index = legacyIndex;
      }
    }

    this.stream = index === -1 ? this.random_stream_index(this.streams) : index;
  }

  get streams() {
    return this.#streams;
  }

  set stream (index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.streams.length) {
      index = this.random_stream_index(this.streams);
    }

    this.#stream_index = index;
    this.parent.storage.stream = this.streams[index].url;

    this.start_stream();
  }

  get stream() {
    return this.streams[this.#stream_index];
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

  change_stream (step = 1) {
    if (!this.streams?.length || !Number.isInteger(this.#stream_index)) {
      return;
    }

    const next = (this.#stream_index + step % this.streams.length + this.streams.length) % this.streams.length;
    this.stream = next;
  }

  start_stream() {
    this.parent.info.update_stream(this.stream);

    if (this.source) {this.source.destroy()}
    const stream_url = new URL(this.stream.url);
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
    if (!this.source) {
      return;
    }

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
    let that = this;
    this.get_json(this.STREAMS_URL, (streams) => {
      that.streams = streams;
    })
  }
}
