export const HSLtoHSV = (h, s, l) => {

  const currentS = s/100;
  const currentL = l/100;

  const FinalHue = h;

  let FinalValue = ((2*currentL) + (currentS*(1-Math.abs((2*currentL)-1)))) / 2;
  let FinalSaturation = FinalValue === 0 ? 0 : (2 * (FinalValue-currentL)) / FinalValue;
  FinalValue = Math.round(FinalValue * 100);
  FinalSaturation = Math.round(FinalSaturation * 100);

  return {
    FinalHue,
    FinalSaturation,
    FinalValue
  }
}

