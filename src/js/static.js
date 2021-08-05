import Player from "./player.js";
import Background from "./background.js";
import Shortcuts from "./shortcuts.js";

class StaticPlayer {
  PLAYER_EL_ID = "player"
  BACKGROUND_VIDEO_EL_ID = "background-video"


  get background_video_el (){
    if (!this._background_video){
      this._background_video = document.getElementById(this.BACKGROUND_VIDEO_EL_ID);
    }
    return this._background_video;
  }

  get player_el (){
    if (!this._player_el) {
      this._player_el = document.getElementById(this.PLAYER_EL_ID);
    }
    return this._player_el;
  }

  get player(){
    if(!this._player) {
      this._player = new Player(this.player_el);
    }
    return this._player;
  }

  get background() {
    if (!this._background) {
      this._background = new BackgroundVideo(this.background_video_el);
    }
    return this._background;
  }

  get shortcuts() {
    if (!this._shortcuts) {
      this._shortcuts = new Shortcuts(this.background, this.player);
    }
    return this._shortcuts;
  }

  function run() {
    this.shortcuts.setup();
    this.player.start();
    this.background.start();
  }
}
