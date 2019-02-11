export const HSVtoHSL= (h, s, v) => {

  const FinalHue = h;
  let FinalSaturation = s * v;
  let FinalLightness = (2 - s) * v;
  FinalSaturation /= (FinalLightness <= 1) ? FinalLightness : 2 - FinalLightness;
  FinalLightness /= 2;

  return {
    FinalHue,
    FinalSaturation,
    FinalLightness
  }
}
