var canvas  = $(".palette")[0];
var context = canvas.getContext("2d");

var imageData = context.createImageData(canvas.width, canvas.height);

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l){
  var r, g, b;

  if(s == 0){
    r = g = b = l; // achromatic
  }else{
    var hue2rgb = function hue2rgb(p, q, t){
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

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

var saturation = 1;

for(var yIndex = 0; yIndex < canvas.height; yIndex += 1) {
  for(var xIndex = 0; xIndex < canvas.width; xIndex += 1) {
    var lightness = yIndex / canvas.height;
    var hue = xIndex / canvas.width;

    var pixelIndex = (yIndex * canvas.width) + xIndex;
    var dataIndex = pixelIndex * 4;

    var rgb = hslToRgb(hue, saturation, lightness);

    imageData.data[dataIndex    ] = rgb[0];  // red   color
    imageData.data[dataIndex + 1] = rgb[1];  // green color
    imageData.data[dataIndex + 2] = rgb[2];  // blue  color
    imageData.data[dataIndex + 3] = 255;
  }
}

context.putImageData(imageData, 0, 0);
