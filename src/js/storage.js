export default class Storage {
    constructor (parent) {
      this.parent = parent
    }

    get storage() {
        return localStorage;
    }

    set_item(key, value) {
        this.storage.setItem(key, value)
    }

    get_item(key, value) {
        return this.storage.getItem(key)
    }

    get stream_index () {
        return this.get_item("stream")
    }

    set stream_index(index) {
        this.set_item("stream", index);
    }

    get background_index () {
        return this.get_item("background")
    }

    set background_index(index) {
        this.set_item("background", index);
    }
}