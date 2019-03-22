export const transformHexForAlpha = (hex, value) => {
  const convertHEXtoFull = hexValue => {
    let transformedValue = hexValue;
    if (transformedValue[0] === '#')
      transformedValue = transformedValue.slice(1, transformedValue.length);
    if (transformedValue.length === 3)
      transformedValue = transformedValue.replace(/([0-9A-F])([0-9A-F])([0-9A-F])/i,'$1$1$2$2$3$3');
    if (transformedValue.length === 4)
      transformedValue = transformedValue.replace(/([0-9A-F])([0-9A-F])([0-9A-F])([0-9A-F])/i,'$1$1$2$2$3$3$4$4');
    return `#${transformedValue}`;
  };

  let hexValue = hex;
  const transformedValue = Math.round(value * 255);
  let newAlphaHex = transformedValue.toString(16).toUpperCase();
  if (transformedValue < 16) newAlphaHex = `0${newAlphaHex}`;

  if(value === '1.00') {
    hexValue = convertHEXtoFull(hexValue).slice(0,7)
  } else {
    hexValue = convertHEXtoFull(hexValue).slice(0,7).concat(newAlphaHex)
  }
  return hexValue
};

