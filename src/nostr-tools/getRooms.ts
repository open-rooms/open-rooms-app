import {SimplePool} from 'nostr-tools';
import {IRoom} from '../utils/types';
import {RELAYS_URL} from '../nostr-tools/nostrRelays';
import {DEFAULT_TAG, ROOM_TAG} from './nostrTags';
import {generatePublic} from './generateKeys';

const pool = new SimplePool();

export const getRooms = (
  privateKey: string,
  fetchAll: boolean = false,
): Promise<IRoom[]> => {
  return new Promise(resolve => {
    console.log('getRooms - Starting the process to fetch rooms.');

    let fetchedRooms: IRoom[] = [];
    const publicKey = generatePublic(privateKey);

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

      // for (const field of requiredFields) {
      //   console.log(
      //     `Checking field ${field.name}: Value = ${
      //       room[field.name]
      //     }, Type = ${typeof room[field.name]}`,
      //   );
      //   if (!room || typeof room[field.name] !== field.type) {
      //     console.log(`Rejected room due to invalid or missing ${field.name}`);
      //     return false;
      //   }
      // }

      return true;
    };

    roomsSub.on('event', (event: any) => {
      console.log('getRooms - Event received:', JSON.stringify(event, null, 2));

      try {
        const content = JSON.parse(JSON.parse(event.content));
        // console.log('getRooms - Content:', content);
        // console.log('getRooms - Content.name:', content.name);
        // First, parse the content to get "name" and "about"
        const roomContent: IRoom = {
          id: event.id,
          pubkey: event.pubkey,
          created_at: event.created_at,
          kind: event.kind,
          tags: event.tags,
          sig: event.sig,
          name: content.name,
          about: content.about,
          rooms: [],
          publicKeys: []
        };
        // Log the fully populated roomContent before validation
        // console.log(
        //   'Pre-validation roomContent:',
        //   JSON.stringify(roomContent, null, 2),
        // );

        // Finally, check for validity
        if (isValidRoom(roomContent)) {
          fetchedRooms.push(roomContent);
        } else {
          // console.log(
          //   'getRooms - Invalid room:',
          //   JSON.stringify(roomContent, null, 2),
          // );
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
