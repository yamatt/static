export default class Info {

    #stream_el;
    #background_el;

    constructor (parent) {
      this.parent = parent;
      this.info_el = parent.info_el;
    }

    get stream_el () {
      if (!this.#stream_el) {
        this.#stream_el = document.createElement("div");
        this.info_el.appendChild(this.#stream_el);
      }
      return this.#stream_el
    }

    get background_el () {
      if (!this.#background_el) {
        this.#background_el = document.createElement("div");
        this.info_el.appendChild(this.#background_el);
      }
      return this.#background_el
    }

    update_background(background) {
      if (this.background_el.childNodes.length > 0) {
        this.background_el.childNodes[0].remove()
      }
      let link = document.createElement("a");
      link.href = background.origin_url;
      link.target = "_blank"
      link.appendChild(document.createTextNode(background.title))
      this.background_el.appendChild(link)
    }

    update_stream(stream) {
      if (this.stream_el.childNodes.length > 0) {
        this.stream_el.childNodes[0].remove()
      }
      let link = document.createElement("a");
      link.href = stream.origin_url;
      link.target = "_blank"
      link.appendChild(document.createTextNode(stream.title));
      this.stream_el.appendChild(link)
      this.parent.media.set_title(stream.title);
    }
}
