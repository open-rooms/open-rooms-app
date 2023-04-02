import {useState} from 'react';
import {SimplePool} from 'nostr-tools';
import {
  DEFAULT_TAG,
  PROPOSAL_TAG,
  RELAYS_URL,
  ROOM_TAG,
} from '../utils/constants';
import {useStorage} from '../utils/useStorage';
import {formatEvent} from './utils/utils';
import {IRoom} from '../utils/types';

const useNostr = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const {privateKey} = useStorage();
  const pool = new SimplePool();

  const publishRoom = (
    kind: number,
    fields: {[key: string]: string},
    tags: string[][],
    callback: () => void,
  ) => {
    const content = JSON.stringify(fields);
    const defaultTags: string[][] = [DEFAULT_TAG, ROOM_TAG];

    const event = formatEvent(
      kind,
      content,
      privateKey,
      defaultTags.concat(tags),
    );
    console.log('start publishing room');

    const pubEvent = pool.publish(RELAYS_URL, event);

    pubEvent.on('ok', (reason: any) => {
      console.log('Room published to relays: ', reason);
      callback();
    });
    pubEvent.on('failed', (reason: any) => {
      console.log('failed to publish Room to relays:', reason);
    });
  };

  const publishProposal = (
    kind: number,

    fields: {[key: string]: string},
    tags: string[][],
    callback: () => void,
  ) => {
    const content = JSON.stringify(fields);

    const defaultTags: string[][] = [DEFAULT_TAG, PROPOSAL_TAG];

    const event = formatEvent(
      kind,
      content,
      privateKey,
      defaultTags.concat(tags),
    );
    console.log('start posting proposal');

    const pubEvent = pool.publish(RELAYS_URL, event);

    pubEvent.on('ok', (reason: any) => {
      console.log('Event published to relays: ', reason);
      callback();
    });
    pubEvent.on('failed', (reason: any) => {
      console.log('failed to publish to relays:', reason);
    });
  };

  const getRooms = () => {
    console.log('efect nostr');
    let roomsSub = pool.sub(RELAYS_URL, [{'#t': ['white-room']}]); // get everything from me
    roomsSub.on('event', (event: any) => {
      console.log('event generated', event.id, event.tags);
      // roomsPubSub.emit('rooms', event);
      const {name, username} = JSON.parse(event.content);
      setRooms(prevRooms => [
        ...prevRooms.filter(room => room.id !== event.id),
        {id: event.id, name: name, username: username},
      ]);
    });
  };

  return {
    getRooms,
    rooms,
    publishRoom,
    publishProposal,
  };
};

export default useNostr;
