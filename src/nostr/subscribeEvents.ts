import {getPublicKey, relayInit} from 'nostr-tools';

export async function subscribeEvents(
  kind: number,
  privateKey: string,
  url: string,
) {
  const pubkey = getPublicKey(privateKey);

  const relay = relayInit(url);
  relay.on('connect', () => {
    console.log(`connected sub to ${relay.url}`);
  });
  relay.on('error', () => {
    console.log(`failed to connect to ${relay.url}`);
  });

  await relay.connect();

  let sub = relay.sub([
    {
      kinds: [kind],
      // authors: [pubkey],
      '#t': ['negru'],
    },
  ]);

  console.log('subscribed to events', sub);

  return new Promise(resolve => {
    sub.on('event', (event: any) => {
      console.log('got event:', event);
      relay.close();
      resolve(event);
    });
  });
}

export default subscribeEvents;
