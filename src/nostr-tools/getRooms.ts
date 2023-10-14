import {SimplePool} from 'nostr-tools';
import {IRoom} from '../utils/types';
import {RELAYS_URL} from '../nostr-tools/nostrRelays';
import {DEFAULT_TAG, ROOM_TAG} from './nostrTags';

const pool = new SimplePool();

export const getRooms = (): Promise<IRoom[]> => {
  return new Promise((resolve, reject) => {
    let fetchedRooms: IRoom[] = [];
    let roomsSub = pool.sub(RELAYS_URL, [{'#t': ['open-rooms', 'room']}]);
    roomsSub.on('event', (event: any) => {
      console.log('Event received:', event);
      const roomContent: IRoom = JSON.parse(event.content);
      roomContent.id = event.id;
      fetchedRooms.push(roomContent);
    });
    (roomsSub as any).on('end', () => {
      resolve(fetchedRooms);
    });
    (roomsSub as any).on('error', (err: any) => {
      reject(err);
    });
  });
};