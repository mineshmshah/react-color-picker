export const RGBtoHex = (r, g, b, currentHEX) => {

  let hexAlpha = '';
  if (currentHEX.length === 5) {
    const alphaSection = currentHEX.slice(4,5);
    hexAlpha = `${alphaSection}${alphaSection}`
  }
  if (currentHEX.length === 9) {
    const alphaSection = currentHEX.slice(7,9);
    hexAlpha = `${alphaSection}`
  }

  let hexR = r.toString(16);
  let hexG = g.toString(16);
  let hexB = b.toString(16);
  if (r < 16) hexR = `0${hexR}`;
  if (g < 16) hexG = `0${hexG}`;
  if (b < 16) hexB = `0${hexB}`;
  return `#${hexR}${hexG}${hexB}${hexAlpha}`.toUpperCase();
};
