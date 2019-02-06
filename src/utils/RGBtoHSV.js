export const RGBtoHSV = (r,g,b) => {
  const red		= r / 255;
  const green	= g / 255;
  const blue	= b / 255;

  const cmax = Math.max(red, green, blue);
  const cmin = Math.min(red, green, blue);
  const delta = cmax - cmin;
  let hue = 0;
  let saturation = 0;

  if (delta) {
    if (cmax === red ) { hue = ((green - blue) / delta); }
    if (cmax === green ) { hue = 2 + (blue - red) / delta; }
    if (cmax === blue ) { hue = 4 + (red - green) / delta; }
    if (cmax) saturation = delta / cmax;
  }

  let FinalHue = 60 * hue ;
  if (FinalHue < 0) FinalHue += 360;
  FinalHue = Math.round(FinalHue);
  const FinalSaturation =  Math.round(saturation * 100) ;
  const FinalValue =  Math.round(cmax * 100);
  return {
    FinalHue,
    FinalSaturation,
    FinalValue
  }
};
