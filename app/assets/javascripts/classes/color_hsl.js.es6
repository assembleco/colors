"use strict";

class ColorHSL {
  /*
   * Assumes h, s, and l are contained in the set [0, 1]
   * @param   Number  hue
   * @param   Number  saturation
   * @param   Number  lightness
   */
  constructor(hue, saturation, lightness) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
  }

  /**
   * Converts an HSL color value to RGB.
   *
   * @return  ColorRGB The RGB representation
   */
  toRGB() {
    var h = this.hue;
    var s = this.saturation;
    var l = this.lightness;

    var r, g, b;

    if(s == 0) {
      r = g = b = l; // achromatic
    } else {
      var hue2rgb = function hue2rgb(p, q, t) {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return new ColorRGB(
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255)
    );
  }
}

