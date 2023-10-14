import {SimplePool} from 'nostr-tools';
import {IUser} from '../utils/types'; 
import {RELAYS_URL} from '../nostr-tools/nostrRelays';
import {DEFAULT_TAG, USER_TAG} from './nostrTags';
import {generatePublic} from './generateKeys'; 

const pool = new SimplePool();

export const getUser = (privateKey: string): Promise<IUser[]> => {
  return new Promise((resolve, reject) => {
    let fetchedUser: IUser[] = [];

    // Derive the public key from the private key
    const publicKey = generatePublic(privateKey);

    let userSub = pool.sub(RELAYS_URL, [
      {
        authors: [publicKey],
        ...DEFAULT_TAG,
        ...USER_TAG,
      },
    ]);

    userSub.on('event', (event: any) => {
      console.log('getUser - Event received:', event);
      const userContent: IUser = JSON.parse(event.content);
      userContent.id = event.id;
      fetchedUser.push(userContent);
      // added resolve here because .on('end') was not being called
      resolve(fetchedUser);
    });

    (userSub as any).on('end', () => {
      console.log('End is working');
      resolve(fetchedUser);
    });

    (userSub as any).on('error', (err: any) => {
      console.log('An error occurred:', err);
      reject(err);
    });
  });
};
