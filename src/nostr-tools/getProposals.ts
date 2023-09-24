import {SimplePool} from 'nostr-tools';
import {IProposal} from '../utils/types';
import {RELAYS_URL} from '../nostr-tools/nostrRelays';

const pool = new SimplePool();

export const getProposals = (): Promise<IProposal[]> => {
  return new Promise((resolve, reject) => {
    let fetchedProposals: IProposal[] = [];
    let proposalsSub = pool.sub(RELAYS_URL, [{'#t': ['to be defined']}]);
    proposalsSub.on('event', (event: any) => {
      const proposalContent: IProposal = JSON.parse(event.content);
      proposalContent.id = event.id;
      fetchedProposals.push(proposalContent);
    });
    (proposalsSub as any).on('end', () => {
      resolve(fetchedProposals);
    });
    (proposalsSub as any).on('error', (err: any) => {
      reject(err);
    });
  });
};
