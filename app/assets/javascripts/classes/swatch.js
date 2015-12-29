"use strict";

class Swatch {
  constructor(element) {
    this.element = element;
  }

  loadHex(hexColors) {
    var colors = hexColors.map(function(color) { return new ColorHex(color); });

    this.loadColors(colors);
  }

  loadColors(colors) {
    for(var index = 0; index < 16; index += 1) {
      var hex = index.toString(16).toUpperCase();
      var bgColorClass = ".bg-base0" + hex;
      var fgColorClass = ".fg-base0" + hex;

      $(this.element).find(bgColorClass).andSelf().filter(bgColorClass).css(
        "background-color",
        colors[index].toCSS()
      );

      $(this.element).find(fgColorClass).andSelf().filter(fgColorClass).css(
        "color",
        colors[index].toCSS()
      );
    }
  }
}
