"use strict";

var canvas  = $(".palette")[0];
var context = canvas.getContext("2d");

var imageData = context.createImageData(canvas.width, canvas.height);

function setPixel(imageData, pixelIndex, rgbColor) {
  var dataIndex = pixelIndex * 4;

  imageData.data[dataIndex] = rgbColor.red;
  imageData.data[dataIndex + 1] = rgbColor.green;
  imageData.data[dataIndex + 2] = rgbColor.blue;
  imageData.data[dataIndex + 3] = 255;
}

var saturation = 1;

for(var yIndex = 0; yIndex < canvas.height; yIndex += 1) {
  for(var xIndex = 0; xIndex < canvas.width; xIndex += 1) {
    var lightness = yIndex / canvas.height;
    var hue = xIndex / canvas.width;

    var pixelIndex = (yIndex * canvas.width) + xIndex;

    var hslColor = new ColorHSL(hue, saturation, lightness);
    var rgbColor = hslColor.toRGB();

    setPixel(imageData, pixelIndex, rgbColor);
  }
}

context.putImageData(imageData, 0, 0);
