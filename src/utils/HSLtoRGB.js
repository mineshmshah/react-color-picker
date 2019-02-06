export const HSLtoRGB = (hue, sl, l) => {
  const sat = sl / 100;
  const light = l / 100;
  const H = hue / 60;
  let C = sat * (1 - Math.abs(2 * light - 1));
  let X = C * (1 - Math.abs(H % 2 - 1));
  let m = light - C/2;
  const precision = 255;

  C = (C + m) * precision;
  X = (X + m) * precision;
  m *= precision;

  const setRGB = (r,g,b) => ({
    FinalRed: Math.round(r),
    FinalGreen: Math.round(g),
    FinalBlue: Math.round(b)
  });

  let finalRGB = {};

  if (H >= 0 && H < 1) 	finalRGB = setRGB(C, X, m);
  if (H >= 1 && H < 2) 	finalRGB = setRGB(X, C, m);
  if (H >= 2 && H < 3) 	finalRGB = setRGB(m, C, X);
  if (H >= 3 && H < 4) 	finalRGB = setRGB(m, X, C);
  if (H >= 4 && H < 5) 	finalRGB = setRGB(X, m, C);
  if (H >= 5 && H < 6) 	finalRGB = setRGB(C, m, X);

  return finalRGB;
};
