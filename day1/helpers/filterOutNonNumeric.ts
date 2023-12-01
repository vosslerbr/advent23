export function filterOutNonNumeric(character: string): boolean {
  const isNumeric = !isNaN(Number(character)) && character !== "\r";

  return isNumeric;
}
