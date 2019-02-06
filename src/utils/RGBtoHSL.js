export const RGBtoHSL = (r,g,b) => {
  const red		= r / 255;
  const green	= g / 255;
  const blue	= b / 255;

  const cmax = Math.max(red, green, blue);
  const cmin = Math.min(red, green, blue);
  const delta = cmax - cmin;
  let hue = 0;
  let saturation = 0;
  const lightness = (cmax + cmin) / 2;
  const X = (1 - Math.abs(2 * lightness - 1));

  if (delta) {
    if (cmax === red ) { hue = ((green - blue) / delta); }
    if (cmax === green ) { hue = 2 + (blue - red) / delta; }
    if (cmax === blue ) { hue = 4 + (red - green) / delta; }
    if (cmax) saturation = delta / X;
  }

  let FinalHue = (60 * hue);
  if (FinalHue < 0) FinalHue += 360;
  FinalHue = Math.round(FinalHue)
  const FinalSaturation = Math.round(saturation * 100) ;
  const FinalLightness = Math.round(lightness * 100) ;

  return {
    FinalHue,
    FinalSaturation,
    FinalLightness
  }
};
