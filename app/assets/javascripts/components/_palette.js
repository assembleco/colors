"use strict";

var canvas  = $(".palette")[0];
var palette = new Palette(canvas);
palette.draw();

palette.onSelect(function (rgbColor) {
  $(".base08").css("color", rgbColor.toCSS());
  $(".color.base08").css("background-color", rgbColor.toCSS());
});
