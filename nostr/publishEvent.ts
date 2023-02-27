import {
  validateEvent,
  verifySignature,
  signEvent,
  getEventHash,
  getPublicKey,
  Event,
  relayInit
} from 'nostr-tools';

export async function publishEvent(
  kind: number,
  content: string,
  privateKey: string,
  url: string
) {
  const created_at = Math.floor(Date.now() / 1000);
  const pubkey = getPublicKey(privateKey);
  const tags: string[][] = [
    ['t', 'whiteroom'],
    ['r', 'roomid']
  ];

  const relay = relayInit(url);
  relay.on('connect', () => {
    console.log(`connected to ${relay.url}`);
  });
  relay.on('error', () => {
    console.log(`failed to connect to ${relay.url}`);
  });

  await relay.connect();

  const event: Event & { sig: string } = {
    kind,
    created_at,
    tags,
    content: JSON.stringify({ '#whiteroom': 'test', key: 'value' }),
    pubkey,
    id: '',
    sig: ''
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

  let pub = relay.publish(event);
  pub.on('ok', () => {
    console.log(`${relay.url} has accepted our event`);
  });
  pub.on('failed', (reason: any) => {
    console.log(`failed to publish to ${relay.url}: ${reason}`);
  });

  return event;
}

export default publishEvent;
