const validateUrl = (str: string, appendHttp: boolean): URL | null => {
  let url;
  if (appendHttp && !str.includes('://') && str.includes('.')) {
    str = `http://${str}`;
  }
  console.log(str);

  try {
    url = new URL(str);
  } catch (_) {
    return null;
  }

  return url.protocol === 'http:' || url.protocol === 'https:' ? url : null;
};

export { validateUrl };
