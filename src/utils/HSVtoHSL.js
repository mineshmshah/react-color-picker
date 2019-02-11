export const HSVtoHSL= (h, s, v) => {

  const currentS = s/100;
  const currentV = v/100;

  const FinalHue = h;
  let FinalLightness = 0.5 * (currentV *( 2 - currentS))
  const absValue = Math.abs((2*FinalLightness) -1)
  let FinalSaturation = absValue === 1 ? 0 : (currentS * currentV)/( 1 - absValue);

  FinalLightness = Math.round(FinalLightness * 100);
  FinalSaturation = Math.round(FinalSaturation * 100);
  return {
    FinalHue,
    FinalSaturation,
    FinalLightness
  }
}
