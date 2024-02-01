export function addressToString(address: any): string {
  let addressString = address.line1;
  if (address.line2) {
    addressString += `, ${address.line2}`;
  }
  return `${addressString}, ${address.postalCode}, ${address.city}, ${address.state}`;
}

export function camelCaseToSpacedText(text: string): string {
  return text
    .replace(/(([A-Z])|([0-9]+))/g, ' $1')
    .split(' ')
    .map((splitText) =>
      /[a-z][A-Z]/.test(splitText.charAt(0))
        ? `${splitText.charAt(0).toUpperCase()}${splitText.slice(1)}`
        : splitText,
    )
    .join(' ')
    .trim();
}

export function snakeCaseToSpacedText(text: string): string {
  return text
    .split('_')
    .map(
      (splitText) =>
        (/[a-z][A-Z]/.test(splitText.charAt(0))
          ? `${splitText.charAt(0).toUpperCase()}`
          : splitText.charAt(0)) + splitText.slice(1).toLowerCase(),
    )
    .join(' ')
    .trim();
}

export function getEnumKeyFromValue<T extends object>(
  enumObject: T,
  value: T[keyof T],
): string {
  return Object.keys(enumObject)[Object.values(enumObject).indexOf(value)];
}
