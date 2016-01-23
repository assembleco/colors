"use strict";

class ColorRGB {
  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  toCSS() {
    return "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
  }

  toHex() {
    var hex = [this.red, this.green, this.blue].map(function(value) {
      var hex = value.toString(16);
      while(hex.length < 2) { hex = "0" + hex; }

      return hex;
    }).join("");

    return new ColorHex(hex);
  }
}
