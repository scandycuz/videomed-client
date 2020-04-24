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

  if (colors.length === 1) return theme[colors[0]].main;

  let result = theme;
  for (const key of colors) {
    result = result[key];
  }

  return result;
}
