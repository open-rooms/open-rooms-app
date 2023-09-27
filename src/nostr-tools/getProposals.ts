import {SimplePool} from 'nostr-tools';
import {IProposal} from '../utils/types';
import {RELAYS_URL} from '../nostr-tools/nostrRelays';

const pool = new SimplePool();

export const getProposals = (): Promise<IProposal[]> => {
  console.log('Initializing getProposals...');
  return new Promise((resolve, reject) => {
    let fetchedProposals: IProposal[] = [];
    let proposalsSub = pool.sub(RELAYS_URL, [{'#t': ['proposal']}]);
    proposalsSub.on('event', (event: any) => {
      const proposalContent: IProposal = JSON.parse(event.content);
      proposalContent.id = event.id;
      fetchedProposals.push(proposalContent);
      console.log('Received proposal:', proposalContent);
    });
    (proposalsSub as any).on('end', () => {
      console.log('Fetching proposals completed:', fetchedProposals);
      resolve(fetchedProposals);
    });
    (proposalsSub as any).on('error', (err: any) => {
      console.error('Fetching proposals error:', err);
      reject(err);
    });
  });
};
