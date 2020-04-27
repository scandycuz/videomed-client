export const required = (message = 'required') => (value) => {
  if (!value) return message;

  return null;
}

export const minLength = (length, message = 'must be at least 10 characters') => (value) => {
  if (value.length < length) return message;

  return null;
}

export const email = (message = 'invalid email') => (value) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!regex.test(value)) return message;

  return null;
};
