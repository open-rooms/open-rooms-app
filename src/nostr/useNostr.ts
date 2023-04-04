import {useState} from 'react';
import {SimplePool, relayInit} from 'nostr-tools';
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

  const publishRoom = async (
    kind: number,
    content: string,
    tags: string[][],
    callback: () => void,
  ) => {
    // const poolNew = new SimplePool();

    const defaultTags: string[][] = [DEFAULT_TAG];

    const event = formatEvent(
      kind,
      content,
      privateKey,
      defaultTags.concat(tags),
    );
    const pubEvent = pool.publish(RELAYS_URL, event);

    console.log('start publishing room', event);

    pubEvent.on('ok', (reason: any) => {
      console.log('Event published to relays: ', reason);
      callback();
    });
    pubEvent.on('failed', (reason: any) => {
      console.log('failed to publish Event to relays:', reason);
    });

    // console.log('--------------------------');

    // const relay = relayInit(RELAYS_URL[0]);
    // await relay.connect();

    // let pub = relay.publish(event);
    // pub.on('ok', () => {
    //   console.log(`${relay.url} has accepted our event`);
    //   callback();
    // });
    // pub.on('failed', (reason: any) => {
    //   console.log(`failed to publish to ${relay.url}: ${reason}`);
    // });

    // console.log('--------------------------');
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
    let roomsSub = pool.sub(RELAYS_URL, [
      {'#t': ['white-room', 'white-room2']},
    ]); // get everything from me
    roomsSub.on('event', (event: any) => {
      console.log('event generated', event.id, event.tags);
      const roomContent: IRoom = JSON.parse(event.content);
      roomContent.id = event.id;
      setRooms(prevRooms => [
        ...prevRooms.filter(room => room.id !== event.id),
        roomContent,
      ]);
    });
  };

  return {
    getRooms,
    rooms2: rooms,
    publishRoom,
    publishProposal,
  };
};

export default useNostr;
