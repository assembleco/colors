"use strict";

var canvas  = $(".palette")[0];
var palette = new Palette(canvas);
palette.draw();

var activeColor = null;

$(".color").on("click", function(e) {
  var newColor = e.target.attributes["data-color"].value;

  if(activeColor != newColor) {
    $("." + activeColor).removeClass("active");
    $("." + newColor).addClass("active");

    activeColor = newColor;
  }
}.bind(this));

palette.onSelect(function (rgbColor) {
  if(activeColor) {
    $("." + activeColor).css("color", rgbColor.toCSS());
    $(".color." + activeColor).css("background-color", rgbColor.toCSS());
  }
});
