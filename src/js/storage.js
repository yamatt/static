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

    get stream () {
        return this.get_item("stream")
    }

    set stream(index) {
        this.set_item("stream", index);
    }

    get background () {
        return this.get_item("background")
    }

    set background(index) {
        this.set_item("background", index);
    }
}