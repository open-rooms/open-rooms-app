import { generatePrivateKey, getPublicKey } from "nostr-tools";
import base58 from "bs58";
import { Buffer } from "buffer";

export function generateKeys() {
  let hexPrivateKey = generatePrivateKey();
  let hexPublicKey = getPublicKey(hexPrivateKey);

  let publicKey = Buffer.from(hexPublicKey, "hex");
  let privateKey = Buffer.from(hexPrivateKey, "hex");

  let nostrPublicKey = base58.encode(
    Buffer.concat([Buffer.from([23]), publicKey])
  );
  let nostrPrivateKey = base58.encode(
    Buffer.concat([Buffer.from([32]), privateKey])
  );

  return {
    publicKey: `npub1${nostrPublicKey}`,
    privateKey: `nsec1${nostrPrivateKey}`,
  };
}
