export default class Info {

    #stream_el;
    #background_el;

    constructor (parent) {
      this.parent = parent;
      this.info_el = parent.info_el;
    }

    get stream_el () {
      if (!this.#stream_el) {
        this.#stream_el = document.createElement("pre");
        this.info_el.appendChild(this.#stream_el);
      }
      return this.#stream_el
    }

    get background_el () {
      if (!this.#background_el) {
        this.#background_el = document.createElement("pre");
        this.info_el.appendChild(this.#background_el);
      }
      return this.#background_el
    }

    update_background(background) {
      let content = background.title;
      this.background_el.childNodes[0].remove()
      this.background_el.appendChild(document.createTextNode(content))
    }

    update_stream(stream) {
      let content = stream.title;
      this.stream_el.childNodes[0].remove()
      this.stream_el.appendChild(document.createTextNode(content))
    }
}
