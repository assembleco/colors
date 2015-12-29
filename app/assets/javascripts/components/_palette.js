"use strict";

var canvas  = $(".palette")[0];
var palette = new Palette(canvas);
palette.draw();

var activeColor = null;

$(".color").on("click", function(e) {
  activeColor = e.target.attributes["data-color"].value;
}.bind(this));

palette.onSelect(function (rgbColor) {
  if(activeColor) {
    $("." + activeColor).css("color", rgbColor.toCSS());
    $(".color." + activeColor).css("background-color", rgbColor.toCSS());
  }
});
