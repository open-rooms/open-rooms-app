import {
  validateEvent,
  verifySignature,
  signEvent,
  getEventHash,
  getPublicKey,
  Event,
} from 'nostr-tools';

export const formatEvent = (
  kind: number,
  content: string,
  privateKey: string,
  tags: string[][] = [['t', 'white-room']],
) => {
  const created_at = Math.floor(Date.now() / 1000);

  const event: Event & {sig: string} = {
    kind,
    created_at,
    tags,
    content,
    pubkey: '',
    id: '',
    sig: '',
  };

  event.pubkey = getPublicKey(privateKey);
  event.id = getEventHash(event);
  event.sig = signEvent(event, privateKey);

  const isEventValid = validateEvent(event);
  if (!isEventValid) {
    throw new Error('Failed to validate event');
  } else {
    console.log('Event is valid');
  }

  const isSignatureValid = verifySignature(event);
  if (!isSignatureValid) {
    throw new Error('Failed to validate signature');
  } else {
    console.log('Signature is valid');
  }

  return event;
};
