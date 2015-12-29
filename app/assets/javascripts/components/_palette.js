"use strict";

var canvas  = $(".palette")[0];
var palette = new Palette(canvas);
palette.draw();

var activeColor = null;

$(".color").on("click", function(e) {
  var newColor = e.target.attributes["data-color"].value;

  if(activeColor != newColor) {
    $(".active").removeClass("active");
    $(".color.bg-" + newColor).addClass("active");

    activeColor = newColor;
  }
}.bind(this));

palette.onSelect(function (rgbColor) {
  if(activeColor) {
    $(".fg-" + activeColor).css("color", rgbColor.toCSS());
    $(".bg-" + activeColor).css("background-color", rgbColor.toCSS());
  }
});
