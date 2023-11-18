export default class BackgroundVideo {
  BACKGROUND_VIDEO_URL = "backgrounds.json"

  #backgrounds;
  #background_index;

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

    this.background = this.parent.storage.background_index;
  }

  get backgrounds() {
    return this.#backgrounds;
  }

  set background(index) {
    if (isNaN(index)) {
      index = this.random_background_index(this.backgrounds);
    }

    this.parent.storage.background_index = index;
    this.#background_index = index;

    this.update_background();
  }

  change() {
    this.background = this.random_background_index(this.backgrounds);
  }


  random_background_index(arr){
    return Math.floor(Math.random() * arr.length);
  }

  update_background () {
    this.background_video_el.setAttribute("src", this.backgrounds[this.#background_index].url);
  }

  setup() {
    let that = this;
    this.get_json(this.BACKGROUND_VIDEO_URL, (backgrounds) => {
      that.backgrounds = backgrounds;
    })
  }
}
