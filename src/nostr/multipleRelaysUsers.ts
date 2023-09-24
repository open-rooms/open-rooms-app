import {SimplePool} from 'nostr-tools';
import {DEFAULT_TAG, RELAYS_URL} from '../utils/constants';
import {formatEvent} from './formatEvent';

export const publishUser = (
  kind: number,
  fields: {[key: string]: string},
  tags: string[][],
  privateKey: string,
) => {
  const pool = new SimplePool();

  return new Promise((resolve, reject) => {
    // Check for the availability of the private key
    if (!privateKey) {
      reject(new Error('Private Key is not available'));
      return;
    }

    // Convert fields to JSON
    const content = JSON.stringify(fields);
    console.log('Converted fields to JSON:', content);

    // Set default tags
    const defaultTags: string[][] = [DEFAULT_TAG];

    // Create and validate the event
    const event = formatEvent(
      kind,
      content,
      privateKey,
      defaultTags.concat(tags),
    );
    console.log(
      'Event object to be published:',
      JSON.stringify(event, null, 2),
    );

    // Prepare relay URLs as an array
    const relays = Array.isArray(RELAYS_URL) ? RELAYS_URL : [RELAYS_URL];

    console.log('About to publish user');
    // Publish the event to the relays
    const pubEvent = pool.publish(relays, event);

    // Log for debugging
    console.log('Publication initiated, waiting for callbacks or timeout.');

    // Set a timeout for the Promise
    const timeout = setTimeout(() => {
      console.log('Operation timed out');
      reject(new Error('Operation timed out'));
    }, 100000); // Adjust the time as needed

    pubEvent.on('ok', (reason: any) => {
      console.log('User successfully published to all relays:', reason);
      clearTimeout(timeout);
      resolve(reason);
    });

    pubEvent.on('failed', (reason: any) => {
      console.log('Failed to publish user:', reason);
      clearTimeout(timeout);
      reject(reason);
    });
  });
};

export default publishUser;
