// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

"use strict";

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

var colors = base16Default;

if(window.location.hash) {
  var colors = window.location.hash.replace("#", "").split(",");
}

var palette = new Palette($(".palette")[0]);
var swatch = new Swatch($(".colors")[0], $(".preview")[0]);

palette.draw();

function updateURL(swatch) {
  var urlHash = "#" + swatch.getHexString();

  window.history.pushState(urlHash, "", urlHash);
}

palette.onSelect(swatch.updateActiveColor.bind(swatch));
swatch.onChange(updateURL);

swatch.loadHex(colors);

$(".download").on("click", function() {
  var colors = swatch.getHexString();

  window.location = "/configs?colors=" + colors;
}.bind(this));
