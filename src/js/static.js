import Player from "./player.js";
import Background from "./background.js";
import Shortcuts from "./shortcuts.js";

export default class StaticPlayer {
  PLAYER_EL_ID = "player"
  BACKGROUND_VIDEO_EL_ID = "background-video"


  get background_video_el (){
    if (!this.#background_video){
      this.#background_video = document.getElementById(this.BACKGROUND_VIDEO_EL_ID);
    }
    return this.#background_video;
  }

  get player_el (){
    if (!this.#player_el) {
      this.#player_el = document.getElementById(this.PLAYER_EL_ID);
    }
    return this.#player_el;
  }

  get player(){
    if(!this.#player) {
      this.#player = new Player(this.player_el);
    }
    return this.#player;
  }

  get background() {
    if (!this.#background) {
      this.#background = new Background(this.background_video_el);
    }
    return this.#background;
  }

  get shortcuts() {
    if (!this.#shortcuts) {
      this.#shortcuts = new Shortcuts(this.background, this.player);
    }
    return this.#shortcuts;
  }

  run() {
    this.shortcuts.setup();
    this.player.start();
    this.background.start();
  }
}
