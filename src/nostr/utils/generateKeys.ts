import {Buffer} from 'buffer';
import {generatePrivateKey, getPublicKey} from 'nostr-tools';

export function generateKeys() {
  let privateKey = generatePrivateKey();
  // For debugging purposes only
  console.log(
    'Generated Private Key Length:',
    Buffer.from(privateKey, 'hex').length, // This should log 32
  );

  let publicKey = getPublicKey(privateKey);

  return {
    publicKey,
    privateKey,
  };
}
export default generateKeys;

export function generatePublickKey(privateKey: string) {
  return getPublicKey(privateKey);
}
