export default class BackgroundVideo {
  BACKGROUND_VIDEO_URL = "backgrounds.json"

  #backgrounds;
  #current_background;

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

  set backgrounds(backgrounds) {
    this.#backgrounds = backgrounds;

    this.background = this.parent.storage.background;
  }

  get backgrounds() {
    let that = this;
    if (!this.#backgrounds) {
      this.get_json(this.BACKGROUND_VIDEO_URL, (backgrounds) => {
        that.backgrounds = backgrounds;
      })
    }
    return this.#backgrounds;
  }

  set background(index) {
    if (index==null) {
      index = this.random_background_index(backgrounds);
    }
    this.parent.storage.background = index;
    this.update_background(current_background_index);
  }

  change() {
    let random_index = this.random_background_index(backgrounds);
    this.update_background(random_index);
  }


  random_background_index(arr){
    return Math.floor(Math.random() * arr.length);
  }

  update_background (background) {
    this.background_video_el.setAttribute("src", background.url);
  }

  setup() {
    this.backgrounds;
  }
}
