export const acceptString = (value: string) => {
  // Accept only string
  const regex = new RegExp(/^[a-zA-Z\s]*$/);
  return regex.test(value);
};

export const acceptNumbers = (value: string) => {
  // Accept only string
  const regex = new RegExp(/^[0-9]*$/);
  return regex.test(value);
};
