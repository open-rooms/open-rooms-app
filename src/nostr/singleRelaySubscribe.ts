import {getPublicKey, relayInit} from 'nostr-tools';
import {IEvent} from '../utils/types';

export async function singleRelaySubscribe(
  kind: number,
  privateKey: string,
  url: string,
  callback: (event: IEvent) => void,
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

  const sub = relay.sub([
    {
      kinds: [kind],
      authors: [pubkey],
      '#t': ['white-room'],
    },
  ]);

  console.log('subscribed to events', sub);

  sub.on('event', (event: IEvent) => {
    console.log('got event:', event);
    if (
      event.tags.some((tag: string | string[]) => tag.includes('white-room'))
    ) {
      callback(event);
    }
  });

  return sub.off.bind(sub, 'event');
}
