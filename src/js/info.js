export default class Info {
    constructor (parent) {
      this.parent = parent;
    }

    update_background(background) {
      this.parent.onBackgroundChange?.(background);
    }

    update_stream(stream) {
      this.parent.onStreamChange?.(stream);
      this.parent.media.set_title(stream.title);
    }
}
