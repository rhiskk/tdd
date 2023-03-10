export class Item {
  #MAX_QUALITY = 50;
  #MIN_QUALITY = 0;
  #LEGENDARY_QUALITY = 80;
  #sellIn;
  #quality;
  #name;

  constructor(name, sellIn, quality) {
    this.#name = name;
    this.#sellIn = sellIn;
    this.#quality = this.#isLegendary() ? this.#LEGENDARY_QUALITY : quality;
  }

  update() {
    if (this.#isLegendary()) {
      return;
    }
    switch (true) {
      case this.#isConjured():
        this.#updateConjured();
        break;

      case this.#isAged():
        this.#updateAged();
        break;

      case this.#isTicket():
        this.#updateTicket();
        break;

      default:
        this.#updateNormal();
        break;
    }
  }

  sellIn() {
    return this.#sellIn;
  }

  quality() {
    return this.#quality;
  }

  name() {
    return this.#name;
  }

  #updateAged() {
    this.#sellIn--;
    const increase = this.#isOutOfDate() ? 2 : 1;
    this.#increaseQuality(increase);
  }

  #updateTicket() {
    let increase = 1;
    if (this.#sellIn <= 10) {
      increase++;
    }
    if (this.#sellIn <= 5) {
      increase++;
    }
    this.#sellIn--;
    this.#isOutOfDate() ? (this.#quality = 0) : this.#increaseQuality(increase);
  }

  #updateNormal() {
    this.#sellIn--;
    const decrease = this.#isOutOfDate() ? 2 : 1;
    this.#decreaseQuality(decrease);
  }

  #updateConjured() {
    this.#sellIn--;
    const decrease = this.#isOutOfDate() ? 4 : 2;
    this.#decreaseQuality(decrease);
  }

  #isConjured() {
    return this.#name === "Conjured Item";
  }

  #isAged() {
    return this.#name === "Aged Brie";
  }

  #isTicket() {
    return this.#name === "Backstage passes to a TAFKAL80ETC concert";
  }

  #isLegendary() {
    return this.#name === "Sulfuras, Hand of Ragnaros";
  }

  #isOutOfDate() {
    return this.#sellIn < 0;
  }

  #increaseQuality(amount = 1) {
    this.#quality = Math.min(this.#quality + amount, this.#MAX_QUALITY);
  }

  #decreaseQuality(amount = 1) {
    this.#quality = Math.max(this.#quality - amount, this.#MIN_QUALITY);
  }
}