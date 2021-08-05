import YouTube as YouTubeStreamer from "stream/yt"

class Player {
  STREAMS_URL = "streams.json"

  STREAMERS = {
    "www.youtube.com": YouTubeStreamer
  }

  constructor (player_el) {
    this.player_el = player_el;
  }

  function get_json(url, callback) {
    fetch(backgrounds_url)
      .then(function(response) {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
      })
      .then(callback)
      .then(() => {this.play()})
      .catch(function(error) {
        console.log(error.message);
      });
  }

  function handle_streams(streams) {
    this.update_stream(this.random_choice(streams));
  }

  function random_choice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function update_stream (stream) {
    if (this.streamer) {this.streamer.destroy()}

    const stream_url = new URL(stream.url);
    this.streamer = this.STREAMERS[stream_url.hostname](this.player_el, stream.url)
    this.streamer.setup()
  }

  function pause() {
    this.streamer.stop();
  }

  function play() {
    this.streamer.play();
  }

  function toggle() {
    this.streamer.toggle();
  }

  function clear(){
    if (this.streamer) {this.streamer.destroy()};
  }

  function start() {
    this.get_json(this.STREAMS_URL, this.handle_streams)
  }
}
