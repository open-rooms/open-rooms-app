import {generatePrivateKey, getPublicKey} from 'nostr-tools';

export function generatePrivate() {
  return generatePrivateKey();
}

export function generatePublic(privateKey: string) {
  return getPublicKey(privateKey);
}
