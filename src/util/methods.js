export function toCamelCase(str) {
  const words = str.split('_');

  return words[0].toLowerCase() + words.slice(1).map(capitalize).join('');
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
