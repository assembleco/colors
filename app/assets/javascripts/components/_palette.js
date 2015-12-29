"use strict";

var canvas  = $(".palette")[0];
var palette = new Palette(canvas);
palette.draw();

var preview = new Swatch($(".preview")[0]);
var swatch = new Swatch($(".colors")[0]);

var base16Default = [
  "#151515",
  "#202020",
  "#303030",
  "#505050",
  "#b0b0b0",
  "#d0d0d0",
  "#e0e0e0",
  "#f5f5f5",
  "#ac4142",
  "#d28445",
  "#f4bf75",
  "#90a959",
  "#75b5aa",
  "#6a9fb5",
  "#aa759f",
  "#9f5536",
];

swatch.loadHex(base16Default);
preview.loadHex(base16Default);

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
