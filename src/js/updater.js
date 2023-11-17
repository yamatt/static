export default class Updater {
  RELEASE_URL = "release"
  RELESE_CHECK_SECONDS = 60 // low for testing

  constructor (parent) {
    this.parent = parent;

    this.this_release = null;
    this.check_loop = null;
  }

  get_release(url, callback) {
    return fetch(url, {cache: "no-cache"})
      .then(function(response) {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
        return response.text();
      })
      .then(callback.bind(this))
  }

  update_release(release) {
    this.release = release;
  }

  start_check_loop() {
    const delay = this.RELESE_CHECK_SECONDS * 1000 // in milliseconds

    this.check_loop = setInterval(this.check_release.bind(this), delay);
  }

  check_release() {
    let that = this;
    this.get_release(this.RELEASE_URL, (latest_release) => {
      if (latest_release != that.release) {
        that.refresh_page()
      }
    })
  }

  refresh_page() {
    window.location.reload();
  }

  start() {
    this.get_release(this.RELEASE_URL, this.update_release)
      .then(this.start_check_loop.bind(this));
  }
}
