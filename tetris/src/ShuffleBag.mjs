export class ShuffleBag {
  #bag;
  #items;

  constructor(items) {
    this.#items = items;
    this.#bag = [];
  }

  pull() {
    if (this.#bag.length === 0) {
      this.#bag = this.#items.slice();
    }
    const index = Math.floor(Math.random() * this.#bag.length);
    const item = this.#bag[index];
    this.#bag.splice(index, 1);
    return item;
  }

}