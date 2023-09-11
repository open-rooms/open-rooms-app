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
import {IProposal} from '../utils/types';

const useNostr = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [proposals, setProposals] = useState<IProposal[]>([]);
  const {privateKey} = useStorage();
  const pool = new SimplePool();

  const createUser = (
    kind: number,
    fields: {[key: string]: string},
    tags: string[][],
  ) => {
    return new Promise((resolve, reject) => {
      const content = JSON.stringify(fields);

      const defaultTags: string[][] = [DEFAULT_TAG];

      const event = formatEvent(
        kind,
        content,
        privateKey,
        defaultTags.concat(tags),
      );
      console.log('start creating user');

      const pubEvent = pool.publish(RELAYS_URL, event);

      pubEvent.on('ok', (reason: any) => {
        console.log('Event published to relays: ', reason);
        resolve(reason);
      });
      pubEvent.on('failed', (reason: any) => {
        console.log('failed to publish to relays:', reason);
        reject(reason);
      });
    });
  };

  const publishRoom = async (
    kind: number,
    content: string,
    tags: string[][],
    callback: () => void,
  ) => {
    // const poolNew = new SimplePool();

    const defaultTags: string[][] = [DEFAULT_TAG, ROOM_TAG];

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
  };

  const publishProposal = (
    kind: number,
    fields: {[key: string]: string},
    tags: string[][],
  ) => {
    return new Promise((resolve, reject) => {
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
        resolve(reason);
      });
      pubEvent.on('failed', (reason: any) => {
        console.log('failed to publish to relays:', reason);
        reject(reason);
      });
    });
  };

  const getRooms = (): Promise<IRoom[]> => {
    return new Promise((resolve, reject) => {
      let fetchedRooms: IRoom[] = [];
      let roomsSub = pool.sub(RELAYS_URL, [
        {'#t': ['white-room', 'white-room2']},
      ]);
      roomsSub.on('event', (event: any) => {
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

  // what it can be the #t for proposals?

  const getProposals = () => {
    console.log('Fetching proposals');
    let proposalsSub = pool.sub(RELAYS_URL, [{'#t': ['to be defined']}]);
    proposalsSub.on('event', (event: any) => {
      console.log('event generated', event.id, event.tags);
      const proposalContent: IProposal = JSON.parse(event.content);
      proposalContent.id = event.id;
      setProposals(prevProposals => [
        ...prevProposals.filter(proposal => proposal.id !== event.id),
        proposalContent,
      ]);
    });
  };

  return {
    createUser,
    publishRoom,
    publishProposal,
    getRooms,
    rooms2: rooms,
    getProposals,
    proposals2: proposals,
  };
};

export default useNostr;
