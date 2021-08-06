export default class BackgroundVideo {
  BACKGROUND_VIDEO_URL = "backgrounds.json"

  constructor (parent) {
    this.parent = parent;
    this.background_video_el = parent.background_video_el;
    this.background_video_el.defaultPlaybackRate = 0.5;
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

  handle_backgrounds(backgrounds) {
    this.backgrounds = backgrounds;
  }

  random_choice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  random_background() {
    var that = this;
    let backgrounds = Object.keys(this.backgrounds).map(function (key) {
      return that.backgrounds[key];
    });
    return this.random_choice(backgrounds)
  }

  stream_changed() {
    if (localStorage.getItem("bg-" + this.parent.player.stream.id)) {
      this.update_background(this.backgrounds[this.parent.player.stream.id])
    }
  }

  update_background (background) {
    this.background_video_el.setAttribute("src", background.url);
  }

  change() {
    this.background = this.random_background()
    this.update_background(this.background);
    this.parent.info.update_background(this.background);
    if (this.parent.player.stream) {
      localStorage.setItem("bg-" + this.parent.player.stream.id, this.background.id);
    }

  }

  get_backgrounds() {
    return this.get_json(this.BACKGROUND_VIDEO_URL, this.handle_backgrounds)
  }

  start() {
    this.get_backgrounds()
      .then(this.change.bind(this))
  }
}
