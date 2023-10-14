import {SimplePool} from 'nostr-tools';
import {IUser} from '../utils/types'; // Replace IUser with your user data type definition
import {RELAYS_URL} from '../nostr-tools/nostrRelays';
import {DEFAULT_TAG, USER_TAG} from './nostrTags';
import {generatePublic} from './generateKeys'; // Replace with your actual utility function

const pool = new SimplePool();

export const getUser = (privateKey: string): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    let fetchedUser: IUser = {} as IUser;

    // Derive the public key from the private key
    const publicKey = generatePublic(privateKey);

    let userSub = pool.sub(RELAYS_URL, [{'#t': ['open-rooms', 'user']}]);

    userSub.on('event', (event: any) => {
      console.log('getUser - Event received:', event);
      const userContent: IUser = JSON.parse(event.content);
      userContent.id = event.id;
      // added resolve here because .on('end') was not being called
      resolve(fetchedUser);
      fetchedUser = userContent;
    });

    (userSub as any).on('end', () => {
      console.log('Entered .on(end) block');
      resolve(fetchedUser);
    });
    (userSub as any).on('error', (err: any) => {
      console.log('An error occurred:', err);
      reject(err);
    });
  });
};
