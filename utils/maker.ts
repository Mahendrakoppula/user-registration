const maker = (name: string) => {
  const lowerCaseName = name.toLowerCase().replace(/\s+/g, '-');

  const urlFriendlyName = encodeURIComponent(lowerCaseName);
  return name
    ? `${process.env.NEXT_PUBLIC_DOCUMENT_URL}${urlFriendlyName}`
    : null;
};
export default maker;
