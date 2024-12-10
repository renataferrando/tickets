export function getFirstLetter(str: string) {
  if (typeof str !== "string" || str.length === 0) {
    return null; // Return null for invalid input
  }
  return str.charAt(0); // Return the first character
}
