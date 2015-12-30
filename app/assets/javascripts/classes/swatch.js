"use strict";

class Swatch {
  constructor(swatch, preview) {
    this.swatch = swatch;
    this.preview = preview;
    this.activeColor = null;

    $(this.swatch).find(".color").on("click", function(e) {
      var newColor = e.target.attributes["data-color"].value;

      if(this.activeColor != newColor) {
        $(".active").removeClass("active");
        $(e.target).addClass("active");

        this.activeColor = newColor;
      }
    }.bind(this));
  }

  loadHex(hexColors) {
    var colors = hexColors.map(function(color) {
      return new ColorHex(color);
    });

    this.loadColors(colors);
  }

  updateActiveColor(color) {
    if(this.activeColor) {
      this.updateColor(this.activeColor, color);
    }
  }

  updateColor(colorCode, color) {
    var bgColorClass = ".bg-" + colorCode;
    var fgColorClass = ".fg-" + colorCode;

    $(this.swatch).find(bgColorClass).css("background-color", color.toCSS());
    $(this.swatch).find(fgColorClass).css("color", color.toCSS());

    $(this.preview)
    .find(bgColorClass)
    .andSelf()
    .filter(bgColorClass)
    .css("background-color", color.toCSS());

    $(this.preview)
    .find(fgColorClass)
    .andSelf()
    .filter(fgColorClass)
    .css("color", color.toCSS());
  }

  loadColors(colors) {
    for(var index = 0; index < 16; index += 1) {
      var colorCode = "base0" + index.toString(16).toUpperCase();
      this.updateColor(colorCode, colors[index]);
    }
  }
}
