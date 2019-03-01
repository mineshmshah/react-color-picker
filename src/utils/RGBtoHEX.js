export const RGBtoHex = (r, g, b, hexAlpha) => {
  let hexR = r.toString(16);
  let hexG = g.toString(16);
  let hexB = b.toString(16);
  if (r < 16) hexR = `0${r}`;
  if (g < 16) hexG = `0${g}`;
  if (b < 16) hexB = `0${b}`;
  return `#${hexR}${hexG}${hexB}${hexAlpha}`.toUpperCase();
};
