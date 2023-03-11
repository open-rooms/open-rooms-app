import {
  validateEvent,
  verifySignature,
  signEvent,
  getEventHash,
  getPublicKey,
  Event,
  relayInit,
  SimplePool,
} from 'nostr-tools';

const formatEvent = (kind: number, content: string, privateKey: string) => {
  const created_at = Math.floor(Date.now() / 1000);
  const pubkey = getPublicKey(privateKey);
  const tags: string[][] = [
    ['t', 'whiteroom'],
    ['r', 'roomid'],
  ];

  const event: Event & {sig: string} = {
    kind,
    created_at,
    tags,
    content: JSON.stringify({'#whiteroom': 'test', key: 'value'}),
    pubkey,
    id: '',
    sig: '',
  };

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

export async function multiRelayPublish(
  kind: number,
  content: string,
  privateKey: string,
  url: string,
) {
  let relays = [url];
  const pool = new SimplePool();
  const pubkey = getPublicKey(privateKey);

  let sub = pool.sub(
    // relays,
    [...relays, 'wss://nostramsterdam.vpx.moe'],
    [
      {
        authors: [pubkey],
      },
    ],
  );

  sub.on('event', (event: any) => {
    console.log('event', event);
    // this will only be called once the first time the event is received
    // ...
  });

  const event = formatEvent(kind, content, privateKey);

  let pubs = pool.publish(relays, event);
  pubs.on('ok', () => {
    console.log('eenttttt');

    // this may be called multiple times, once for every relay that accepts the event
    // ...
  });

  return event;
}

export default multiRelayPublish;
