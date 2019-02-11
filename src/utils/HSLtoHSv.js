export const HSLtoHSV = (h, s, l) => {

  const FinalHue = h;


  const newL = 2*l;
  const newS = (newL <= 1) ? newL * s : (2 - newL) * s;
  const FinalValue = (newL + newS) / 2;
  const FinalSaturation = (2 * newS) / (newL + newS);

  return {
    FinalHue,
    FinalSaturation,
    FinalValue
  }
}

