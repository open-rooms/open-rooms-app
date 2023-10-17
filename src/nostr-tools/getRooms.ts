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

    const isValidRoom = (room: any): room is IRoom => {
      const requiredFields = [
        {name: 'id', type: 'string'},
        {name: 'pubkey', type: 'string'},
        {name: 'created_at', type: 'number'},
        {name: 'kind', type: 'number'},
        {name: 'tags', type: 'object'},
        {name: 'sig', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'about', type: 'string'},
      ];

      for (const field of requiredFields) {
        console.log(
          `Checking field ${field.name}: Value = ${
            room[field.name]
          }, Type = ${typeof room[field.name]}`,
        );
        if (!room || typeof room[field.name] !== field.type) {
          console.log(`Rejected room due to invalid or missing ${field.name}`);
          return false;
        }
      }

      return true;
    };

    roomsSub.on('event', (event: any) => {
      console.log('getRooms - Event received:', JSON.stringify(event, null, 2));

      try {
        // First, parse the content to get "name" and "about"
        const roomContent: IRoom = JSON.parse(event.content);

        // Then, populate the additional fields from the event
        roomContent.id = event.id;
        roomContent.pubkey = event.pubkey;
        roomContent.created_at = event.created_at;
        roomContent.kind = event.kind;
        roomContent.tags = event.tags;
        roomContent.sig = event.sig;

        // Log the fully populated roomContent before validation
        console.log(
          'Pre-validation roomContent:',
          JSON.stringify(roomContent, null, 2),
        );

        // Finally, check for validity
        if (isValidRoom(roomContent)) {
          fetchedRooms.push(roomContent);
        } else {
          console.log(
            'getRooms - Invalid room:',
            JSON.stringify(roomContent, null, 2),
          );
        }
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
