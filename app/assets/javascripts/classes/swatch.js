"use strict";

class Swatch {
  constructor(swatch, preview) {
    this.colors = [];
    this.swatch = swatch;
    this.preview = preview;
    this.activeColor = null;
    this.onChangeCallbacks = [];

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

    this.onChangeCallbacks.forEach(function(callback) {
      callback(this);
    }.bind(this));
  }

  // private API
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

    var colorIndex = parseInt(colorCode.replace("base0", ""), 16);
    this.colors[colorIndex] = color;
  }

  loadColors(colors) {
    for(var index = 0; index < 16; index += 1) {
      var colorCode = "base0" + index.toString(16).toUpperCase();
      this.updateColor(colorCode, colors[index]);
    }

    this.onChangeCallbacks.forEach(function(callback) {
      callback(this);
    }.bind(this));
  }

  onChange(callback) {
    this.onChangeCallbacks.push(callback);
  }

  getHexString() {
    var hexColors = this.colors.map(function(color) {
      return color.toHex().toCSS().replace("#", "");
    });

    return hexColors.join(",")
  }
}
