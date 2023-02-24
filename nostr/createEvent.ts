import {
  validateEvent,
  verifySignature,
  signEvent,
  getEventHash,
  getPublicKey,
  Event,
} from "nostr-tools";

function createEvent(
  kind: number,
  content: string,
  privateKey: string
) {
  const created_at = Math.floor(Date.now() / 1000);
  const pubkey = getPublicKey(privateKey);
  const tags: string[][] = [];

  const event: Event & { sig: string } = {
    kind,
    created_at,
    tags,
    content,
    pubkey,
    id: "",
    sig: "",
  };

  event.id = getEventHash(event);
  event.sig = signEvent(event, privateKey);

  const isValid = validateEvent(event);
  if (!isValid) {
    return null;
  }

  const isSignatureValid = verifySignature(event);
  if (!isSignatureValid) {
    return null;
  }

  return event;
}
