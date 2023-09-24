import {relayInit, finishEvent} from 'nostr-tools';
import {DEFAULT_TAG} from '../utils/constants';

export const publishUser = (
  kind: number,
  fields: {[key: string]: any},
  tags: string[][],
  privateKey: string,
) => {
  const relay = relayInit('wss://nostr.bongbong.com');

  return new Promise(async (resolve, reject) => {
    relay.on('connect', () => {
      console.log(`connected to ${relay.url}`);
    });

    relay.on('error', () => {
      console.log(`failed to connect to ${relay.url}`);
      reject(new Error(`Failed to connect to relay: ${relay.url}`));
    });

    await relay.connect();

    // Convert fields to JSON
    const content = JSON.stringify(fields);

    // Set default tags
    const defaultTags: string[][] = [DEFAULT_TAG];

    // Create the event
    const event = {
      kind,
      created_at: Math.floor(Date.now() / 1000),
      tags: defaultTags.concat(tags),
      content,
    };

    // Sign the event
    const signedEvent = finishEvent(event, privateKey);

    // Listen for publication response
    const pub = relay.publish(signedEvent);

    // Handling successful publication
    pub.on('ok', () => {
      console.log('Event published successfully.');
      resolve('Event published successfully.');
      relay.close();
    });

    // Handling publication failure
    pub.on('failed', (reason: any) => {
      console.error('Failed to publish event:', reason);
      reject(new Error(`Failed to publish event: ${reason}`));
      relay.close();
    });
  });
};

export default publishUser;
