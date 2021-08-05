class BackgroundVideo {
  BACKGROUND_VIDEO_URL = "backgrounds.json"
  constructor (background_video_el) {
    this.background_video_el = background_video_el;
    this.background_video_el.defaultPlaybackRate = 0.5;
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
      .catch(function(error) {
        console.log(error.message);
      });
  }

  function handle_backgrounds(backgrounds) {
    this.update_video(this.random_choice(backgrounds));
  }

  function random_choice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function update_video (background) {
    this.background_video_el.setAttribute("src", background.url);
  }

  function start() {
    this.get_json(this.BACKGROUND_VIDEO_URL, this.handle_backgrounds)
  }
}
