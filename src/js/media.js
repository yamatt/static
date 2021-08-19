export default class Media {

  #metadata = {};

  constructor(parent) {
      this.parent = parent;
  }

  get media () {
    if ('mediaSession' in navigator) {
      return navigator.mediaSession;
    }
  }

  set_metadata() {
    this.media.metadata = new MediaMetadata(this.#metadata);
  }

  set_artist(artist) {
    this.#metadata.artist = artist;
    this.set_metadata()
  }

  set_title(title) {
    this.#metadata.title = title;
    this.set_metadata()
  }

  set_artwork(url) {
    this.#metadata.artwork = [{src: url}];
    this.set_metadata()
  }

  start() {
    this.set_artwork("favicon.gif");
    this.media.setActionHandler('play', this.parent.player.toggle);
    this.media.setActionHandler('pause', this.parent.player.toggle);
    this.media.setActionHandler('stop', this.parent.player.toggle);
    this.media.setActionHandler('seekbackward', this.parent.shortcuts.prev_station);
    this.media.setActionHandler('seekforward', this.parent.shortcuts.next_station);
    this.media.setActionHandler('previoustrack', this.parent.shortcuts.prev_station);
    this.media.setActionHandler('nexttrack', this.parent.shortcuts.next_station);
  }
}
