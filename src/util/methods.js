export function toCamelCase(str) {
  const words = str.split('_');

  return words[0].toLowerCase() + words.slice(1).map(capitalize).join('');
}

export function toSnakeCase(str) {
  return str.replace(/[\w]([A-Z])/g, (m) => m[0] + "_" + m[1]).toLowerCase();
}

export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function uncapitalize(str) {
  return str[0].toLowerCase() + str.slice(1);
}

export function format(data) {
  const result = {};

  Object.keys(data).forEach((key) => {
    result[toCamelCase(key)] = data[key];
  });

  return result;
}

export function unformat(data) {
  const result = {};

  Object.keys(data).forEach((key) => {
    result[toSnakeCase(key)] = data[key];

    if (typeof data[key] === 'object') {
      Object.keys(data[key]).forEach((k) => {
        result[toSnakeCase(key)][toSnakeCase(k)] = data[key][k];
      })
    }
  });

  return result;
}

export function normalizeColor(theme, color) {
  const colors = color.split('.');

  if (colors.length === 1) return theme[colors[0]].main || theme[colors[0]];

  let result = theme;
  for (const key of colors) {
    result = result[key];
  }

  return result;
}

export function hashCode(str) { // java String#hashCode
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return hash;
}

export function intToRGB(i){
  const c = (i & 0x00FFFFFF).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

export function strToHex(str) {
  return '#' + intToRGB(hashCode(str));
}

export function randomDarkColor() {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}
