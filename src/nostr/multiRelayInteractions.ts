// multiRelayInteractions.ts --- DON'T use it anymore
import {
  validateEvent,
  verifySignature,
  signEvent,
  getEventHash,
  getPublicKey,
  Event,
  SimplePool,
  Sub,
} from 'nostr-tools';

const formatEvent = (
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

export const multiRelayPublish = async (
  kind: number,
  privateKey: string,
  relays: string[],
  fields: {[key: string]: string},
  tags: string[][],
) => {
  const content = JSON.stringify(fields);
  const event = formatEvent(kind, content, privateKey, tags);

  const pool = new SimplePool();
  let pubs = pool.publish(relays, event);
  pubs.on('ok', (reason: any) => {
    console.log('Event published to relays: ', reason);
  });
  pubs.on('failed', (reason: any) => {
    console.log('failed to publish to relays:', reason);
  });

  return event;
};

export function multiRelaysSubscribe(
  kind: number,
  privateKey: string,
  relays: string[],
  callback: (event: any) => void,
  eoseCallback: (eoseReason: any) => void,
): Sub {
  const pool = new SimplePool();
  const pubkey = getPublicKey(privateKey);

  let sub = pool.sub(relays, [
    {
      authors: [pubkey],
      kinds: [kind],
    },
  ]);

  sub.on('event', (event: any) => {
    callback(event);
  });

  sub.on('eose', (eoseReason: any) => {
    console.log('Subscription ended:', eoseReason);
    eoseCallback(eoseReason);
  });

  return sub;
}
