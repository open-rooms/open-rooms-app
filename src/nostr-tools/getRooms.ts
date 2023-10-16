import {SimplePool} from 'nostr-tools';
import {IRoom} from '../utils/types';
import {RELAYS_URL} from '../nostr-tools/nostrRelays';
import {DEFAULT_TAG, ROOM_TAG} from './nostrTags';
import {generatePublic} from './generateKeys';

const pool = new SimplePool();

export const getRooms = (privateKey: string): Promise<IRoom[]> => {
  return new Promise((resolve, reject) => {
    console.log('getRooms - Starting the process to fetch rooms.');

    let fetchedRooms: IRoom[] = [];
    const publicKey = generatePublic(privateKey);
    console.log(`getRooms - Generated public key: ${publicKey}`);

    let roomsSub = pool.sub(RELAYS_URL, [
      {
        authors: [publicKey],
        ...DEFAULT_TAG,
        ...ROOM_TAG,
      },
    ]);

    roomsSub.on('event', (event: any) => {
      console.log('getRooms - Event received:', JSON.stringify(event, null, 2));

      try {
        const roomContent: IRoom = JSON.parse(event.content);
        console.log(
          'getRooms - Room content:',
          JSON.stringify(roomContent, null, 2),
        );

        // Fill in the other event fields
        roomContent.id = event.id;
        roomContent.pubkey = event.pubkey;
        roomContent.created_at = event.created_at;
        roomContent.kind = event.kind;
        roomContent.tags = event.tags;
        roomContent.sig = event.sig;

        fetchedRooms.push(roomContent);
      } catch (error) {
        console.log('getRooms - Error while processing event:', error);
      }
    });
    let timeoutId = setTimeout(() => {
      console.log('getRooms - Timeout reached. Returning fetched rooms.');
      resolve(fetchedRooms);
    }, 5000); // 5-second timeout

    (roomsSub as any).on('end', () => {
      clearTimeout(timeoutId);
      console.log('getRooms - Subscription ended. Returning fetched rooms.');
      resolve(fetchedRooms);
    });
  });
};
