import {SimplePool} from 'nostr-tools';
import {IRoom} from '../utils/types';
import {RELAYS_URL} from '../nostr-tools/nostrRelays';
import {DEFAULT_TAG, ROOM_TAG} from './nostrTags';
import {generatePublic} from './generateKeys';

const pool = new SimplePool();

export const getRooms = (privateKey: string): Promise<IRoom[]> => {
  return new Promise((resolve, reject) => {
    let fetchedRooms: IRoom[] = [];
    const publicKey = generatePublic(privateKey);
    let roomsSub = pool.sub(RELAYS_URL, [
      {
        authors: [publicKey],
        ...DEFAULT_TAG,
        ...ROOM_TAG,
      },
    ]);
    roomsSub.on('event', (event: any) => {
      console.log('Event received:', event);
      const roomContent: IRoom = JSON.parse(event.content);
      roomContent.id = event.id;
      fetchedRooms.push(roomContent);
    });
    (roomsSub as any).on('end', () => {
      return resolve(fetchedRooms);
    });
    (roomsSub as any).on('error', (err: any) => {
      reject(err);
    });
  });
};
