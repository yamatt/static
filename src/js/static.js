import Player from "./player.js";
import Background from "./background.js";
import Shortcuts from "./shortcuts.js";
import Info from "./info.js";
import Media from "./media.js";
import Gestures from "./gestures.js";
import Updater from "./updater.js";
import Storage from "./storage.js";


export default class StaticPlayer {
  BACKGROUND_VIDEO_EL_ID = "background-video"
  BACKGROUND = Background;

  PLAYER_EL_ID = "player";
  PLAYER = Player;

  SHORTCUTS = Shortcuts;

  INFO_EL_ID = "info";
  INFO = Info;

  MEDIA = Media;

  GESTURES = Gestures;

  UPDATER = Updater;

  STORAGE = Storage;

  #background_video;
  #background;
  #player_el;
  #player;
  #shortcuts;
  #info_el;
  #info;
  #media;
  #gestures;
  #updater;
  #storage;


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

  get info_el (){
    if (!this.#info_el) {
      this.#info_el = document.getElementById(this.INFO_EL_ID);
    }
    return this.#info_el;
  }

  get info(){
    if(!this.#info) {
      this.#info = new this.INFO(this);
    }
    return this.#info;
  }

  get media () {
    if(!this.#media) {
      this.#media = new this.MEDIA(this);
    }
    return this.#media;
  }

  get gestures () {
    if(!this.#gestures) {
      this.#gestures = new this.GESTURES(this);
    }
    return this.#gestures;
  }

  get updater () {
    if(!this.#updater) {
      this.#updater = new this.UPDATER(this);
    }
    return this.#updater;
  }

  get storage () {
    if(!this.#storage) {
      this.#storage = new this.STORAGE(this);
    }
    return this.#storage;
  }

  run() {
    this.shortcuts.setup();
    this.player.setup();
    this.background.setup();
    this.media.start();
    this.gestures.start();
    this.updater.start();
  }
}
