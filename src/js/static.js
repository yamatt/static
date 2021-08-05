import Player from "./player.js";
import Background from "./background.js";
import Shortcuts from "./shortcuts.js";

export default class StaticPlayer {
  BACKGROUND_VIDEO_EL_ID = "background-video"
  BACKGROUND = Background;

  PLAYER_EL_ID = "player";
  PLAYER = Player;

  SHORTCUTS = Shortcuts;

  #background_video;
  #background;
  #player_el;
  #player;
  #shortcuts;


  get background_video_el (){
    if (!this.#background_video){
      this.#background_video = document.getElementById(this.BACKGROUND_VIDEO_EL_ID);
    }
    return this.#background_video;
  }

  get background() {
    if (!this.#background) {
      this.#background = new this.BACKGROUND(this);
    }
    return this.#background;
  }

  get player_el (){
    if (!this.#player_el) {
      this.#player_el = document.getElementById(this.PLAYER_EL_ID);
    }
    return this.#player_el;
  }

  get player(){
    if(!this.#player) {
      this.#player = new this.PLAYER(this);
    }
    return this.#player;
  }

  get shortcuts() {
    if (!this.#shortcuts) {
      this.#shortcuts = new this.SHORTCUTS(this);
    }
    return this.#shortcuts;
  }

  run() {
    this.shortcuts.setup();
    this.player.start();
    this.background.start();
  }
}
