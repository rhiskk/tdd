import { expect } from "chai";
import { Shop } from "../src/Shop.mjs";
import { Item } from "../src/Item.mjs";

describe("Gilded Rose", () => {
  it("shop is empty by default", () => {
    const gildedRose = new Shop();
    expect(gildedRose.items).to.be.empty;
  });

  it("sulfuras should not change quality", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(80);
  });

  it("sulfuras should not change sell in", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn()).to.equal(1);
  });

  it("sulfuras should not change quality even with negative sell in", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(80);
  });

  it("aged brie should increase quality", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(2);
  });

  it("aged brie should still increase quality when sell in is 0 or less", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(3);
  });

  it("aged brie should not increase quality over 50 even when sell in is below 0", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(50);
  });

  it("quality() cannot be more than 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(50);
  });

  it("backstage passes should increase quality by 1 when sell in is 11 or more", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 1),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(2);
  });

  it("backstage passes should increase quality by 2 when sell in is between 6 and 10", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 1),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(3);
  });

  it("backstage passes should not icrease quality over 50 even when sell in is 10 or less", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(50);
  });

  it("backstage passes should increase quality by 3 when sell in is 5 or less", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 1),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(4);
  });

  it("backstage passes should not icrease quality over 50 even when sell in is 5 or less", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(50);
  });

  it("backstage passes should drop quality to 0 when sell in is less than 0", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 1),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(0);
  });

  it("backstage passes with negative sell in should not decrease in quality", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", -10, 0),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(0);
  });

  it("basic item should decrease quality by 1", () => {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(0);
  });

  it("basic item should decrease quality by 2 when sell in is less than 0", () => {
    const gildedRose = new Shop([new Item("foo", 0, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(0);
  });

  it("basic item quality should not drop below 0 even when sell in is less than 0", () => {
    const gildedRose = new Shop([new Item("foo", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(0);
  });

  it("quality cannot be less than 0", () => {
    const gildedRose = new Shop([new Item("foo", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(0);
  });

  it("conjured item should decrease quality by 2 when it is not out of date", () => {
    const gildedRose = new Shop([new Item("Conjured Item", 2, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(2);
  });

  it("conjured item should decrease quality by 4 when it is out of date", () => {
    const gildedRose = new Shop([new Item("Conjured Item", 0, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality()).to.equal(0);
  });

  it("items name should not change", () => {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name()).to.equal("foo");
  });

});
