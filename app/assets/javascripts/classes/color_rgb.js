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
}
