export function isJSON(str: any) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}

export function isObject(input: any) {
  return typeof input === "object" && !Array.isArray(input);
}
