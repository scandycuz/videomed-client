import { uncapitalize } from 'util/methods';

const Error = {
  normalize: (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      const messages = error.response.data.message
        .replace('Validation failed: ', '')
        .split(', ');

      const start = messages[0];

      if (messages.length === 1) return messages[0];

      const middle = messages.slice(1, -1).map(uncapitalize).join(', ');
      const pre = middle.length ? ', ' : ' ';
      const post = middle.length ? ', ' : ' ';
      const end = `and ${messages.slice(-1).map(uncapitalize)}.`

      return start + pre + middle + post + end;
    } else if (error.response && error.response.statusText) {
      return error.response.statusText;
    }

    return 'There was an error processing your request';
  },
}

export default Error;
