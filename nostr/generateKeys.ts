import { generatePrivateKey, getPublicKey } from "nostr-tools";

export function generateKeys() {
  let privateKey = generatePrivateKey();
  let publicKey = getPublicKey(privateKey);

  return {
    publicKey: publicKey,
    privateKey: privateKey,
  };
}
export default generateKeys;

export function generatePublickKey(privateKey: string) {
  return getPublicKey(privateKey);
}