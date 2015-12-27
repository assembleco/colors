"use strict";

class Palette {
  constructor(canvas) {
    this.canvas = canvas;
  }

  setPixel(imageData, pixelIndex, rgbColor) {
    var dataIndex = pixelIndex * 4;

    imageData.data[dataIndex] = rgbColor.red;
    imageData.data[dataIndex + 1] = rgbColor.green;
    imageData.data[dataIndex + 2] = rgbColor.blue;
    imageData.data[dataIndex + 3] = 255;
  }

  draw() {
    var context = canvas.getContext("2d");
    var imageData = context.createImageData(canvas.width, canvas.height);
    var saturation = 1;

    for(var yIndex = 0; yIndex < canvas.height; yIndex += 1) {
      for(var xIndex = 0; xIndex < canvas.width; xIndex += 1) {
        var lightness = xIndex / canvas.width;
        var hue = yIndex / canvas.height;

        var pixelIndex = (yIndex * canvas.width) + xIndex;

        var hslColor = new ColorHSL(hue, saturation, lightness);
        var rgbColor = hslColor.toRGB();

        this.setPixel(imageData, pixelIndex, rgbColor);
      }
    }

    context.putImageData(imageData, 0, 0);
  }

  onClick(callback) {
    this.canvas.on("click", callback);
  }
}
