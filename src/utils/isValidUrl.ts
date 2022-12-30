function isValidUrl(url: string) {
  try {
    const { protocol } = new URL(url);
    return protocol === "http:" || protocol === "https:";
  } catch (exception) {
    return false;
  }
}

export default isValidUrl;
