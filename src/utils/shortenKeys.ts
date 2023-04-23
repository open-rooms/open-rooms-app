export function shortenKeys(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  const shortenedStr = str.substring(0, maxLength);
  return `${shortenedStr}...`;
}

const key =
  'npub180d4ef712a9a8021b258a8fabdf5d7a4b4da918305587fdac2bca294b13164ff';
const shortenedKey = shortenKeys(key, 10); // Shorten the key to 10 characters

console.log(shortenedKey); // "npub180d4e..."
