"use strict";

class ColorHex {
  constructor(hex) {
    this.hex = hex.replace("#", "");
  }

  toCSS() {
    return "#" + this.hex;
  }

  toHex() {
    return this;
  }
}
