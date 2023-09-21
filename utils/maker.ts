const maker = (name: string) => {
  const lowerCaseName = name.toLowerCase().replace(/\s+/g, '-');

  const urlFriendlyName = encodeURIComponent(lowerCaseName);
  return name ? `${urlFriendlyName}` : null;
};
export default maker;
